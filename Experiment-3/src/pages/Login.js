import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    let user = null;

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      user = {
        name: "Admin User",
        email,
        role: "Admin",
      };
    }

    if (
      email === "editor@gmail.com" &&
      password === "editor123"
    ) {
      user = {
        name: "Editor User",
        email,
        role: "Editor",
      };
    }

    if (
      email === "viewer@gmail.com" &&
      password === "viewer123"
    ) {
      user = {
        name: "Viewer User",
        email,
        role: "Viewer",
      };
    }

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    const token = generateToken(user);

    localStorage.setItem("token", token);

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-icon">
          🔐
        </div>

        <h1>Secure CMS</h1>

        <p className="login-subtitle">
          JWT Authentication & RBAC
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
          >
            Sign In →
          </button>

        </form>

        <div className="demo-box">

          <h3>Demo Accounts</h3>

          <div className="demo-account">
            <strong>👑 Admin</strong>
            <span>admin@gmail.com / admin123</span>
          </div>

          <div className="demo-account">
            <strong>✏️ Editor</strong>
            <span>editor@gmail.com / editor123</span>
          </div>

          <div className="demo-account">
            <strong>👁️ Viewer</strong>
            <span>viewer@gmail.com / viewer123</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;