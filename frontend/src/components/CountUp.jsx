import { useState, useEffect, useRef } from 'react';

/**
 * CountUp — Animated number counter that spins from 0 to target value
 * Triggers when element scrolls into view (IntersectionObserver)
 * Supports suffix like "+" or "%"
 */
export default function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  // Parse the numeric part from strings like "145+" or "90%"
  const numericEnd = typeof end === 'string' ? parseInt(end.replace(/[^0-9]/g, ''), 10) : end;
  const autoSuffix = typeof end === 'string' ? end.replace(/[0-9]/g, '') : suffix;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericEnd));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(numericEnd);
      }
    };

    requestAnimationFrame(step);
  }, [started, numericEnd, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {count}{autoSuffix}
    </span>
  );
}
