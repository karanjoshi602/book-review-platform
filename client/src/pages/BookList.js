
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    item: {
      marginBottom: '20px',
      padding: '15px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '20px',
      margin: '0 0 5px',
      color: '#333',
    },
    author: {
      fontWeight: 'bold',
      marginBottom: '4px',
    },
    description: {
      margin: '6px 0',
    },
    rating: {
      fontStyle: 'italic',
      color: '#666',
    },
    links: {
      marginTop: '10px',
    },
    link: {
      marginRight: '10px',
      textDecoration: 'none',
      color: '#007bff',
      fontWeight: 'bold',
    }
  };

  return (
    <div style={styles.container}>
      <h2>📚 All Books</h2>

      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul style={styles.list}>
          {books.map((book) => (
            <li key={book._id} style={styles.item}>
              <h3 style={styles.title}>{book.title}</h3>
              <p style={styles.author}>Author: {book.author}</p>
              <p style={styles.description}>{book.description}</p>
              <p style={styles.rating}>Rating: {book.rating}/5</p>
              <div style={styles.links}>
                <Link to={`/reviews/${book._id}`} style={styles.link}>View Reviews</Link>
                <Link to={`/add-review/${book._id}`} style={styles.link}>Add Review</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
