import React from 'react';
import './Footer.css';
import { Link } from 'gatsby';
import CruzRojaLogo from '../../../static/cruz-roja-espanola-horizontal.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms and conditions</Link>
            <p>
                Developed for <CruzRojaLogo style={{ height: '1rem' }} />
            </p>
        </footer>
    );
};

export default Footer;
