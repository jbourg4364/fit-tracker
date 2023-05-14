import React from "react";
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = ({isLoggedIn}) => {
    const navigate = useNavigate();

    const handleClick = (route) => {
        navigate(route);
    }

    return(
        <div className="homeComponent">
            {isLoggedIn ? (
                <>
                    <h1 className="homeTitle">You're part of the community now!</h1>
                    <p className="homeDetails">Let's build your workout routine!</p>
                    <button className="joinButton" onClick={() => handleClick('/routines')}>Let's go!</button>
                </>
            ) : (
                <>
                    <h1 className="homeTitle">Achieve the body you want!</h1>
                    <p className="homeDetails">Join our community and track your workout routines and activities. Be part of something great and start your fitness journey with us today!</p>
                    <button className="joinButton" onClick={() => handleClick('/register')}>Join now!</button>
                </>
            )}
        </div>
    )
};

export default Home;
