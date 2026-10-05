import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const existingUser = JSON.parse(
      localStorage.getItem("techlearnUser")
    );

    if (existingUser && existingUser.email === email) {
      alert("An account with this email already exists.");
      return;
    }

    const user = {
      name,
      email,
      password,
      role: "student",
    };

    localStorage.setItem("techlearnUser", JSON.stringify(user));

    alert("Student account created successfully!");

    navigate("/login");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="page-badge">TECHLEARN</span>

        <h1>Create Account</h1>

        <p>Start your learning journey today.</p>

        <form onSubmit={handleSignup}>
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit" className="primary-btn">
            Create Account
          </button>
        </form>

        <p className="auth-bottom">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;