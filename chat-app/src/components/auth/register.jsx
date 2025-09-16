import { useState } from "react";
import { generateCsrf, registerUser } from "../../services";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [avatar] = useState(() => {
    const randomId = Math.floor(Math.random() * 70) + 1;
    return `https://i.pravatar.cc/80?img=${randomId}`;
  });
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);
    try {
      const csrfToken = await generateCsrf();
      await registerUser(username, password, email, avatar, csrfToken);
      setSuccess("Registration successful, redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      setError(
        "Registration failed. The username or email may already be in use, or the input is invalid."
      );
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-avatar-wrapper">
            <img
              className="register-avatar"
              src={avatar}
              alt="Avatar preview"
              onError={(e) => (e.target.src = "https://i.pravatar.cc/80")}
            />
          </div>
          <div className="register-field">
            <label htmlFor="register-username">Username:</label>
            <input
              id="register-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="register-field">
            <label htmlFor="register-password">Password:</label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="register-field">
            <label htmlFor="register-email">Email:</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="register-submit" type="submit">
            Register
          </button>
        </form>
        {success && <p className="register-success">{success}</p>}
        {error && <p className="register-error">{error}</p>}
        <p className="register-login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
