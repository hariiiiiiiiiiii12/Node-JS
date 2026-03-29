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

app.patch('/user/:userId', async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ['photoUrl', 'about', 'gender', 'age', 'skills'];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error('Update not allowed');
    }
    if (data?.skills.length > 10) {
      throw new Error('Skills cannot be more than 10');
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: 'after',
      runValidators: true,
    });
    console.log(user);
    res.send('User updated successfully');
  } catch (err) {
    res.status(400).send('UPDATE FAILED:' + err.message);
  }
});

connectDB()
  .then(() => {
    console.log('Database connection established successfully');
    app.listen(7777, () => {
      console.log('Server started listening on port 7777');
    });
  })
  .catch((err) => {
    console.log('Failed to connect to database: ' + err.message);
  });
