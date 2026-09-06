import React from "react";
import {
  formatTime,
} from "../../utils/dateUtils";

function PostCard({
  post,
  onEdit,
  onDelete,
  onDragStart,
}) {
  return (
    <div
      className={`post-card post-${post.color}`}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData(
          "postId",
          String(post.id)
        );

        onDragStart?.(post);
      }}
      onClick={() => onEdit(post)}
    >
      <div className="post-card-top">
        <span className="platform">
          {post.platform}
        </span>

        <span
          className={`status status-${post.status.toLowerCase()}`}
        >
          {post.status}
        </span>
      </div>

      <h4>{post.title}</h4>

      <p>{post.content}</p>

      <div className="post-card-bottom">
        <span>
          ◷ {formatTime(post.date)}
        </span>

        <button
          className="delete-button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(post.id);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export const MemoizedPostCard =
  React.memo(PostCard);

export default PostCard;