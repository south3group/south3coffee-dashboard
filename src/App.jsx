import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AdminHome from './pages/AdminHome/AdminHome';
import AdminLogin from './pages/AdminLogin/AdminLogin';

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </>
  );
};

export default App;
