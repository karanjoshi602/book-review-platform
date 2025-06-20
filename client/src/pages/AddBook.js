
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/books', bookData);
      alert('✅ Book added successfully!');
      navigate('/books');
    } catch (error) {
      console.error('Error adding book:', error.message);
      alert(' Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto',
      backgroundColor: '#f8f8f8',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      marginBottom: '12px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px'
    },
    textarea: {
      minHeight: '100px'
    },
    button: {
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={bookData.title}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={bookData.description}
          onChange={handleChange}
          style={{ ...styles.input, ...styles.textarea }}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
