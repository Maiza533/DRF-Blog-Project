import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("LOGIN DATA:", data); 

        if (res.ok) {
          localStorage.setItem("token", data.access);
          localStorage.setItem("user_id", data.user_id);
          window.location.href = "/blogs"; 
        } else {
          setError("Invalid Credentials")
        }
      });
      
      
  };

  return (
    <div className="body-container">
      <div className="login">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p>
          Don't have an account?{" "}
          <span
            className="link"
            onClick={() => navigate("/signup")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

