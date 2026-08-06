import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Roster from './Roster';
import About from './About';
import Clock from './Clock';
import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar">
      
        <Link to="/roster">Roster</Link>
        <Link to="/about">About</Link>
        <Link to="/clock">Clock</Link>
      </nav>

      <Routes>
       
        <Route path="/roster" element={<Roster />} />
        <Route path="/about" element={<About />} />
        <Route path="/clock" element={<Clock />} />
      </Routes>
      
    </div>
  );
}

export default App;
