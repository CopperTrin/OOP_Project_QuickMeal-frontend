import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import qs from 'qs'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

const LoginForm = () => {
  
    const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serializedFormData = qs.stringify(formData);

      const response = await api.post('/auth/token',serializedFormData, {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
      });

      if (response.status === 200) {
        // Set cookie with expiration time 30 minutes from now
        const expirationTime = new Date(new Date().getTime() + 30 * 60000);
        Cookies.set('token', response.data.access_token, { expires: expirationTime });
        console.log('Login successful');
        // Redirect or do something else upon successful login
      } else {
        console.log('Login failed');
        // Display error message or handle failed login
      }
    } catch (error) {
      console.error(error);
      console.log('Login failed');
      // Display error message or handle failed login
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;