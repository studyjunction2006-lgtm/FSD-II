import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <DashboardCards />
      <PostForm />
      <PostList />
    </div>
  );
}

export default Dashboard;