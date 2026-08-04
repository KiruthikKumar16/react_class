import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Roster from './Roster';
import About from './About';
import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/roster">Roster</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
