
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import { BookingsPage } from '@/pages/BookingsPage';
import Roadmap from '@/pages/Roadmap';
import ServiceProvidersPage from '@/pages/ServiceProvidersPage';
import CleanerReviews from '@/pages/CleanerReviews';
import NotFound from '@/pages/NotFound';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/service-providers" element={<ServiceProvidersPage />} />
      <Route path="/cleaner/:cleanerId/reviews" element={<CleanerReviews />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
