// const mongoose = require('mongoose');
const Book = require('../models/Book');

module.exports = {
  booksCaller: async (req, res) => {
    await Book.find({}, async (err, foundBooks) => {
      if (err) {
        return res.status(500).json({
          message: 'An error occured',
        });
      }
      return res.status(200).json(foundBooks);
    }).clone();
  },

  booksCreate: async (req, res) => {
    await Book.findOne({ title: req.body.title }, async (err, foundBook) => {
      if (err) {
        return res.status(500).json({
          message: 'An error occured',
        });
      }
      if (foundBook) {
        return res.status(200).json({
          message: 'Book with this title already exists',
        });
      }
      try {
        const {
          title,
          author,
          isbn,
          category,
          publisher,
          pages,
          rating,
        } = req.body;

        await Book.create({
          title,
          author,
          isbn,
          category,
          publisher,
          pages,
          rating,
        });
        return res.status(200).json({
          message: 'Book saved in database successfully',
        });
      } catch (error) {
        return res.status(400).json({
          message: 'An error occured while saving book in database',
        });
      }
    }).clone();
  },

  bookRetriever: async (req, res) => {
    const { title } = req.params;
    await Book.findOne({ title }, async (err, foundBook) => {
      if (err) {
        return res.status(500).json({
          message: 'An error occured',
        });
      }
      if (!foundBook) {
        return res.status(200).json({
          message: 'The book you are trying to load doesn\'t exists.',
        });
      }
      return res.status(200).json(foundBook);
    }).clone();
  },

  bookUpdater: async (req, res) => {
    const { title } = req.params;
    await Book.findOne({ title }, async (err, foundBook) => {
      if (err) {
        return res.status(500).json({
          message: 'An error occured',
        });
      }
      if (!foundBook) {
        return res.status(200).json({
          message: 'Book you are trying to update doesn\'t exist',
        });
      }
      try {
        const tempFoundBook = foundBook;
        const tempTitle = req.body.title;
        const {
          author,
          isbn,
          category,
          publisher,
          pages,
          rating,
        } = req.body;

        tempFoundBook.title = tempTitle;
        tempFoundBook.author = author;
        tempFoundBook.isbn = isbn;
        tempFoundBook.category = category;
        tempFoundBook.publisher = publisher;
        tempFoundBook.pages = pages;
        tempFoundBook.rating = rating;

        await tempFoundBook.save();
        return res.status(200).json({
          message: 'Book updated successfully',
        });
      } catch (error) {
        return res.status(400).json({
          message: 'An error occured while saving book in database',
        });
      }
    }).clone();
  },

  bookDeleter: async (req, res) => {
    const { title } = req.params;
    await Book.deleteOne({ title }).clone().then((result) => {
      if (result.deletedCount === 0) {
        return res.status(200).json({
          message: 'Book to be deleted doesn\'t exist',
        });
      }
      return res.status(200).json({
        message: 'Book deleted successfully',
      });
    }).catch(() => {
      res.status(500).json({
        message: 'An error occured',
      });
    });
  },

  bookFilterCall: async (req, res) => {
    const { filterType } = req.params;
    const { value } = req.query;
    if (filterType === 'category') {
      await Book.find({ category: value }, (err, foundBooks) => {
        if (err) {
          return res.status(500).json({
            message: 'An error occured',
          });
        }
        return res.status(200).json(foundBooks);
      }).clone();
    } else if (filterType === 'rating') {
      await Book.find({ rating: value }, (err, foundBooks) => {
        if (err) {
          return res.status(500).json({
            message: 'An error occured',
          });
        }
        return res.status(200).json(foundBooks);
      }).clone();
    } else if (filterType === 'publisher') {
      await Book.find({ publisher: value }, (err, foundBooks) => {
        if (err) {
          return res.status(500).json({
            message: 'An error occured',
          });
        }
        return res.status(200).json(foundBooks);
      }).clone();
    } else if (filterType === 'author') {
      await Book.find({ author: value }, (err, foundBooks) => {
        if (err) {
          return res.status(500).json({
            message: 'An error occured',
          });
        }
        return res.status(200).json(foundBooks);
      }).clone();
    }
    return res.status(200).json({
      message: 'Books cannot be filtered on given base',
    });
  },
};
