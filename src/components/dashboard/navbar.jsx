import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import logo from '../../assets/github-mark-white.png';

const profileIcon =' https://avatars.githubusercontent.com/u/1?s=40&v=4';

 const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar-container">
      <Link to="/" className="logo-link">
        <img className="site-logo" src={logo} alt="personalgit logo" />
        <span className="logo-text">Personalgit</span>
      </Link>

      <div className="navbar-right">
        <Link
          to="/create"
          className={`nav-link ${
            location.pathname.startsWith("/create") ? "active" : ""
          }`}
        >
          <span className="nav-icon"  />
          <span>Create Repository</span>
        </Link>
        <Link
          to="/profile"
          className={`nav-link ${
            location.pathname.startsWith("/profile") ? "active" : ""
          }`}
        >
          <span className="nav-icon" style={{ backgroundImage: `url(${profileIcon})` }} />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;