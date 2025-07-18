import { useEffect } from 'react';
import { useUser } from '../components/UserContext'

const Profile = () => {
  const { user, setUser } = useUser();

  const handleSubmit = () => {

  };

  useEffect(() => {

  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className='text-5xl font-bold'>Your Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col rounded-xl gap-10 my-14 shadow-custom bg-gradient-to-br from-indigo-700 via-violet-500 to-indigo-600 px-15 py-10'>
        <input type="text" value={user?.username} onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))} className='mx-10 px-8 py-4 rounded-lg text-black' placeholder='Username' />
        <input type="email" value={user?.email} onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} className='mx-10 px-8 py-4 rounded-lg text-black' placeholder='Email' />
        <input type="password" value={user?.password} onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} className='mx-10 px-8 py-4 rounded-lg text-black' placeholder='Password' />
        <div className='flex w-full items-center justify-center gap-10'>
          <input type="submit" className='bg-white/10 hover:bg-white/20 transition-all duration-400 rounded-lg py-4 px-8 cursor-pointer font-semibold' value='Save' />
          <input type="submit" className='bg-white/10 hover:bg-white/20 transition-all duration-400 rounded-lg py-4 px-8 cursor-pointer font-semibold' value='Cancel' />
        </div>
      </form>
    </div>
  )
}

export default Profile
