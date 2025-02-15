// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserAuth from './components/UserAuth'
import FirebaseValidation from './components/FirebaseValidation'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirebaseValidation />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
