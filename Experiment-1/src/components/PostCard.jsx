import { useDispatch } from "react-redux";
import { deletePost } from "../redux/postSlice";

function PostCard({ post }) {
  const dispatch = useDispatch();

  return (
    <div className="postCard">

      <h2>{post.title}</h2>

      <p>{post.content}</p>

      <h4>{post.platform}</h4>

      <strong>{post.status}</strong>

      <div className="buttons">

        <button
          className="deleteBtn"
          onClick={() => dispatch(deletePost(post.id))}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default PostCard;