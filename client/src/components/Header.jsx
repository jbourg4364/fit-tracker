import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from './index'
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn, setUser }) => {

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
                {isLoggedIn ? (
                    <NavLink to="/myroutines" className="navLink">My Routines</NavLink>
                ) : null}
                
            </nav>
            <div className='loginLogoutButtons'>
                {isLoggedIn ? (
                    <Logout setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
                ) : (
                    <NavLink to="/login" className="authButton">Login</NavLink>
                )}
            </div>
        </div>
    );
};

export default Header;
