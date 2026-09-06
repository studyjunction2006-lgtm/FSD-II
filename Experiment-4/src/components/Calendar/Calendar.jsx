import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import TimeSlot from "./TimeSlot";
import PostCard, {
  MemoizedPostCard,
} from "./PostCard";

import {
  addDays,
  formatDateKey,
  formatMonthDay,
  formatTime,
  getWeekDays,
} from "../../utils/dateUtils";

const HOURS = Array.from(
  { length: 12 },
  (_, index) => index + 8
);

export default function Calendar({
  posts,
  setPosts,
  optimized,
  memoCards,
  callbackHandlers,
  memoAgenda,
  onCreatePost,
}) {
  const [currentWeek, setCurrentWeek] =
    useState(new Date());

  const [filter, setFilter] =
    useState("All");

  const [selectedPost, setSelectedPost] =
    useState(null);

  /*
   * ----------------------------------------
   * WEEK CALCULATION
   * ----------------------------------------
   */

  const weekDays = useMemo(() => {
    if (!optimized) {
      return getWeekDays(currentWeek);
    }

    return getWeekDays(currentWeek);
  }, [currentWeek, optimized]);

  /*
   * ----------------------------------------
   * AGENDA FILTER
   * ----------------------------------------
   *
   * This is one of the Experiment 1.4.2
   * useMemo demonstrations.
   */

  const filteredPosts = useMemo(() => {
    if (filter === "All") {
      return posts;
    }

    return posts.filter(
      (post) => post.status === filter
    );
  }, [posts, filter, memoAgenda]);

  /*
   * ----------------------------------------
   * DATE NAVIGATION
   * ----------------------------------------
   */

  const previousWeek = useCallback(() => {
    setCurrentWeek((previous) =>
      addDays(previous, -7)
    );
  }, []);

  const nextWeek = useCallback(() => {
    setCurrentWeek((previous) =>
      addDays(previous, 7)
    );
  }, []);

  const goToday = useCallback(() => {
    setCurrentWeek(new Date());
  }, []);

  /*
   * ----------------------------------------
   * POST EDIT
   * ----------------------------------------
   */

  const handleEdit = useCallback(
    (post) => {
      setSelectedPost(post);
    },
    []
  );

  /*
   * ----------------------------------------
   * POST DELETE
   * ----------------------------------------
   */

  const handleDelete = useCallback(
    (postId) => {
      setPosts((previous) =>
        previous.filter(
          (post) => post.id !== postId
        )
      );
    },
    [setPosts]
  );

  /*
   * ----------------------------------------
   * DRAG & DROP
   * ----------------------------------------
   */

  const handleDrop = useCallback(
    (postId, newDate) => {
      setPosts((previous) =>
        previous.map((post) => {
          if (post.id !== postId) {
            return post;
          }

          const updatedDate =
            new Date(newDate);

          updatedDate.setMinutes(0, 0, 0);

          return {
            ...post,
            date: updatedDate.toISOString(),
          };
        })
      );
    },
    [setPosts]
  );

  /*
   * ----------------------------------------
   * CARD COMPONENT
   * ----------------------------------------
   *
   * Toggle React.memo ON/OFF.
   */

  const CardComponent =
    optimized && memoCards
      ? MemoizedPostCard
      : PostCard;

  /*
   * ----------------------------------------
   * POST LOOKUP
   * ----------------------------------------
   */

  const getPostsForSlot = (
    day,
    hour
  ) => {
    return filteredPosts.filter(
      (post) => {
        const postDate = new Date(post.date);

        return (
          formatDateKey(postDate) ===
            formatDateKey(day) &&
          postDate.getHours() === hour
        );
      }
    );
  };

  /*
   * ----------------------------------------
   * EVENT HANDLER WRAPPER
   * ----------------------------------------
   */

  const editHandler = callbackHandlers
    ? handleEdit
    : (post) => setSelectedPost(post);

  const deleteHandler = callbackHandlers
    ? handleDelete
    : (id) =>
        setPosts((previous) =>
          previous.filter(
            (post) => post.id !== id
          )
        );

  const dropHandler = callbackHandlers
    ? handleDrop
    : (id, date) =>
        setPosts((previous) =>
          previous.map((post) =>
            post.id === id
              ? {
                  ...post,
                  date: new Date(
                    date
                  ).toISOString(),
                }
              : post
          )
        );

  return (
    <section className="calendar-container">

      {/* -------------------------------- */}
      {/* CALENDAR TOOLBAR                 */}
      {/* -------------------------------- */}

      <div className="calendar-toolbar">

        <div className="calendar-title">
          <h2>Content Calendar</h2>

          <p>
            Drag posts between time slots
            to reschedule them.
          </p>
        </div>

        <div className="calendar-controls">

          <button
            onClick={previousWeek}
            className="icon-button"
          >
            ←
          </button>

          <button
            onClick={goToday}
            className="today-button"
          >
            Today
          </button>

          <button
            onClick={nextWeek}
            className="icon-button"
          >
            →
          </button>

          <button
            className="create-button"
            onClick={onCreatePost}
          >
            + Create Post
          </button>

        </div>

      </div>

      {/* -------------------------------- */}
      {/* FILTERS                          */}
      {/* -------------------------------- */}

      <div className="agenda-toolbar">

        <div className="filter-title">
          Agenda Filter
        </div>

        {[
          "All",
          "Scheduled",
          "Draft",
          "Published",
        ].map((option) => (
          <button
            key={option}
            className={`filter-button ${
              filter === option
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setFilter(option)
            }
          >
            {option}
          </button>
        ))}

        <div className="post-count">
          {filteredPosts.length} posts
        </div>

      </div>

      {/* -------------------------------- */}
      {/* CALENDAR GRID                     */}
      {/* -------------------------------- */}

      <div className="calendar-scroll">

        <div className="calendar-grid">

          {/* TIME HEADER */}

          <div className="corner-cell">
            GMT
          </div>

          {weekDays.map((day) => (
            <div
              className="day-header"
              key={formatDateKey(day)}
            >
              <div className="day-name">
                {day.toLocaleDateString(
                  [],
                  {
                    weekday: "short",
                  }
                )}
              </div>

              <div className="day-number">
                {formatMonthDay(day)}
              </div>
            </div>
          ))}

          {/* TIME ROWS */}

          {HOURS.map((hour) => (
            <React.Fragment key={hour}>

              <div className="time-label">
                {formatTime(
                  new Date(
                    2000,
                    0,
                    1,
                    hour
                  )
                )}
              </div>

              {weekDays.map((day) => {

                const slotPosts =
                  getPostsForSlot(
                    day,
                    hour
                  );

                return (
                  <TimeSlot
                    key={`${formatDateKey(
                      day
                    )}-${hour}`}
                    date={day}
                    hour={hour}
                    posts={slotPosts}
                    onDrop={dropHandler}
                    onEdit={editHandler}
                    onDelete={deleteHandler}
                    CardComponent={
                      CardComponent
                    }
                  />
                );
              })}

            </React.Fragment>
          ))}

        </div>

      </div>

      {/* -------------------------------- */}
      {/* EDIT MODAL                       */}
      {/* -------------------------------- */}

      {selectedPost && (
        <div className="modal-backdrop">

          <div className="edit-modal">

            <div className="modal-header">
              <h3>Edit Post</h3>

              <button
                onClick={() =>
                  setSelectedPost(null)
                }
              >
                ×
              </button>
            </div>

            <div className="edit-content">

              <div className="edit-preview">
                <span>
                  {selectedPost.platform}
                </span>

                <h3>
                  {selectedPost.title}
                </h3>

                <p>
                  {selectedPost.content}
                </p>

                <div>
                  Status:
                  {" "}
                  <strong>
                    {selectedPost.status}
                  </strong>
                </div>

                <div>
                  Scheduled:
                  {" "}
                  <strong>
                    {new Date(
                      selectedPost.date
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>

              <button
                className="create-button"
                onClick={() =>
                  setSelectedPost(null)
                }
              >
                Done
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}