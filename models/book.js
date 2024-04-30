const mongoose = require('mongoose');
const errorHandler = require('../middlewares/errorHandler');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
});

// Virtual properties are not stored in MongoDB document but computed on accessing 
bookSchema.virtual('coverImagePath').get(function() {
  try {
    if (this.coverImage != null && this.coverImageType != null) {
      // Image made in base 64 format
      return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`;
    }
  } catch (error) {
    errorHandler(error, null, null, next); 
  }
});

module.exports = mongoose.model('Book', bookSchema);