
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav style={{ background: '#1e2a38', padding: '10px 20px', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <h2 style={{ color: 'white' }}>
        <span role="img" aria-label="book">📚</span> Book Review Platform
      </h2>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/books" style={{ color: 'white', marginRight: '15px' }}>Home</Link>
            <Link to="/add-book" style={{ color: 'white', marginRight: '15px' }}>Add Book</Link>
            <button onClick={onLogout} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '15px' }}>Login</Link>
            <Link to="/register" style={{ color: 'white' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
