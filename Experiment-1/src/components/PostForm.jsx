import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postSlice";

function PostForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [status, setStatus] = useState("Draft");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return;

    dispatch(
      addPost({
        id: Date.now(),
        title,
        content,
        platform,
        status,
      })
    );

    setTitle("");
    setContent("");
    setPlatform("LinkedIn");
    setStatus("Draft");
  };

  return (
    <form className="postForm" onSubmit={handleSubmit}>
      <h2>Create New Post</h2>

      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>LinkedIn</option>
        <option>Instagram</option>
        <option>Facebook</option>
        <option>Twitter</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Draft</option>
        <option>Published</option>
      </select>

      <button type="submit">Add Post</button>
    </form>
  );
}

export default PostForm;