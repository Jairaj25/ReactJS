import React, { useState } from 'react';
import websiteLogo from "../../assets/website-logo.jpeg";
import searchIcon from "../../assets/search-icon.svg";
import cartIcon from "../../assets/shopping-cart-icon.svg";
import usersIcon from "../../assets/users-icon.svg";
import { Link, useLocation } from 'react-router-dom';
import "../../styles/navbar.css";

export const NavbarComponent = () => {

    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <nav>
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
                            <p>Login</p>
                            <p>Sign Up</p>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}