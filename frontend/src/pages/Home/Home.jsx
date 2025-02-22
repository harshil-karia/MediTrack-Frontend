import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { assets } from '../../assets/assets';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <h1>Manage Your Medical Records Easily</h1>
                <p>Upload, track, and manage your medical reports securely in one place.</p>
                <button className="cta-btn" onClick={() => navigate('/reports')}>Get Started</button>
            </div>

            {/* Feature Section */}
            <div className="features">
                <div className="feature-card" onClick={() => navigate('/history')}>
                    <img src={assets.history_icon} alt="History" />
                    <h3>View Report History</h3>
                    <p>Check all your previously uploaded medical reports.</p>
                </div>

                <div className="feature-card" onClick={() => navigate('/reports')}>
                    <img src={assets.upload_icon} alt="Upload" />
                    <h3>Upload New Report</h3>
                    <p>Securely upload your medical reports anytime.</p>
                </div>

                <div className="feature-card" onClick={() => navigate('/profile')}>
                    <img src={assets.profile_icon} alt="Profile" />
                    <h3>Manage Profile</h3>
                    <p>Update personal details and manage your account.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
