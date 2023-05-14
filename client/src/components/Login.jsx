import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser } from '../api-client/auth.js';
import './Login.css'

const Login = ({
  setIsLoggedIn,
  setToken,
  setUser,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
      event.preventDefault();
      const userToAuth = { username: username, password: password };
      const data = await loginUser(userToAuth);

      if (data.token) {
          setIsLoggedIn(true);
          setUsername('');
          setPassword('');
          setUser(data.user)
          setToken(data.token)
          navigate("/")
      }
  }

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" id="loginButt">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </>
  );
};

export default Login;