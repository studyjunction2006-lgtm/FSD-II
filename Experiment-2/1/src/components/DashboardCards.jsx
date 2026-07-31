import { useSelector } from "react-redux";
import { selectStatistics } from "../features/posts/selectors";

function DashboardCards() {
  const stats = useSelector(selectStatistics);

  return (
    <div className="dashboard">

      <div className="card blue">
        <h2>{stats.totalPosts}</h2>
        <p>Total Posts</p>
      </div>

      <div className="card green">
        <h2>{stats.totalLikes}</h2>
        <p>Total Likes</p>
      </div>

      <div className="card orange">
        <h2>{stats.averageLikes}</h2>
        <p>Average Likes</p>
      </div>

      <div className="card purple">
        <h2>{stats.popularCategory}</h2>
        <p>Popular Category</p>
      </div>

    </div>
  );
}

export default DashboardCards;