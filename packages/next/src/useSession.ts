import LiveState from "phx-live-state";
import { useMemo, useState, useEffect } from "react";
import { USAGE_BASE, USAGE_PUBLIC } from "./util";
import { components } from "@usagehq/api";

const PREFIX = "USAGE_";
const USAGE_SESSION_ID_KEY = PREFIX + "SID";

export function useSession<TMetadata>(
  actions: SelfHostedActions,
  /** If undefined, use session id from localStorage. Will create a new session
   * and put into localStorage if no session previously exist. Use `null` to
   * temporarily disable the hook. */
  sessionId?: string | null,
) {
  const [state, setState] = useState<undefined | State<TMetadata>>();
  const [connected, setConnected] = useState(false);

  const [activeSessionId, setActiveSessionId] = useState(
    sessionId === undefined ? getSessionId() : sessionId,
  );
  useEffect(() => {
    setActiveSessionId(sessionId === undefined ? getSessionId() : sessionId);
  }, [sessionId]);

  useEffect(() => {
    if (activeSessionId !== undefined) return;

    let willUpdate = true;
    (async () => {
      const newSession = await actions.createSession();
      localStorage.setItem(USAGE_SESSION_ID_KEY, newSession.id);
      if (willUpdate) {
        setActiveSessionId(newSession.id);
      }
    })();
    return () => {
      willUpdate = false;
    };
  }, [activeSessionId]);

  const liveState = useMemo(
    () =>
      activeSessionId
        ? new LiveState({
            url: `ws://${USAGE_BASE}/socket`,
            topic: `session:${activeSessionId}`,
            params: {
              key: USAGE_PUBLIC,
            },
          })
        : null,
    [activeSessionId],
  );

  useEffect(() => {
    if (!liveState) return;

    liveState.connect();
    const handler = () => {
      setState(liveState.state);
      setConnected(liveState.connected);
    };
    liveState.addEventListener("livestate-change", handler);

    return () => {
      liveState.removeEventListener("livestate-change", handler);
    };
  }, [liveState]);

  return { connected, state, sessionId: activeSessionId };
}

type State<TMetadata> = {
  session: { id: string; requests: Request<TMetadata>[] };
  active_requests: Record<string, Request<TMetadata>>;
};

export type Request<TMetadata> = {
  id: string;
  resp_body_chunks: string[];
  req_metadata: TMetadata;
  status: string;
  resp_code: null | number;
};

type SelfHostedActions = {
  createSession: () => Promise<components["schemas"]["Session"]>;
};

export function getSessionId() {
  return localStorage.getItem(USAGE_SESSION_ID_KEY) ?? undefined;
}
