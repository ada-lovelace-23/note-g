import React from 'react';
import './Footer.css'
import { Link } from "gatsby"

const Footer = () => {
    return (
        <div className="footer">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms and conditions</Link>
        </div>
    );
};

export default Footer;
