import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand text-title px-3" to="/">
          Home
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto flex-fill">
            <li className="nav-item">
              <Link className="nav-link gen-nav1 px-3" to="/post">
                Create Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link gen-nav2" to="/">
                View Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link gen-nav3" to="/update">
                Update Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link gen-nav1" to="/delete">
                Delete products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link gen-nav2" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
