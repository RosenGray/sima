const DEBUG_LOG_ENDPOINT =
  "http://127.0.0.1:7242/ingest/302e327d-3d7b-4e39-8f7e-62f89d91e65e";

function sendDebugLog(payload: Record<string, unknown>) {
  try {
    fetch(DEBUG_LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "52a475",
      },
      body: JSON.stringify({ sessionId: "52a475", ...payload, timestamp: Date.now() }),
    }).catch(() => {});
  } catch {
    // ignore
  }
}

/**
 * Runs once when the Node.js server starts (Next.js instrumentation).
 * Used to verify runtime version and to capture transformAlgorithm (and other) error stack traces.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const payload = {
    location: "instrumentation.ts:register",
    message: "Node server started",
    data: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      hypothesisId: "H1",
    },
  };

  // #region agent log
  sendDebugLog(payload);
  console.log(
    "[sima] Node runtime:",
    process.version,
    process.platform,
    process.arch
  );
  // #endregion

  // #region agent log – capture uncaught errors (e.g. transformAlgorithm) with full stack
  process.on("uncaughtException", (err: Error) => {
    const errorPayload = {
      location: "instrumentation.ts:uncaughtException",
      message: "uncaughtException",
      data: {
        hypothesisId: "H2",
        errMessage: err?.message,
        errName: err?.name,
        stack: err?.stack,
        isTransformAlgorithm: String(err?.message ?? "").includes("transformAlgorithm"),
      },
    };
    sendDebugLog(errorPayload);
    console.error("[sima] uncaughtException:", err?.message, err?.stack);
  });

  process.on("unhandledRejection", (reason: unknown) => {
    const err = reason instanceof Error ? reason : new Error(String(reason));
    const errorPayload = {
      location: "instrumentation.ts:unhandledRejection",
      message: "unhandledRejection",
      data: {
        hypothesisId: "H2",
        errMessage: err?.message,
        errName: err?.name,
        stack: err?.stack,
        isTransformAlgorithm: String(err?.message ?? "").includes("transformAlgorithm"),
      },
    };
    sendDebugLog(errorPayload);
    console.error("[sima] unhandledRejection:", err?.message, err?.stack);
  });

  // #region agent log – wrap fetch to log URL when body consumption throws (e.g. transformAlgorithm)
  const originalFetch = globalThis.fetch;
  globalThis.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const responsePromise = originalFetch.call(globalThis, input, init);
    return responsePromise.then((response) => {
      const origJson = response.json?.bind(response);
      const origText = response.text?.bind(response);
      const origBlob = response.blob?.bind(response);
      const wrapConsume = <T>(fn: () => Promise<T>, name: string): (() => Promise<T>) => {
        return function (this: Response) {
          return fn.call(this).catch((err: unknown) => {
            sendDebugLog({
              location: "instrumentation.ts:fetchConsume",
              message: "fetch body consume error",
              data: {
                hypothesisId: "H3",
                url,
                consumeMethod: name,
                errMessage: err instanceof Error ? err.message : String(err),
                stack: err instanceof Error ? err.stack : undefined,
              },
            });
            console.error("[sima] fetch body error url=", url, "method=", name, err);
            throw err;
          });
        };
      };
      if (origJson) {
        response.json = wrapConsume(origJson as () => Promise<unknown>, "json") as Response["json"];
      }
      if (origText) {
        response.text = wrapConsume(origText as () => Promise<string>, "text");
      }
      if (origBlob) {
        response.blob = wrapConsume(origBlob as () => Promise<Blob>, "blob");
      }
      return response;
    });
  } as typeof fetch;
  // #endregion
}
