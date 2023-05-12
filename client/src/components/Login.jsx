import React, { useState } from 'react';
import { loginUser } from '../api-client/auth.js'; // replace with the file where loginUser function is declared

const Login = ({
  setIsLoggedIn,
  setToken,
  setUser,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      } else {
          // Handle login failure here
          // For example, you can set an error message to display to the user
      }
  }

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <label>
                  Username:
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </label>
              <label>
                  Password:
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              <input type="submit" value="Submit" />
          </form>
      </div>
  );
}

export default Login;