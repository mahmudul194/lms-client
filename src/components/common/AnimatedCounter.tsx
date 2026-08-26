"use client";

import React, { useState, useEffect } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  trigger: boolean;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 1600,
  trigger,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();
    let frameId: number;

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [trigger, target, duration]);

  const display = trigger ? count : 0;

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}
