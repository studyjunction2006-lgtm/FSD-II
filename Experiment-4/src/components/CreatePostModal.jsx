import React, {
  useState,
} from "react";

export default function CreatePostModal({
  onClose,
  onCreate,
}) {
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [platform, setPlatform] =
    useState("Instagram");

  const [status, setStatus] =
    useState("Draft");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("10:00");

  const submit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const selectedDate = date
      ? new Date(`${date}T${time}`)
      : new Date();

    onCreate({
      title,
      content,
      platform,
      status,
      date: selectedDate.toISOString(),
      duration: 60,
      color: "cyan",
    });

    onClose();
  };

  return (
    <div className="modal-backdrop">

      <div className="create-modal">

        <div className="modal-header">

          <div>
            <h2>Create New Post</h2>

            <p>
              Add a post to your content calendar.
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <form onSubmit={submit}>

          <label>
            Post Title

            <input
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="Enter post title"
            />
          </label>

          <label>
            Content

            <textarea
              value={content}
              onChange={(event) =>
                setContent(
                  event.target.value
                )
              }
              placeholder="Write your content..."
              rows="4"
            />
          </label>

          <div className="form-row">

            <label>
              Platform

              <select
                value={platform}
                onChange={(event) =>
                  setPlatform(
                    event.target.value
                  )
                }
              >
                <option>
                  Instagram
                </option>

                <option>
                  LinkedIn
                </option>

                <option>
                  Facebook
                </option>
              </select>
            </label>

            <label>
              Status

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value
                  )
                }
              >
                <option>
                  Draft
                </option>

                <option>
                  Scheduled
                </option>

                <option>
                  Published
                </option>
              </select>
            </label>

          </div>

          <div className="form-row">

            <label>
              Date

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Time

              <input
                type="time"
                value={time}
                onChange={(event) =>
                  setTime(
                    event.target.value
                  )
                }
              />
            </label>

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-button"
            >
              Create Post
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}