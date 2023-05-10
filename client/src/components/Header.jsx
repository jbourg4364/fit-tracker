import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div id='header'>
            <h1>Slim GEMS</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/activities">Activities</NavLink>
                <NavLink to="/routines">Routines</NavLink>
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
            </nav>
        </div>
    )
};

export default Header;
