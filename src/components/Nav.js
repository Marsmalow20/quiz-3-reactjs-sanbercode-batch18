import React from 'react';
import {Link} from "react-router-dom";
import logo from '../img/logo.png'

const Nav = () => {
    return (
        <header>
            <img src={logo} alt="logo" width="200px" />
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/movie">Movie List Editor</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Nav