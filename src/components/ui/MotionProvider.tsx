"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 120, damping: 24 }}>
      {children}
    </MotionConfig>
  );
}
