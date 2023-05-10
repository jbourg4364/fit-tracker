export const getMe = async (token) => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/users/me',
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const { success, error, data } = await response.json();  
      return { success, error, user: data };
    } catch (error) {
      console.error(error);
    }
  };
  
export const loginUser = async (userObject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userObject),
        }
      );
  
      const { success, error, data } = await response.json();
  
      if (success) {
        const { token, message } = data;
        const { success, error, user } = await getMe(token);
        if (user) {
          user.token = token; // Store token in user object
          localStorage.setItem('token', token);
          return { token, message, user };
        }
        return { token, message, error };
      }
      if (!success && !error) {
        const { name, message } = data;
        return { name, message };
      }
    } catch (error) {
      console.error(error);
    }
  };
  

export const registerUser = async (userObject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        }
      );
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
};
  