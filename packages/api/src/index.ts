import createClient from "openapi-fetch";
import { paths } from "./types";

export type * from "./types";

export function createUsageClient(baseUrl: string) {
  return createClient<paths>({ baseUrl });
}
