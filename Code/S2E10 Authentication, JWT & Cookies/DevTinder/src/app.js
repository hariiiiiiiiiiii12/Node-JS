const express = require('express');
const app = express();

const { connectDB } = require('./config/database');
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validations');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');
app.use(express.json());
app.use(cookieParser());

// get users by emailId

app.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    //validating the data
    validateSignUpData(req);

    // Hashing the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log('Hashed password: ' + passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send('User added to database');
  } catch (err) {
    res.status(400).send('Error saving the user: ' + err.message);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error('Invalid Credentials');
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      console.log(
        'Signed token from server end after succesful user login: ' + token
      );
      res.cookie('token', token); // sending token to client
      res.send('Login Successful');
    } else {
      throw new Error('Invalid Credentials');
    }
  } catch (error) {
    res.status(400).send('Unable to login: ' + error.message);
  }
});

app.get('/profile', userAuth, async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error('Invalid Token');
    }
    const decodedMessage = jwt.verify(token, 'DEV@Tinder$790');
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error('User not found');
    }
    res.send(user);
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

app.post('/sendConnectionRequest', userAuth, async (req, res) => {
  const user = req.user;
  // Sending a connection request
  console.log('Sending a connection request');

  res.send(user.firstName + ' sent the connect request!');
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
