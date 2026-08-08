import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "../utils/auth";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = decodeToken(token);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <img
  className="avatar"
  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  alt="User Avatar"
/>

        <h2>Welcome {user?.name}</h2>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Role:</strong> {user?.role}
        </p>

        <br />

        {user?.role === "Admin" && (
          <Link to="/admin">
            <button className="nav-btn">
              Admin Panel
            </button>
          </Link>
        )}

        {(user?.role === "Admin" ||
          user?.role === "Editor") && (
          <Link to="/editor">
            <button className="nav-btn">
              Editor Panel
            </button>
          </Link>
        )}

        <Link to="/viewer">
          <button className="nav-btn">
            Viewer Panel
          </button>
        </Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;