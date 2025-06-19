import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AdminHome from './pages/AdminHome/AdminHome';
import Classification from './pages/Classification/Classification'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/classification" element={<Classification />} />

      </Routes>
    </>
  );
};

export default App;
