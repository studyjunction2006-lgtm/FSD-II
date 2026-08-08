import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

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

    if (user) {
      const token = generateToken(user);

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>RBAC Login</h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
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

          <button type="submit">
            Login
          </button>

        </form>

        <br />

        <h3>Admin</h3>

        <p>admin@gmail.com</p>

        <p>admin123</p>

        <br />

        <h3>Editor</h3>

        <p>editor@gmail.com</p>

        <p>editor123</p>

        <br />

        <h3>Viewer</h3>

        <p>viewer@gmail.com</p>

        <p>viewer123</p>

      </div>
    </div>
  );
}

export default Login;