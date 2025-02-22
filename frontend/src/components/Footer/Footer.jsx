import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <p className='text'>MediTrack</p>
                <div className="footer-social-icons">
                    <a href="https://www.facebook.com/AllNaturalTastyBite/" target="_blank" rel="noopener noreferrer">
                        <img src={assets.facebook_icon} alt=''/>
                    </a>
                    <a href="https://x.com/i/flow/login?redirect_after_login=%2Ftastybite" target="_blank" rel="noopener noreferrer">
                        <img src={assets.twitter_icon} alt=''/>
                    </a>
                    <a href="https://www.linkedin.com/company/tasty-bite-eatables-ltd/" target="_blank" rel="noopener noreferrer">
                        <img src={assets.linkedin_icon} alt=''/>
                    </a>
                </div>
            </div>
            
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <a href="" target="_blank" rel="noopener noreferrer">
                        <li>Home</li>
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer">
                        <li>About us</li>
                    </a>
                    
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91-123-1234-123</li>
                    <a href="https://www.tastybite.co.in/get-in-touch" target="_blank" rel="noopener noreferrer">
                        <li>contact@tastybites.com</li>
                    </a>
                </ul>
            </div>
        </div>
        
        <hr/>
        <p className='footer-copyright'><b>© 2024 MediTrack - All Rights Reserved.</b></p>
    </div>
  );
};

export default Footer;
