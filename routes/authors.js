const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
const errorHandler = require('../middlewares/errorHandler'); 

// All Authors Route
router.get('/', async (req, res, next) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    // Case insensitive regex search
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    });
  } catch (error) {
    errorHandler(error, req, res, next); 
  }
});

// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// Create Author Route
router.post('/', async (req, res, next) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors/${newAuthor.id}`);
  } catch (error) {
    errorHandler(error, req, res, next); 
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res.render('authors/show', {
      author: author,
      booksByAuthor: books
    });
  } catch (error) {
    errorHandler(error, req, res, next); 
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render('authors/edit', { author: author });
  } catch (error) {
    errorHandler(error, req, res, next); 
  }
});

router.put('/:id', async (req, res, next) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch (error) {
    errorHandler(error, req, res, next); 
  }
});

router.delete('/:id', async (req, res, next) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect('/authors');
  } catch (error) {
    errorHandler(error, req, res, next); 
  }
});

module.exports = router;