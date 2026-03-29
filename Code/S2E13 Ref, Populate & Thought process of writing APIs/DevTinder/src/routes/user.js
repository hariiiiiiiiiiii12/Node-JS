const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router();

userRouter.get('/user/requests/received', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      status: 'interested',
      toUserId: loggedInUser._id,
    }).populate('fromUserId', ['firstName', 'lastName']);

    res.json({
      message: 'Data fetched successfully',
      data: connectionRequests,
    });
  } catch (err) {
    res.send('Error' + err.message);
  }
});

module.exports = userRouter;
