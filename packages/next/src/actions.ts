import { USAGE_BASE, USAGE_SECRET } from "./util";
import { createUsageClient } from "@usagehq/api";

const USAGE_API_URL = `http://${USAGE_BASE}/api/core`;

const client = createUsageClient(USAGE_API_URL);

export async function createSession(customerRef: string) {
  const { data, error } = await client.POST("/sessions", {
    headers: {
      "x-usage-api-key": USAGE_SECRET,
      "content-type": "application/vnd.api+json",
    },
    body: {
      data: {
        attributes: {
          customer_ref: customerRef,
        },
      },
    },
  });
  if (error) {
    throw new Error("An error occurred");
  }
  return data.data;
}

type LLMRequest = {
  url: string;
  body: Record<string, unknown>;
  method: string;
  headers: Record<string, string>;
  metadata: Record<string, unknown>;
};

export async function queue(
  customerRef: string,
  sessionId: string,
  req: LLMRequest
) {
  const { data, error } = await client.POST("/requests", {
    headers: {
      "x-usage-api-key": USAGE_SECRET,
      "content-type": "application/vnd.api+json",
    },
    body: {
      data: {
        attributes: {
          customer_ref: customerRef,
          session_id: sessionId,
          req_url: req.url,
          req_body: req.body,
          // @ts-expect-error Schema is wrong
          req_method: req.method,
          req_headers: req.headers,
          req_metadata: req.metadata,
        },
      },
    },
  });
  if (error) {
    throw new Error("An error occurred");
  }
  return data.data?.id;
}

export const setSessionName = async (sessionId: string, name: string) => {
  const { data, error } = await client.PATCH("/sessions/{id}", {
    params: {
      path: { id: sessionId },
    },
    headers: {
      "x-usage-api-key": USAGE_SECRET,
      "content-type": "application/vnd.api+json",
    },
    body: {
      // @ts-expect-error Schema is wrong
      data: {
        attributes: {
          name,
        },
      },
    },
  });
  if (error) {
    throw new Error("An error occurred");
  }
  return data.data;
};

export const getSessions = async (customerRef: string) => {
  const { data, error } = await client.GET("/sessions", {
    params: {
      query: {
        customer_ref: customerRef,
      },
    },
    headers: {
      "x-usage-api-key": USAGE_SECRET,
      "content-type": "application/vnd.api+json",
    },
  });
  if (error) {
    throw new Error("An error occurred");
  }
  return data.data;
};

async function fetchCustomerAccounts(customerRef: string) {
  return await client.GET("/ledger-accounts", {
    headers: {
      "x-usage-api-key": USAGE_SECRET,
      "content-type": "application/vnd.api+json",
    },
    params: {
      query: {
        customer_ref: customerRef,
      },
    },
  });
}

export async function createCustomerAccounts(customerRef: string) {
  ["XFC", "XPC"].forEach(async (currency) => {
    const { error } = await client.POST("/ledger-accounts", {
      headers: {
        "x-usage-api-key": USAGE_SECRET,
        "content-type": "application/vnd.api+json",
      },
      body: {
        data: {
          attributes: {
            customer_ref: customerRef,
            currency,
            identifier: `${customerRef}_${currency}`,
          },
        },
      },
    });
    if (error) {
      console.error(error);
      throw new Error(
        "An error occurred while creating customer's ledger accounts"
      );
    }
  });
}

async function getCustomerAccounts(customerRef: string) {
  let customerAccountsResponse = await fetchCustomerAccounts(customerRef);
  if (customerAccountsResponse.data?.data?.length === 0) {
    await createCustomerAccounts(customerRef);
    customerAccountsResponse = await fetchCustomerAccounts(customerRef);
  }
  if (customerAccountsResponse.error) {
    console.error(customerAccountsResponse.error);
    throw new Error("An error occurred");
  }
  return customerAccountsResponse.data.data;
}

async function getCustomerAccount(customerRef: string, currency: string) {
  const accounts = await getCustomerAccounts(customerRef);
  return accounts?.find((d) => d.attributes?.currency === currency);
}

export async function addCustomerCredit(
  customerRef: string,
  currency: string,
  amount: number
) {
  const account = await getCustomerAccount(customerRef, currency);
  if (!account) {
    throw new Error("Customer's ledger account not found");
  }

  const { error } = await client.PATCH("/ledger-accounts/{id}", {
    headers: {
      "x-usage-api-key": USAGE_SECRET,
      "content-type": "application/vnd.api+json",
    },
    params: {
      path: { id: account.id },
    },
    body: {
      data: {
        attributes: {
          action: amount >= 0 ? "add" : "sub",
          amount: amount,
        },
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error(
      "An error occurred while adding credit to customer's account"
    );
  }
}

export async function getCustomerFreeCredit(customerRef: string) {
  const account = await getCustomerAccount(customerRef, "XFC");
  return account?.attributes?.balance ?? null;
}

export async function addCustomerFreeCredit(
  customerRef: string,
  amount: number
) {
  return await addCustomerCredit(customerRef, "XFC", amount);
}

export async function getCustomerPaidCredit(customerRef: string) {
  const account = await getCustomerAccount(customerRef, "XPC");
  return account?.attributes?.balance ?? null;
}

export async function addCustomerPaidCredit(
  customerRef: string,
  amount: number
) {
  return await addCustomerCredit(customerRef, "XPC", amount);
}
