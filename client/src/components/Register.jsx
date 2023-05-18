import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../api-client/auth';
import './Register.css'
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await registerUser({ username, password });

    if (result.error) {
      setError(result.message);
      window.alert(error);
    } else {
      window.alert("Congratulations! You are now registered!");
      navigate('/login')
    }
  };

  return (
    <div className="register-container">
      <h1 id="registerHeader">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" id="registerButt">Register</button>
      </form>
      <p>
          Have an account? <a href="/login">Login</a>
        </p>
    </div>
  );
};

export default Register;
