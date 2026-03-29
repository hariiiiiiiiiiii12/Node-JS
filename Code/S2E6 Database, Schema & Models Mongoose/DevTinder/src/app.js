const express = require('express');
const app = express();

const { connectDB } = require('./config/database');
const User = require('./models/user');

app.post('/signup', async (req, res) => {
  const user = new User({
    firstName: 'Hari',
    lastName: 'Krishnan',
    emailId: 'hari@krish.com',
    password: 'hari@123',
  });

  try {
    await user.save();
    res.send('User added to database');
  } catch (err) {
    res.status(400).send('Error saving the user: ' + err.message);
  }
});

connectDB()
  .then(() => {
    console.log('Database connection established successfully');
    app.listen(7777, () => {
      console.log('Server started listening on port 7777');
    });
  })
  .catch(() => {
    console.log('Failed to connect to database');
  });
