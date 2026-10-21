import { useEffect, useRef, useState } from "react";

/** True once the element has scrolled into view (stays true afterwards). */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;

    const visible = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * (1 - threshold * 0.4) && r.bottom > window.innerHeight * threshold * 0.2;
    };

    // Position check on mount and scroll; IntersectionObserver (when present) can trigger it earlier.
    const check = () => {
      if (visible()) setSeen(true);
    };
    const timer = setTimeout(check, 60);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(([entry]) => entry.isIntersecting && setSeen(true), { threshold });
      io.observe(el);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      io?.disconnect();
    };
  }, [seen, threshold]);

  return [ref, seen] as const;
}
