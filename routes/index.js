const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const errorHandler = require('../middlewares/errorHandler'); 

router.get('/', async (req, res, next) => {
  let books;
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec();
    res.render('index', { books: books });
  } catch (error) {
    errorHandler(error, req, res, next); 
  }
});

module.exports = router;