const express = require('express');
const router = express.Router();
const {
  getReviewsByBook,
  createReview
} = require('../controllers/reviewController');

const { protect } = require('../middleware/authMiddleware');


router.get('/:bookId', getReviewsByBook);

router.post('/:bookId', protect, createReview);

module.exports = router;
