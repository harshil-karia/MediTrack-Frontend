import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-light">
            <div className="container">
                {/* Brand Logo */}
                <Link className="navbar-brand" to="/">
                    <img src={assets.logo} alt="MediTrack" className="logo" />
                </Link>

                {/* Navbar Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${menu === "home" ? "active" : ""}`}
                                to="/"
                                onClick={() => setMenu("home")}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${menu === "history" ? "active" : ""}`}
                                to="/history"
                                onClick={() => setMenu("history")}
                            >
                                History
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${menu === "reports" ? "active" : ""}`}
                                to="/reports"
                                onClick={() => setMenu("reports")}
                            >
                                Reports
                            </Link>

                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${menu === "lab" ? "active" : ""}`}
                                to="/lab"
                                onClick={() => setMenu("lab")}
                            >
                                Admin
                            </Link>

                        </li>
                        <li className="nav-item">
                            <li className="nav-item">
                                <Link className={`nav-link ${menu === "profile" ? "active" : ""}`} to="/profile" onClick={() => setMenu("profile")}>
                                    Profile
                                </Link>
                            </li>

                        </li>
                       
                    </ul>

                    {/* Right Side (Sign In / Profile) */}
                    <div className="ms-auto d-flex align-items-center">
                        {!token ? (
                            <button className="btn btn-primary" onClick={() => setShowLogin(true)}>Sign In</button>
                        ) : (
                            <div className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img src={assets.profile_icon} alt="Profile" className="profile-icon" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                    <li onClick={() => navigate('/myorders')} className="dropdown-item">
                                        <img src={assets.profile_icon} alt="Profile" className="icon" />
                                        My Reports
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li onClick={logout} className="dropdown-item">
                                        <img src={assets.logout_icon} alt="Logout" className="icon" />
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
