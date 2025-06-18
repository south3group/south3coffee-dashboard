import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AdminHome from './pages/AdminHome/AdminHome';


const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminHome />} />

      </Routes>
    </>
  );
};

export default App;
