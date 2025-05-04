import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Favorites from './pages/Favorites';
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import Login from './pages/Login';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/countries" element={<Countries/>} />
          <Route path="/country/:code" element={<CountryDetails/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
    </Router>
  )
}

export default App
