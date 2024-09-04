// src/components/Navbar.js
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search/location">Location Search</Link>
        </li>
        <li>
          <Link to="/search/image">Image Search</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
