const express = require('express');
const app = express();

const { connectDB } = require('./config/database');
const User = require('./models/user');

app.use(express.json());

// get users by emailId
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    if (users.length === 0) {
      res.status(404).send('No users found');
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
});

app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send('No user found');
    }
    res.send(users);
  } catch (err) {
    console.log('Something went wrong');
  }
});

app.post('/signup', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send('User added to database');
  } catch (err) {
    res.status(400).send('Error saving the user: ' + err.message);
  }
});

app.delete('/user', async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send('User deleted successfully');
  } catch (err) {
    res.status(404).send('Something went wrong');
  }
});

app.patch('/user', async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, data);
    res.send('User updated successfully');
  } catch (err) {
    res.status(404).send('Something went wrong');
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
