import React, { useState } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';

import Login from './components/login';
import AdminDashboard from './components/Dashboard';

function ProtectedAdminRoute({ children, isAuthenticated }) {
  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token'))
  );

  // HashRouter is required for local navigation inside the Android WebView.
  const Router = Capacitor.isNativePlatform() ? HashRouter : BrowserRouter;

  const handleLogin = () => {
    setIsAuthenticated(Boolean(localStorage.getItem('token')));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute isAuthenticated={isAuthenticated}>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
