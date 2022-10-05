const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

mongoose.connection
  .on('connecting', () => {
    console.log('Connecting to database...');
  })
  .on('connected', () => {
    console.log('Database connected successfully');
  })
  .on('error', (error) => {
    console.log(error);
  })
  .on('disconnected', () => {
    console.log('Database disconnected');
  });

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/crudapp');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bookRoutes = require('./routes/books');

app.get('/', (req, res) => {
  res.redirect('/books');
});

app.use('/', bookRoutes);

app.get('*', (req, res) => {
  res.redirect('/books');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server has Started');
});
