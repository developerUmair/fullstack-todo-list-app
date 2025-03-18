import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/authService";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userData = await signIn(credentials);
      setUser(userData);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="save-btn">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
