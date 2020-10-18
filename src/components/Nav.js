import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import { Context } from './../utils/Context';
import logo from '../img/logo.png';

const Nav = () => {
    const {logins} = useContext(Context);
    const [login, setLogin] = logins;

    const handleLogout = () => {
        setLogin(false);
        sessionStorage.clear()
    }

    return (
        <header>
            <img src={logo} alt="logo" width="200px" />
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>

                    { login ? (
                        <>
                            <li><Link to="/movie">Movie List Editor</Link></li>
                            <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
                        </>
                    ) : <li><Link to="/login">Login</Link></li>
                    }                    
                </ul>
            </nav>
        </header>
    );
}

export default Nav