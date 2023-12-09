import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className = "navbar-brand" to="/">
                    Home
                </Link>
                <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "nav-item">
                            <Link className = "nav-link" to="/post">
                                Create Products
                            </Link>
                        </li>
                        <li className = "nav-item">
                            <Link className = "nav-link" to="/">
                                View Products
                            </Link>
                        </li>
                        <li className = "nav-item">
                            <Link className = "nav-link" to="/update">
                                Update Products
                            </Link>
                        </li>
                        <li className = "nav-item">
                            <Link className = "nav-link" to="/delete">
                                Delete products
                            </Link>
                        </li>
                        <li className = "nav-item">
                            <Link className = "nav-link" to="/about">
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