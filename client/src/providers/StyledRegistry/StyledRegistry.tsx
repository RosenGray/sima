"use client";

import React from "react";

// useServerInsertedHTML + ServerStyleSheet caused a Node.js TransformStream
// crash (controller[kState].transformAlgorithm is not a function) in Next.js 16
// with Node.js 20.19.x.  Since compiler.styledComponents: true in next.config.ts
// handles SSR style injection via the SWC plugin, the manual registry is not
// needed and only caused the streaming pipeline to fail.
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}