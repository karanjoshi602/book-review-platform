const Review = require('../models/Review');


const getReviewsByBook = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'name'); // show user's name
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.bookId;

  if (!rating || !bookId) {
    return res.status(400).json({ message: 'Rating and Book ID are required.' });
  }

  try {
    const newReview = new Review({
      user: req.user._id,      
      book: bookId,            
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getReviewsByBook,
  createReview
};
