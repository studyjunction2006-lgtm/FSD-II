import React, {
  useMemo,
} from "react";

export default function PerformancePanel({
  optimized,
  memoCards,
  callbackHandlers,
  memoAgenda,
  memoClock,
  profilerData,
}) {
  const safeProfiler =
    profilerData &&
    typeof profilerData === "object"
      ? profilerData
      : {};

  const efficiencyScore =
    useMemo(() => {
      let score = 50;

      if (optimized) {
        score += 15;
      }

      if (memoCards) {
        score += 10;
      }

      if (callbackHandlers) {
        score += 10;
      }

      if (memoAgenda) {
        score += 7;
      }

      if (memoClock) {
        score += 8;
      }

      return Math.min(score, 100);
    }, [
      optimized,
      memoCards,
      callbackHandlers,
      memoAgenda,
      memoClock,
    ]);

  const actualDuration =
    Number(
      safeProfiler.actualDuration
    ) || 0;

  const baseDuration =
    Number(
      safeProfiler.baseDuration
    ) || 0;

  return (
    <aside className="performance-panel">

      <div className="performance-header">

        <div>
          <span className="panel-label">
            PERFORMANCE
          </span>

          <h2>
            Render Monitor
          </h2>
        </div>

        <div
          className={`performance-status ${
            optimized
              ? "good"
              : "warning"
          }`}
        >
          {optimized
            ? "OPTIMIZED"
            : "RAW"}
        </div>

      </div>

      {/* SCORE */}

      <div className="score-card">

        <div className="score-ring">
          <strong>
            {efficiencyScore}
          </strong>

          <span>
            /100
          </span>
        </div>

        <div>
          <h3>
            Performance Score
          </h3>

          <p>
            Based on enabled React
            optimizations.
          </p>
        </div>

      </div>

      {/* PROFILER */}

      <div className="performance-section">

        <div className="section-heading">
          React Profiler
        </div>

        <div className="metric-row">
          <span>
            Commit count
          </span>

          <strong>
            {safeProfiler.commits || 0}
          </strong>
        </div>

        <div className="metric-row">
          <span>
            Actual duration
          </span>

          <strong>
            {actualDuration.toFixed(2)} ms
          </strong>
        </div>

        <div className="metric-row">
          <span>
            Base duration
          </span>

          <strong>
            {baseDuration.toFixed(2)} ms
          </strong>
        </div>

        <div className="metric-row">
          <span>
            Last phase
          </span>

          <strong>
            {safeProfiler.phase || "—"}
          </strong>
        </div>

      </div>

      {/* OPTIMIZATION CONTROLS */}

      <div className="performance-section">

        <div className="section-heading">
          Optimization status
        </div>

        <OptimizationRow
          label="React.memo"
          enabled={
            optimized && memoCards
          }
        />

        <OptimizationRow
          label="useCallback"
          enabled={
            optimized &&
            callbackHandlers
          }
        />

        <OptimizationRow
          label="Agenda useMemo"
          enabled={
            optimized &&
            memoAgenda
          }
        />

        <OptimizationRow
          label="Clock useMemo"
          enabled={
            optimized &&
            memoClock
          }
        />

      </div>

      {/* RENDER ANALYSIS */}

      <div className="performance-section">

        <div className="section-heading">
          Render Analysis
        </div>

        <div className="analysis-box">

          <div className="analysis-icon">
            {optimized
              ? "⚡"
              : "!"
            }
          </div>

          <div>

            <strong>
              {optimized
                ? "Optimized rendering active"
                : "Optimization disabled"}
            </strong>

            <p>
              {optimized
                ? "Memoized components and stable handlers reduce unnecessary work."
                : "Components may re-render more frequently because optimization is disabled."}
            </p>

          </div>

        </div>

      </div>

      {/* EXPERIMENT INFO */}

      <div className="experiment-info">

        <div>
          <span>
            EXPERIMENT
          </span>

          <strong>
            1.4.1 + 1.4.2
          </strong>
        </div>

        <div>
          <span>
            TECHNIQUE
          </span>

          <strong>
            React Profiler
          </strong>
        </div>

        <div>
          <span>
            INTERACTION
          </span>

          <strong>
            Drag & Drop
          </strong>
        </div>

      </div>

    </aside>
  );
}

function OptimizationRow({
  label,
  enabled,
}) {
  return (
    <div className="optimization-row">

      <span>
        {label}
      </span>

      <span
        className={`optimization-badge ${
          enabled
            ? "enabled"
            : "disabled"
        }`}
      >
        {enabled
          ? "ON"
          : "OFF"}
      </span>

    </div>
  );
}