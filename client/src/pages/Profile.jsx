import { useEffect } from 'react';
import { useUser } from '../components/UserContext'
import { useState } from 'react';
import Toast from '../components/Toast';
import axios from 'axios'

const Profile = () => {
  const { user, setUser } = useUser();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";

  const updateUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/update-user`, { user });
      const data = response.data;

      if (data.success) setMessage(data.message);
      else setError(data.message)
    } catch(err) {
      console.error('Error updating user', err);
      setError('Error updating user');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (e.target.value == 'Save') {
        updateUser();
      } else if (e.target.value == 'Cancel') {
        console.log('Cancelled operation')
      }
    } catch(err) {
      console.error('Error saving user', err);
    }
  };

  useEffect(() => {

  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className='text-5xl font-bold'>Your Profile</h1>
      {message && (
        <Toast type='success' message={message} onClose={setIsOpen(false)} />
      )}
      {error && (
        <Toast type='error' message={error} onClose={setIsOpen(false)} />
      )}
      {isOpen ? (
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col rounded-xl gap-10 my-14 shadow-custom bg-white/10 px-15 py-10'>
          <input type="text" value={user?.username} onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))} className='mx-10 px-8 py-4 rounded-lg text-black' placeholder='Username' />
          <input type="email" value={user?.email} onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} className='mx-10 px-8 py-4 rounded-lg text-black' placeholder='Email' />
          <input type="password" value={user?.password} onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} className='mx-10 px-8 py-4 rounded-lg text-black' placeholder='Password' />
          <div className='flex w-full items-center justify-center gap-10'>
            <input type="submit" onClick={(e) => handleSubmit(e)} className='bg-white/30 shadow-lg text-white hover:bg-white/20 transition-all duration-400 rounded-lg py-4 px-8 cursor-pointer font-semibold' value='Save' />
            <input type="submit" onClick={(e) => handleSubmit(e)} className='bg-white shadow-lg text-white/30 border hover:bg-clip-text hover:bg-white transition-all duration-400 rounded-lg py-4 px-8 cursor-pointer font-semibold' value='Cancel' />
          </div>
        </form>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Profile
