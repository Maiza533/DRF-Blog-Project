import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok) {
          alert("Signup Successfully")
          navigate("/")
        } else {
          console.log(data);
          setError(data.message || "Signup Failed");
        }
      })
      .catch ((err) => {
        console.log(err);
        setError("Something went wrong");
      });
      
  };

  return (
    <div className="body-container">
      <div className="signup">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <label>Username:</label>
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email:</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password:</label>
          <input
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p>
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;