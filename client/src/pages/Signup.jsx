import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signup`, formData);
      const data = response.data;

      if (data.success) navigate('/login');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <>
      <form 
        onSubmit={signup} 
        className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl w-full max-w-md shadow-xl space-y-4"
      >
        <h2 className="text-3xl font-bold text-white">Sign Up</h2>
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        
        <button 
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
        >
          Create Account
        </button>

        <a href='/login'>Already have an account? <span className='cursor-pointer text-indigo-700 mt-10'>Login</span></a>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
    </>
  )
}

export default Signup
