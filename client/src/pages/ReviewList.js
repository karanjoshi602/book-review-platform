import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReviewList = () => {
  const { bookId } = useParams();  
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${bookId}`);
        setReviews(res.data);
      } catch (err) {
        console.error('Error fetching reviews:', err.message);
      }
    };

    fetchReviews();
  }, [bookId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} style={{ marginBottom: '20px' }}>
            <strong>{review.user?.name || 'Anonymous'}:</strong>
            <p><em>Rating: {review.rating}/5</em></p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
