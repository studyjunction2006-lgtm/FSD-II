import React, {
  Profiler,
  useEffect,
  useRef,
  useState,
} from "react";

export default function ProfilerMonitor({
  children,
  onStats,
}) {
  const profilerRef = useRef({
    commits: 0,
    actualDuration: 0,
    baseDuration: 0,
    phase: "—",
    component: "—",
  });

  const [, setTick] =
    useState(0);

  /*
   * React Profiler callback.
   *
   * IMPORTANT:
   * We store the data in a ref.
   * We do NOT call setState directly
   * inside onRender.
   *
   * This prevents:
   *
   * render → profiler → setState
   * → render → profiler → setState
   *
   * infinite loops.
   */

  const handleRender = (
    id,
    phase,
    actualDuration,
    baseDuration
  ) => {
    profilerRef.current = {
      commits:
        profilerRef.current.commits + 1,

      actualDuration,

      baseDuration,

      phase,

      component: id,
    };
  };

  /*
   * Poll profiler information every 500ms.
   *
   * The update happens outside the Profiler
   * callback.
   */

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((value) => value + 1);

      if (onStats) {
        onStats({
          ...profilerRef.current,
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [onStats]);

  return (
    <Profiler
      id="PostFlowCalendar"
      onRender={handleRender}
    >
      {children}
    </Profiler>
  );
}