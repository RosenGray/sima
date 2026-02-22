/**
 * Runs once when the Node.js server starts (Next.js instrumentation).
 * Used to verify runtime version and to debug transformAlgorithm errors.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const payload = {
    sessionId: "52a475",
    location: "instrumentation.ts:register",
    message: "Node server started",
    data: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      hypothesisId: "H1",
    },
    timestamp: Date.now(),
  };

  // #region agent log
  try {
    fetch(
      "http://127.0.0.1:7242/ingest/302e327d-3d7b-4e39-8f7e-62f89d91e65e",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "52a475",
        },
        body: JSON.stringify(payload),
      }
    ).catch(() => {});
  } finally {
    // So production pods show Node version in stdout (kubectl logs)
    console.log(
      "[sima] Node runtime:",
      process.version,
      process.platform,
      process.arch
    );
  }
  // #endregion
}
