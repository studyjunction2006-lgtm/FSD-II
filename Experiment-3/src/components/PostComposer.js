import { useState } from "react";

function PostComposer({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      author: "Current User",
      createdAt: new Date().toLocaleString(),
    };

    onAddPost(newPost);

    setTitle("");
    setContent("");
  };

  return (
    <div className="composer-card">

      <div className="section-title">
        <span>✍️</span>
        <div>
          <h2>Create New Post</h2>
          <p>Share something with your audience</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
        />

        <textarea
          placeholder="Write your post content..."
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          rows="6"
        />

        <button
          type="submit"
          className="create-btn"
        >
          🚀 Publish Post
        </button>

      </form>

    </div>
  );
}

export default PostComposer;