import { useSelector } from "react-redux";
import { selectFilteredPosts } from "../features/posts/selectors";
import PostCard from "./PostCard";

function PostList() {

  const posts = useSelector(selectFilteredPosts);

  return (

    <div>

      <h2 className="sectionTitle">
        Filtered Posts
      </h2>

      <div className="postGrid">

        {posts.length === 0 ? (
          <p>No Posts Found</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default PostList;