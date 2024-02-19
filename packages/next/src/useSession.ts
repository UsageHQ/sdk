import LiveState from "phx-live-state";
import { useMemo, useState, useEffect } from "react";

export type Request<T> = {
  id: string;
  resp_body_chunks: string[];
  req_metadata: T;
  status: string;
  resp_code: null | number;
};

export const useSession = <Metadata>(sessionId?: string | null) => {
  const [state, setState] = useState<
    | undefined
    | {
        session: { id: string; requests: Request<Metadata>[] };
        active_requests: Record<string, Request<Metadata>>;
      }
  >();
  const [connected, setConnected] = useState(false);

  const liveState = useMemo(
    () =>
      sessionId
        ? // @ts-expect-error Will replace phx-live-state with something else
          new LiveState({
            url: "ws://localhost:4000/socket",
            // url: process.env.NEXT_PUBLIC_USAGE_WS,
            topic: `session:${sessionId}`,
            params: {
              // token: "1234",
              key: process.env.NEXT_PUBLIC_USAGE_PUBLIC_SHAREABLE,
            },
          })
        : null,
    [sessionId],
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

  return { connected, state };
};
