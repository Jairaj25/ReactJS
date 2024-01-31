import React, { useState } from 'react';
import websiteLogo from "../../../assets/website-logo.jpeg";
import searchIcon from "../../../assets/search-icon.svg";
import cartIcon from "../../../assets/shopping-cart-icon.svg";
import usersIcon from "../../../assets/users-icon.svg";
import hamburgerIcon from "../../../assets/hamburger.svg";
import leftArrow from "../../../assets/chevron-left3.svg";
import loginArrow from "../../../assets/login-arrow.svg";
import signUpIcon from "../../../assets/signup-icon.svg";
import { Link, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import "./index.css";

export const NavbarComponent = () => {

    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    Modal.setAppElement('#root');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleToggleNav = () => {
        document.getElementById('root').classList.toggle('modal-open');
        setIsNavOpen(!isNavOpen);
        document.documentElement.classList.toggle('overflow-hidden');
        document.body.classList.toggle('overflow-hidden');
    };

    const handleCloseMenu = () => {
        document.getElementById('root').classList.remove('modal-open');
        setIsNavOpen(false);
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
    };

    return (
        <nav>
            <div className="desktop-nav">
                <div className="nav-group">
                    <div className="website-logo">
                        <img src={websiteLogo} alt="Generic Website Logo" width={70} height={70} />
                    </div>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                        Home
                    </Link>
                    <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                        About Us
                    </Link>
                    <Link to="/privacy" className={location.pathname === '/privacy' ? 'active' : ''}>
                        Privacy Policy
                    </Link>
                </div>

                <div className="action-group">
                    <div>
                        <img src={searchIcon} alt="Search" width={22} height={22} className="search-icon" />
                    </div>
                    <Link to="/cart">
                        <img src={cartIcon} alt="Cart" width={22} height={22} />
                    </Link>
                    <div className={`menu-icon ${menuOpen ? 'open' : ''} hamburger-menu`} onClick={toggleMenu}>
                        <img src={usersIcon} alt="users" width={22} height={22} />
                        {menuOpen && (
                            <div className="menu-options">
                                <Link to="/login">
                                    <img src={loginArrow} alt="login" width={22} height={22} />
                                    <p>Login</p>
                                </Link>
                                <Link to="/signup">
                                    <img src={signUpIcon} alt="signUp" width={22} height={22} />
                                    <p>Sign up</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mobile-nav">
                <div className="mobile-nav-hamburger" onClick={handleToggleNav}>
                    <img src={hamburgerIcon} alt="burgir" />
                </div>
                <div className="mobile-nav-search">
                    <img src={searchIcon} alt="Search" width={22} height={22} className="search-icon" />
                </div>
                <Modal
                    isOpen={isNavOpen}
                    contentLabel="Mobile Overlay"
                    overlayClassName="mobile-nav-overlay"
                    className="mobile-nav-content"
                >
                    <div className="mobile-nav-overlay-close-icon" onClick={handleCloseMenu}>
                        <img src={leftArrow} alt="close" />
                    </div>
                    <div className="nav-content">
                        <div className={`mobile-nav-home-link ${location.pathname === '/' ? 'active' : ''}`} onClick={handleCloseMenu}>
                            <Link to="/">
                                Home
                            </Link>
                        </div>
                        <div className={`mobile-nav-about-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={handleCloseMenu}>
                            <Link to="/about">
                                About Us
                            </Link>
                        </div>
                        <div className={`mobile-nav-privacy-link ${location.pathname === '/privacy' ? 'active' : ''}`} onClick={handleCloseMenu}>
                            <Link to="/privacy">
                                Privacy Policy
                            </Link>
                        </div>
                        <div className={`mobile-nav-cart-link ${location.pathname === '/cart' ? 'active' : ''}`} onClick={handleCloseMenu}>
                            <Link to="/cart">
                                <img src={cartIcon} alt="Cart" width={22} height={22} />
                                <p>Cart</p>
                            </Link>
                        </div>
                        <div className={`mobile-nav-login-link ${location.pathname === '/login' ? 'active' : ''}`} onClick={handleCloseMenu}>
                            <Link to="/login">
                                <img src={loginArrow} alt="login" width={22} height={22} />
                                <p>Login</p>
                            </Link>
                        </div>
                        <div className={`mobile-nav-signup-link ${location.pathname === '/signup' ? 'active' : ''}`} onClick={handleCloseMenu}>
                            <Link to="/signup">
                                <img src={signUpIcon} alt="signUp" width={22} height={22} />
                                <p>Sign up</p>
                            </Link>
                        </div>
                    </div>
                </Modal>
            </div>
        </nav>
    )
}