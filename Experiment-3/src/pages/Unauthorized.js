import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>403</h1>

        <h2>Access Denied</h2>

        <p>
          You don't have permission to access this page.
        </p>

        <Link to="/dashboard">
          <button className="logout-btn">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;