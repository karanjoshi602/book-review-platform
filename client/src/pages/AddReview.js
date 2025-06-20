
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddReview = () => {
  const { bookId } = useParams();
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first.');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/reviews/${bookId}`,
        { rating },  // Removed content
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Review submitted!');
      navigate('/books');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <label>Rating (1 to 5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
