"use client";

import { useEffect, useRef } from "react";

/**
 * useScrollAnimation - Intersection Observer hook for fade-in animations
 * Adds "visible" class to elements with animation classes when they enter viewport
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class to the element itself and all animated children
            entry.target.classList.add("visible");
            // Also animate children with animation classes
            entry.target
              .querySelectorAll(".fade-in-up, .fade-in")
              .forEach((child) => child.classList.add("visible"));
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe the container
    observer.observe(el);

    // Observe all animated children
    el.querySelectorAll(".fade-in-up, .fade-in").forEach((child) => {
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
