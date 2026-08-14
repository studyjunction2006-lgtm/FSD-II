import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-page">

      <div className="unauthorized-card">

        <div className="lock-icon">
          🔒
        </div>

        <h1>403</h1>

        <h2>Access Restricted</h2>

        <p>
          You are authenticated, but your current
          role does not have permission to access
          this resource.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Unauthorized;