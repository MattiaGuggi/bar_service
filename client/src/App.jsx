import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Drinks from './pages/Drinks';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { useState } from 'react';
import { UserProvider } from './components/UserContext';
import DrinkPage from './pages/DrinkPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <UserProvider>
      <Router>
        {!isAuthenticated ? (
          <div className="relative w-full min-h-screen pt-20 px-4 sm:px-8 text-center flex justify-center items-center flex-col
            overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white transition-colors duration-500">
            <Routes>
              <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
          </div>
        ) : (
          <>
          <Navbar />
          <div className="relative w-full min-h-screen pt-20 px-4 sm:px-8 text-center flex justify-center items-center flex-col
            overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white transition-colors duration-500">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/drinks" element={<Drinks />} />
              <Route path="/drinks/:id" element={<DrinkPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          </>
        )}
      </Router>
    </UserProvider>
  );
}

export default App;
