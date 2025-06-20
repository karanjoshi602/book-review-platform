const Book = require('../models/Book');
const Review = require('../models/Review'); 


const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    const booksWithRatings = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ book: book._id });
        const avgRating =
          reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;
        return { ...book._doc, rating: avgRating };
      })
    );
    res.status(200).json(booksWithRatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  const { title, author, description } = req.body;

  try {
    const newBook = new Book({ title, author, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};
