const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  console.log('Heyyyy');
  throw new Error('Error!!!');
});

app.use('/', (err,req, res, next) => {
  console.log('Error handling middleware');
  res.status(400).send('Bad Request');
});
/*
const { authAdmin } = require('./middlewares/auth');

app.use('/admin', authAdmin);

app.get('/admin/getAllData', (req, res) => res.send('All admin data sent'));

app.delete('/admin/deleteData', (req, res) => res.send('Admin data deleted'));
*/
/*
app.get('/user', (req, res, next) => {
  console.log('Inside first route handler');
  // next();
  res.send('Response sent from first route handler');
});

app.get('/user', (req, res, next) => {
  console.log('Inside second route handler');
  // res.send('Response sent from first route handler');
  next();
});
*/
app.listen(7777, () => {
  console.log('Server is listening on port 7777');
});
