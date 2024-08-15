import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HuntFinder from './pages/HuntFinder';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HuntFinder />} />
      </Routes>
    </Router>
  );
}

export default App;
