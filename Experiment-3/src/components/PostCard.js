function PostCard({
  post,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}) {
  return (
    <div className="post-card">

      <div className="post-header">

        <div className="post-avatar">
          👤
        </div>

        <div>
          <h3>{post.title}</h3>

          <p>
            By {post.author} • {post.createdAt}
          </p>
        </div>

      </div>

      <div className="post-content">
        {post.content}
      </div>

      <div className="post-actions">

        {canEdit && (
          <button
            className="edit-btn"
            onClick={() => onEdit(post)}
          >
            ✏️ Edit
          </button>
        )}

        {canDelete && (
          <button
            className="delete-btn"
            onClick={() => onDelete(post.id)}
          >
            🗑️ Delete
          </button>
        )}

        {!canEdit && !canDelete && (
          <span className="view-only">
            👁️ View Only
          </span>
        )}

      </div>

    </div>
  );
}

export default PostCard;