import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Drinks from './pages/Drinks';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Animation from './components/Animation';

function App() {
  return (
    <Router>
      <Navbar />
      <Animation left={''} right={''} top={''} bottom={''} />
      <div className="relative w-full min-h-screen pt-20 px-4 sm:px-8 text-center flex justify-center items-center flex-col
        overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white transition-colors duration-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/drinks" element={<Drinks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
