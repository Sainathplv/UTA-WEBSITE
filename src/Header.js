// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';  // This should be Header.css to match with the file name.
import mainlogo from "./mainlogo.png";

function Header() {
    return (
        <header>
            <div className="logo">
                <Link to="/"><img src={mainlogo} alt="University of Texas at Arlington" /></Link>
            </div>
            <nav className="main-nav">
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contactus">ContactUs</Link></li>
                    <li><Link to="/ImageUpload">AIhelp</Link></li>
                    <li><a href="https://plv9223.uta.cloud/" target="_blank" rel="noopener noreferrer">Blog</a></li>
                </ul>
                <button><Link to="/login">Login</Link></button>
                <button><Link to="/signup">SignUp</Link></button>
            </nav>
        </header>
    );
}

export default Header;
