/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/customers": {
    /** @description read_all operation on Customer resource */
    get: {
      parameters: {
        query?: {
          /** @description Filters the query to results with attributes matching the given filter object */
          filter?: {
            email?: {
              [key: string]: unknown;
            };
            id?: {
              [key: string]: unknown;
            };
            name?: {
              [key: string]: unknown;
            };
            organization?: string;
            reference?: {
              [key: string]: unknown;
            };
            sessions?: string;
          };
          /** @description Sort order to apply to the results */
          sort?: ("id" | "-id" | "reference" | "-reference" | "name" | "-name" | "email" | "-email")[];
          /** @description Paginates the response with the limit and offset */
          page?: {
            limit?: number;
            offset?: number;
          };
          /** @description Relationship paths to include in the response */
          include?: string[];
          /** @description Limits the response fields to only those listed for each type */
          fields?: {
            /**
             * @description Comma separated field names for Customer
             * @example id,reference,name,email
             */
            Customer?: string;
            [key: string]: unknown;
          };
          /** @description reference */
          reference?: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/vnd.api+json": {
              /** @description An array of resource objects representing a Customer */
              data?: components["schemas"]["Customer"][];
              included?: never[];
            };
          };
        };
        default: components["responses"]["errors"];
      };
    };
  };
  "/requests": {
    /** @description read operation on Request resource */
    get: {
      parameters: {
        query?: {
          /** @description Filters the query to results with attributes matching the given filter object */
          filter?: {
            id?: {
              [key: string]: unknown;
            };
            inserted_at?: {
              [key: string]: unknown;
            };
            organization?: string;
            pool?: string;
            req_body?: {
              [key: string]: unknown;
            };
            req_headers?: {
              [key: string]: unknown;
            };
            req_metadata?: {
              [key: string]: unknown;
            };
            req_method?: {
              [key: string]: unknown;
            };
            req_url?: {
              [key: string]: unknown;
            };
            resp_body_chunks?: {
              [key: string]: unknown;
            };
            resp_code?: {
              [key: string]: unknown;
            };
            resp_headers?: {
              [key: string]: unknown;
            };
            session?: string;
            status?: {
              [key: string]: unknown;
            };
          };
          /** @description Sort order to apply to the results */
          sort?: ("id" | "-id" | "req_url" | "-req_url" | "req_method" | "-req_method" | "status" | "-status" | "req_headers" | "-req_headers" | "req_body" | "-req_body" | "req_metadata" | "-req_metadata" | "resp_code" | "-resp_code" | "resp_headers" | "-resp_headers" | "resp_body_chunks" | "-resp_body_chunks" | "inserted_at" | "-inserted_at")[];
          /** @description Paginates the response with the limit and offset */
          page?: {
            limit?: number;
            offset?: number;
          };
          /** @description Relationship paths to include in the response */
          include?: string[];
          /** @description Limits the response fields to only those listed for each type */
          fields?: {
            /**
             * @description Comma separated field names for Request
             * @example id,req_url,req_method,status,req_headers,req_body,req_metadata,resp_code,resp_headers,resp_body_chunks,inserted_at
             */
            Request?: string;
            [key: string]: unknown;
          };
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/vnd.api+json": {
              /** @description An array of resource objects representing a Request */
              data?: components["schemas"]["Request"][];
              included?: components["schemas"]["Session"][];
            };
          };
        };
        default: components["responses"]["errors"];
      };
    };
    /** @description queue operation on Request resource */
    post: {
      parameters: {
        query?: {
          /** @description Relationship paths to include in the response */
          include?: string[];
          /** @description Limits the response fields to only those listed for each type */
          fields?: {
            /**
             * @description Comma separated field names for Request
             * @example id,req_url,req_method,status,req_headers,req_body,req_metadata,resp_code,resp_headers,resp_body_chunks,inserted_at
             */
            Request?: string;
            [key: string]: unknown;
          };
        };
      };
      /** @description Request body for queue operation on Request resource */
      requestBody: {
        content: {
          "application/vnd.api+json": {
            data: {
              attributes?: {
                customer_ref?: string;
                req_body?: {
                  [key: string]: unknown;
                };
                req_headers?: {
                  [key: string]: unknown;
                };
                req_metadata?: {
                  [key: string]: unknown;
                };
                req_method: {
                  [key: string]: unknown;
                };
                req_url: string;
                session_id?: string;
              };
              relationships?: Record<string, never>;
              /** @enum {unknown} */
              type?: "Request";
            };
          };
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/vnd.api+json": {
              data?: components["schemas"]["Request"];
              included?: components["schemas"]["Session"][];
            };
          };
        };
        default: components["responses"]["errors"];
      };
    };
  };
  "/requests/{id}": {
    /** @description read operation on Request resource */
    get: {
      parameters: {
        query?: {
          /** @description Relationship paths to include in the response */
          include?: string[];
          /** @description Limits the response fields to only those listed for each type */
          fields?: {
            /**
             * @description Comma separated field names for Request
             * @example id,req_url,req_method,status,req_headers,req_body,req_metadata,resp_code,resp_headers,resp_body_chunks,inserted_at
             */
            Request?: string;
            [key: string]: unknown;
          };
        };
        path: {
          id: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/vnd.api+json": {
              data?: components["schemas"]["Request"];
              included?: components["schemas"]["Session"][];
            };
          };
        };
        default: components["responses"]["errors"];
      };
    };
  };
  "/sessions": {
    /** @description Get sessions */
    get: {
      parameters: {
        query?: {
          /** @description Filters the query to results with attributes matching the given filter object */
          filter?: {
            customer?: string;
            id?: {
              [key: string]: unknown;
            };
            inserted_at?: {
              [key: string]: unknown;
            };
            latest_request?: string;
            name?: {
              [key: string]: unknown;
            };
            organization?: string;
            requests?: string;
          };
          /** @description Sort order to apply to the results */
          sort?: ("id" | "-id" | "name" | "-name" | "inserted_at" | "-inserted_at")[];
          /** @description Paginates the response with the limit and offset */
          page?: {
            limit?: number;
            offset?: number;
          };
          /** @description Relationship paths to include in the response */
          include?: string[];
          /** @description Limits the response fields to only those listed for each type */
          fields?: {
            /**
             * @description Comma separated field names for Session
             * @example id,name,inserted_at
             */
            Session?: string;
            [key: string]: unknown;
          };
          /** @description customer_ref */
          customer_ref?: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/vnd.api+json": {
              /** @description An array of resource objects representing a Session */
              data?: components["schemas"]["Session"][];
              included?: (components["schemas"]["Customer"] | components["schemas"]["Request"])[];
            };
          };
        };
        default: components["responses"]["errors"];
      };
    };
    /** @description create_for_customer operation on Session resource */
    post: {
      parameters: {
        query?: {
          /** @description Relationship paths to include in the response */
          include?: string[];
          /** @description Limits the response fields to only those listed for each type */
          fields?: {
            /**
             * @description Comma separated field names for Session
             * @example id,name,inserted_at
             */
            Session?: string;
            [key: string]: unknown;
          };
        };
      };
      /** @description Request body for create_for_customer operation on Session resource */
      requestBody: {
        content: {
          "application/vnd.api+json": {
            data: {
              attributes?: {
                customer_ref: string;
                id?: {
                  [key: string]: unknown;
                };
                name?: string;
              };
              relationships?: Record<string, never>;
              /** @enum {unknown} */
              type?: "Session";
            };
          };
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/vnd.api+json": {
              data?: components["schemas"]["Session"];
              included?: (components["schemas"]["Customer"] | components["schemas"]["Request"])[];
            };
          };
        };
        default: components["responses"]["errors"];
      };
    };
  };
  "/sessions/{id}": {
    /** @description Get one session */
    get: {
      parameters: {
        query?: {
          /** @description Relationship paths to include in the response */
          include?: string[];
          /** @description Limits the response fields to only those listed for each type */
          fields?: {
            /**
             * @description Comma separated field names for Session
             * @example id,name,inserted_at
             */
            Session?: string;
            [key: string]: unknown;
          };
          /** @description id */
          id?: {
            [key: string]: unknown;
          };
        };
        path: {
          id: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/vnd.api+json": {
              data?: components["schemas"]["Session"];
              included?: (components["schemas"]["Customer"] | components["schemas"]["Request"])[];
            };
          };
        };
        default: components["responses"]["errors"];
      };
    };
    /** @description update_name operation on Session resource */
    patch: {
      parameters: {
        query?: {
          /** @description Relationship paths to include in the response */
          include?: string[];
          /** @description Limits the response fields to only those listed for each type */
          fields?: {
            /**
             * @description Comma separated field names for Session
             * @example id,name,inserted_at
             */
            Session?: string;
            [key: string]: unknown;
          };
        };
        path: {
          id: string;
        };
      };
      /** @description Request body for update_name operation on Session resource */
      requestBody?: {
        content: {
          "application/vnd.api+json": {
            data: {
              attributes?: {
                name?: string;
              };
              id: string;
              relationships?: Record<string, never>;
              /** @enum {unknown} */
              type?: "Session";
            };
          };
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/vnd.api+json": {
              data?: components["schemas"]["Session"];
              included?: (components["schemas"]["Customer"] | components["schemas"]["Request"])[];
            };
          };
        };
        default: components["responses"]["errors"];
      };
    };
  };
  "/sessions/{id}/requests": {
    /** @description Get session requests */
    get: {
      parameters: {
        query?: {
          /** @description Relationship paths to include in the response */
          include?: string[];
          /** @description Limits the response fields to only those listed for each type */
          fields?: {
            /**
             * @description Comma separated field names for Session
             * @example id,name,inserted_at
             */
            Session?: string;
            [key: string]: unknown;
          };
        };
        path: {
          id: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/vnd.api+json": {
              data?: components["schemas"]["Session"];
              included?: (components["schemas"]["Customer"] | components["schemas"]["Request"])[];
            };
          };
        };
        default: components["responses"]["errors"];
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** @description A "Resource object" representing a Customer */
    Customer: {
      /** @description An attributes object for a Customer */
      attributes?: {
        email?: {
          [key: string]: unknown;
        };
        name?: string;
        reference?: string;
      };
      id: string;
      /** @description A relationships object for a Customer */
      relationships?: {
        sessions?: {
          /** @description An array of inputs for sessions */
          data?: {
              id: string;
              meta?: {
                [key: string]: unknown;
              };
              type: string;
            }[];
        };
      };
      type: string;
    };
    /** @description A "Resource object" representing a Request */
    Request: {
      /** @description An attributes object for a Request */
      attributes?: {
        inserted_at: {
          [key: string]: unknown;
        };
        req_body?: {
          [key: string]: unknown;
        };
        req_headers?: {
          [key: string]: unknown;
        };
        req_metadata?: {
          [key: string]: unknown;
        };
        req_method: {
          [key: string]: unknown;
        };
        req_url: string;
        resp_body_chunks?: string[];
        resp_code?: number;
        resp_headers?: {
            [key: string]: unknown;
          }[];
        status?: {
          [key: string]: unknown;
        };
      };
      id: string;
      /** @description A relationships object for a Request */
      relationships?: {
        session?: {
          /** @description An array of inputs for session */
          data?: {
              id: string;
              meta?: {
                [key: string]: unknown;
              };
              type: string;
            }[];
        };
      };
      type: string;
    };
    /** @description A "Resource object" representing a Session */
    Session: {
      /** @description An attributes object for a Session */
      attributes?: {
        inserted_at: {
          [key: string]: unknown;
        };
        name?: string;
      };
      id: string;
      /** @description A relationships object for a Session */
      relationships?: {
        customer?: {
          /** @description An array of inputs for customer */
          data?: {
              id: string;
              meta?: {
                [key: string]: unknown;
              };
              type: string;
            }[];
        };
        latest_request?: {
          /** @description An array of inputs for latest_request */
          data?: {
              id: string;
              meta?: {
                [key: string]: unknown;
              };
              type: string;
            }[];
        };
        requests?: {
          /** @description An array of inputs for requests */
          data?: {
              id: string;
              meta?: {
                [key: string]: unknown;
              };
              type: string;
            }[];
        };
      };
      type: string;
    };
    error: {
      /** @description An application-specific error code, expressed as a string value. */
      code?: string;
      /** @description A human-readable explanation specific to this occurrence of the problem. */
      detail?: string;
      /** @description A unique identifier for this particular occurrence of the problem. */
      id?: string;
      links?: components["schemas"]["links"];
      source?: {
        /** @description A string indicating which query parameter caused the error. */
        parameter?: string;
        /** @description A JSON Pointer [RFC6901] to the associated entity in the request document [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute]. */
        pointer?: string;
      };
      /** @description The HTTP status code applicable to this problem, expressed as a string value. */
      status?: string;
      /** @description A short, human-readable summary of the problem. It SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization. */
      title?: string;
    };
    errors: components["schemas"]["error"][];
    /** @description A link MUST be represented as either: a string containing the link's URL or a link object. */
    link: string;
    links: {
      [key: string]: components["schemas"]["link"];
    };
  };
  responses: {
    /** @description General Error */
    errors: {
      content: {
        "application/vnd.api+json": components["schemas"]["errors"];
      };
    };
  };
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
