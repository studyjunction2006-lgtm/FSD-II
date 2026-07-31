import React from "react";

function PostCard({ post }) {
  console.log("Rendering:", post.title);

  return (
    <div className="postCard">

      <div className="postHeader">
        <h3>{post.title}</h3>

        <span className="category">
          {post.category}
        </span>
      </div>

      <div className="postFooter">
        ❤️ {post.likes} Likes
      </div>

    </div>
  );
}

export default React.memo(PostCard);