import React from 'react'
import axios from 'axios'

const Login = () => {
  const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

  const login = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {});
      const data = response.data;
    } catch(err) {
      console.error('Error logging in', err);
    }
  };

  return (
    <div>
      Login
    </div>
  )
}

export default Login
