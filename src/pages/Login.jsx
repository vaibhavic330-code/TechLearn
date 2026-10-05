import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("techlearnUser"));

    if (!user || user.email !== email || user.password !== password) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("techlearnLoggedIn", "true");

    alert("Login successful!");

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="page-badge">TECHLEARN</span>

        <h1>Welcome Back</h1>

        <p>Login to continue your learning journey.</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>

        <p className="auth-bottom">
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;