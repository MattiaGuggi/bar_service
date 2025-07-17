import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navOptions = [
  { label: 'Home', path: '' },
  { label: 'Login', path: 'login' },
  { label: 'Signup', path: 'signup' },
  { label: 'Drinks', path: 'drinks' }
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeOption, setActiveOption] = useState('');

  useEffect(() => {
    const currentPath = location.pathname.replace('/', '');
    setActiveOption(currentPath);
  }, [location]);

  const redirectToPage = (page) => {
    setActiveOption(page);
    navigate(`/${page}`);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20
        flex items-center justify-center gap-4 sm:gap-8 p-4 sm:p-5 text-sm sm:text-lg font-medium shadow-lg">
      {navOptions.map((opt) => (
        <button
          key={opt.path}
          onClick={() => redirectToPage(opt.path)}
          className={`px-4 py-2 rounded-full transition-all duration-300
            hover:bg-white/20 hover:text-white
            ${activeOption === opt.path ? 'bg-white/30 text-white backdrop-blur-sm' : 'text-white/60'}`}
        >
          {opt.label}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
