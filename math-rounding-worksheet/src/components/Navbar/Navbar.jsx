import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar_wrapper">
      <ul>
        <li>
          <a href="/">Worksheet</a>
        </li>
        <li>
          <a href="/ranking">Ranking</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
