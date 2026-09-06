import React, {
  useCallback,
  useState,
} from "react";

import Header from "./components/Header";

import Calendar from "./components/Calendar/Calendar";

import CreatePostModal from "./components/CreatePostModal";

import PerformancePanel from "./components/Performance/PerformancePanel";

import ProfilerMonitor from "./components/Performance/ProfilerMonitor";

import { initialPosts } from "./data/posts";

export default function App() {
  /*
   * ---------------------------------------
   * APPLICATION STATE
   * ---------------------------------------
   */

  const [posts, setPosts] =
    useState(initialPosts);

  const [optimized, setOptimized] =
    useState(true);

  const [memoCards, setMemoCards] =
    useState(true);

  const [callbackHandlers, setCallbackHandlers] =
    useState(true);

  const [memoAgenda, setMemoAgenda] =
    useState(true);

  const [memoClock, setMemoClock] =
    useState(true);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [profilerData, setProfilerData] =
    useState({
      commits: 0,
      actualDuration: 0,
      baseDuration: 0,
      phase: "—",
      component: "—",
    });

  /*
   * ---------------------------------------
   * PROFILER DATA HANDLER
   * ---------------------------------------
   */

  const handleProfilerStats =
    useCallback((data) => {
      setProfilerData(data);
    }, []);

  /*
   * ---------------------------------------
   * OPTIMIZATION TOGGLE
   * ---------------------------------------
   */

  const toggleOptimized =
    useCallback(() => {
      setOptimized(
        (previous) => !previous
      );
    }, []);

  /*
   * ---------------------------------------
   * CREATE POST
   * ---------------------------------------
   */

  const createPost = useCallback(
    (post) => {
      setPosts((previous) => [
        ...previous,
        {
          ...post,
          id: Date.now(),
        },
      ]);
    },
    []
  );

  /*
   * ---------------------------------------
   * EXPERIMENT SETTINGS
   * ---------------------------------------
   */

  const toggleMemoCards = () => {
    setMemoCards(
      (previous) => !previous
    );
  };

  const toggleCallbacks = () => {
    setCallbackHandlers(
      (previous) => !previous
    );
  };

  const toggleAgendaMemo = () => {
    setMemoAgenda(
      (previous) => !previous
    );
  };

  const toggleClockMemo = () => {
    setMemoClock(
      (previous) => !previous
    );
  };

  return (
    <ProfilerMonitor
      onStats={handleProfilerStats}
    >
      <div className="app-shell">

        {/* -------------------------------- */}
        {/* HEADER                            */}
        {/* -------------------------------- */}

        <Header
          optimized={optimized}
          onToggleOptimized={
            toggleOptimized
          }
          useMemoClock={
            optimized && memoClock
          }
        />

        {/* -------------------------------- */}
        {/* EXPERIMENT CONTROL BAR           */}
        {/* -------------------------------- */}

        <section className="experiment-toolbar">

          <div className="experiment-heading">

            <div className="experiment-icon">
              ⚙
            </div>

            <div>
              <h2>
                Rendering Experiment
              </h2>

              <p>
                Toggle individual optimization
                techniques and compare rendering
                behaviour.
              </p>
            </div>

          </div>

          <div className="technique-controls">

            <ControlToggle
              label="React.memo Cards"
              enabled={
                optimized &&
                memoCards
              }
              onClick={
                toggleMemoCards
              }
            />

            <ControlToggle
              label="useCallback Handlers"
              enabled={
                optimized &&
                callbackHandlers
              }
              onClick={
                toggleCallbacks
              }
            />

            <ControlToggle
              label="useMemo Agenda"
              enabled={
                optimized &&
                memoAgenda
              }
              onClick={
                toggleAgendaMemo
              }
            />

            <ControlToggle
              label="useMemo Clock"
              enabled={
                optimized &&
                memoClock
              }
              onClick={
                toggleClockMemo
              }
            />

          </div>

        </section>

        {/* -------------------------------- */}
        {/* MAIN LAYOUT                       */}
        {/* -------------------------------- */}

        <main className="main-layout">

          <Calendar
            posts={posts}
            setPosts={setPosts}
            optimized={optimized}
            memoCards={memoCards}
            callbackHandlers={
              callbackHandlers
            }
            memoAgenda={memoAgenda}
            onCreatePost={() =>
              setShowCreateModal(true)
            }
          />

          <PerformancePanel
            optimized={optimized}
            memoCards={memoCards}
            callbackHandlers={
              callbackHandlers
            }
            memoAgenda={memoAgenda}
            memoClock={memoClock}
            profilerData={profilerData}
          />

        </main>

        {/* -------------------------------- */}
        {/* CREATE MODAL                     */}
        {/* -------------------------------- */}

        {showCreateModal && (
          <CreatePostModal
            onClose={() =>
              setShowCreateModal(false)
            }
            onCreate={createPost}
          />
        )}

      </div>
    </ProfilerMonitor>
  );
}

/*
 * ---------------------------------------
 * CONTROL TOGGLE
 * ---------------------------------------
 */

function ControlToggle({
  label,
  enabled,
  onClick,
}) {
  return (
    <button
      className={`control-toggle ${
        enabled ? "enabled" : ""
      }`}
      onClick={onClick}
    >
      <span className="control-switch">
        <span />
      </span>

      <span>
        {label}
      </span>
    </button>
  );
}