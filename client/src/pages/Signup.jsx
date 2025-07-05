import React from 'react'
import axios from 'axios'

const Signup = () => {
  const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

  const signup = async () => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {});
      const data = response.data;
    } catch(err) {
      console.error('Error logging in', err);
    }
  };

  return (
    <div>
      Signup
    </div>
  )
}

export default Signup
