export const getMe = async (token) => {
  try {
    const response = await fetch('http://localhost:8080/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

  
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
  
      if (response.status === 200) {
        const data = await response.json();
        const { token, message, user } = data;
  
        if (token) {
          localStorage.setItem('token', token);
          return { token, message, user };
        }
  
        return { message, error: data.error };
      } else if (response.status === 401) {
        const { error, message } = await response.json();
        return { error, message };
      }
  
      throw new Error('Unexpected server response');
    } catch (error) {
      console.error(error);
      return { error: error.message };
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
  