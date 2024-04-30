const mongoose = require('mongoose');
const Book = require('./book');
const errorHandler = require('../middlewares/errorHandler');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Pre hook middleware, runs before database function 
// Won't allow deletion if there are any books by the author
authorSchema.pre('remove', async function(next) {
  try {
    const books = await Book.find({ author: this.id });
    if (books.length > 0) {
      throw new Error('This author has books still');
    }
    next(); // No books found, continue with deletion
  } catch (error) {
    errorHandler(error, null, null, next);
  }
});

module.exports = mongoose.model('Author', authorSchema);