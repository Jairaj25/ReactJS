import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/home/index.js';
import { ExplorePage } from '../pages/explore/index.js';
import { NavbarComponent } from '../components/common/navbar/index.js';
import { AboutPage } from '../pages/about/index.js';
import { AccountPage } from '../pages/account/index.js';
import { PrivacyPage } from '../pages/privacy/index.js';
import { FoodDetailPage } from "../pages/food-detail/index.js";
import { AuthForm } from "../pages/authform/index.js";
import { CartPage } from "../pages/cart/index.js";
import { MockApiOperationsPage } from "../pages/mockapi-operations/index.js";

export default function MainRouter() {
  return (
    <Router>
        <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/signup" element={<AuthForm />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cart" element={<CartPage isPopUp={true}/>} />
        <Route path="/food/:category/:foodName" element={<FoodDetailPage />} />
        <Route path="/users" element={<MockApiOperationsPage />} />
      </Routes>
    </Router>
  );
}