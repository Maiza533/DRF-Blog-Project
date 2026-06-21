import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css"; 

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      
      <Link to="/blogs" className="navbar-logo">
        BlogApp
      </Link>

      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <Link to="/" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/create" className="nav-link">
              Create
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <button onClick={handleLogout} className="nav-button">
              Logout
            </button>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
