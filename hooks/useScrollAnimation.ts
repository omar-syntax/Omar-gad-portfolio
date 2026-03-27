"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation(amount: number | "some" | "all" = 0.1) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: amount 
  });

  return { ref, isInView };
}
