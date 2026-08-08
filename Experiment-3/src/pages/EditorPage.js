import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Admin Panel</h1>

        <p>
          Only Admin can access this page.
        </p>

        <button className="nav-btn">
          Delete Users
        </button>

        <button className="nav-btn">
          Manage Roles
        </button>

        <Link to="/dashboard">
          <button className="logout-btn">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;