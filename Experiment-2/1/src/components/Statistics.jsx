import { useSelector } from "react-redux";
import { useMemo } from "react";
import { selectFilteredPosts } from "../features/posts/selectors";
import { selectStatistics } from "../features/posts/selectors";

function Statistics() {

  const stats = useSelector(selectStatistics);

  const posts = useSelector(selectFilteredPosts);

  const topPost = useMemo(() => {

    console.log("Finding Top Post...");

    if (posts.length === 0)
      return "No Post";

    return posts.reduce((a, b) =>
      a.likes > b.likes ? a : b
    ).title;

  }, [posts]);

  return (

    <div className="statistics">

      <h2>📊 Derived Statistics</h2>

      <div className="statsGrid">

        <div className="statBox">
          <h3>{stats.totalPosts}</h3>
          <p>Visible Posts</p>
        </div>

        <div className="statBox">
          <h3>{stats.averageLikes}</h3>
          <p>Average Likes</p>
        </div>

        <div className="statBox">
          <h3>{stats.popularCategory}</h3>
          <p>Popular Category</p>
        </div>

      </div>

      <div className="topPost">

        ⭐ Top Trending Post

        <h3>{topPost}</h3>

      </div>

    </div>

  );
}

export default Statistics;