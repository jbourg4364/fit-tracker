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
        <div id='headerComponent'>
            <div className='headerLogo'>
                <img src="https://img.freepik.com/premium-vector/fitness-logo_686735-473.jpg?w=2000" alt="Slim Gems logo" />
                <h1>SLIM GEMS</h1>
            </div>
            <nav>
                <NavLink to="/" className="navLink">Home</NavLink>
                <NavLink to="/activities" className="navLink">Activities</NavLink>
                <NavLink to="/routines" className="navLink">Routines</NavLink>
            </nav>
            <div className='loginLogoutButtons'>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className='authButton'>Logout</button>
                ) : (
                    <button onClick={handleLogin} className='authButton'>Login</button>
                )}
            </div>
        </div>
    )
};

export default Header;
