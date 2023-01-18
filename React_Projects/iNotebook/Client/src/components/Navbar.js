import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const location = useLocation();

  const navigate = useNavigate();

  const {showAlert} = props;

  const handleLogout = () => {

    localStorage.removeItem('auth_token');
    navigate('/login');
    showAlert('Successfully logged out!','success');

  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={location.pathname === "/" || location.pathname === "/login" ? { color: "white" } : {}}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={location.pathname === "/about" ? { color: "white" } : {}}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('auth_token') ?
          <>
          <Link to="/login"
            className="btn btn-secondary" tabIndex="-1"
            role="button"
            
          >
            Login
          </Link>
          <Link to="/signup"
            className="btn btn-secondary mx-1" tabIndex="-1"
            role="button"
            
          >
            SignUP
          </Link></> :
           <button className="btn btn-secondary" onClick={handleLogout}>LogOut</button> }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
