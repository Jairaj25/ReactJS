import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/homepage';
import { ExplorePage } from '../../pages/explorepage';
import { NavbarComponent } from './navbar';
import { AboutPage } from '../../pages/aboutpage';
import { AccountPage } from '../../pages/accountpage';
import { CartPage } from '../../pages/cartpage';
import { PrivacyPage } from '../../pages/privacypage';

export default function MainRouter() {
  return (
    <Router>
        <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </Router>
  );
}