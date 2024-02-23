import { USAGE_BASE } from "./util";
import { createUsageClient } from "@usagehq/api";

const USAGE_API_URL = `http://${USAGE_BASE}/api/core`;

const client = createUsageClient(USAGE_API_URL);

export async function createSession(customerRef: string) {
  const { data, error } = await client.POST("/sessions", {
    headers: {
      "x-usage-api-key": process.env.USAGE_SECRET ?? "",
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
  req: LLMRequest,
) {
  const { data, error } = await client.POST("/requests", {
    headers: {
      "x-usage-api-key": process.env.USAGE_SECRET ?? "",
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
      "x-usage-api-key": process.env.USAGE_SECRET ?? "",
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
      "x-usage-api-key": process.env.USAGE_SECRET ?? "",
      "content-type": "application/vnd.api+json",
    },
  });
  if (error) {
    throw new Error("An error occurred");
  }
  return data.data;
};
