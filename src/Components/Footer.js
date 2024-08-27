import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Assuming you want to style it with a separate CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </footer>
  );
};

export default Footer;
