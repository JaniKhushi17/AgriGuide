import React from "react";
import "./Footer.css"; // Make sure to import the corresponding CSS file

const Footer = () => {
  return (
    <footer>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
      <div className="footer-content">
        {/* <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Diagnosis</li>
            <li>Crop Prediction</li>
            <li>Dashboard</li>
          </ul>
        </div> */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><i className="fas fa-phone"></i> 24/7 Helpline: 9586865254</li>
            <li><i className="fas fa-envelope"></i> teamsudarshan@gmail.com</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="follow">Follow Us</h4>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 AgriGuide. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
