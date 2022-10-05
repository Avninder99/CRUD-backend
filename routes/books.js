const router = require('express').Router();
const booksController = require('../controllers/books');

router
  .route('/books')
  .get(booksController.booksCaller) // Index route
  .post(booksController.booksCreate); // function to create route

router
  .route('/books/filter/:filterType')
  .get(booksController.bookFilterCall);

router
  .route('/books/:title')
  .get(booksController.bookRetriever) // function to retrive a specific book
  .put(booksController.bookUpdater) // function to update a book in DB
  .delete(booksController.bookDeleter); // function to delete a book

module.exports = router;
