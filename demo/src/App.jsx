// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './components/context/authContext';
import ProtectedRoute from './components/protectiveRoute/protectiveRoute';
import HomePage from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import PostCargo from './components/cargo/postCargo';
import FindDrivers from './components/driver/findDrivers';
import DriverRegistration from './components/driver/driverReg';
import EnterpriseRegistration from './components/enterprise/enterprise';
import Profile from './components/profile/profile';
import Tracking from './components/tracking/tracking';
import Messages from './components/messages/messages';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Settings from './components/settings/settings';
import Notifications from './components/notifications/notifications';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
          <ScrollToTop />
          <Toaster position="top-right" richColors />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/post-cargo" element={<ProtectedRoute><PostCargo /></ProtectedRoute>} />
            <Route path="/find-drivers/:cargoId" element={<ProtectedRoute><FindDrivers /></ProtectedRoute>} />
            <Route path="/driver-registration" element={<DriverRegistration />} />
            <Route path="/enterprise-registration" element={<ProtectedRoute><EnterpriseRegistration /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/tracking/:cargoId" element={<ProtectedRoute><Tracking /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;