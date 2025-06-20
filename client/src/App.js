import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import AddReview from './pages/AddReview';
import ReviewList from './pages/ReviewList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="container">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/books" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books" element={isLoggedIn ? <BookList /> : <Navigate to="/login" />} />
            <Route path="/add-book" element={isLoggedIn ? <AddBook /> : <Navigate to="/login" />} />
            <Route path="/add-review/:bookId" element={isLoggedIn ? <AddReview /> : <Navigate to="/login" />} />
            <Route path="/reviews/:bookId" element={<ReviewList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
