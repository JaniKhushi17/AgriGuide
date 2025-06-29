import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);


  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowMore(!showMore);
  const handleNavigate = (path) => navigate(path);

  return (
    <nav className="navbar">
      <div className="logo">AgriGuide</div>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <button onClick={() => handleNavigate("/")} className="nav-btn">Home</button>
        <button onClick={() => handleNavigate("/weather")} className="nav-btn">Weather</button>
        <button onClick={() => handleNavigate("/chatbot")} className="nav-btn">Chatbot</button>
        <button onClick={() => handleNavigate("/PlantDiseasePrediction")} className="nav-btn">Diagnosis</button>
        <button onClick={() => handleNavigate("/login")} className="nav-btn">Login</button>

        {/* Show More Dropdown */}
        <div className="dropdown">
          <button className="dropdown-btn" onClick={toggleDropdown}>
            Show More 
          </button>
          {showMore && (
            <div className="dropdown-menu">
              <button onClick={() => handleNavigate("/scheme")} className="dropdown-item">Scheme</button>
              <button onClick={() => handleNavigate("/news")} className="dropdown-item">News</button>
              {/* <button onClick={() => handleNavigate("/dashboard")} className="dropdown-item">Dashboard</button> */}
              <button onClick={() => handleNavigate("/learning")} className="dropdown-item">Learning</button>
              <button onClick={() => handleNavigate("/appointment")} className="dropdown-item">Service</button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
