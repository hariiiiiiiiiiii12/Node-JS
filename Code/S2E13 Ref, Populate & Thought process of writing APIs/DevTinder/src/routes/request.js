const express = require('express');
const requestRouter = express.Router();

const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
// const connectionRequest = require('../models')

requestRouter.post(
  '/request/send/:status/:userId',
  userAuth,
  async (req, res) => {
    try {
      console.log('Entered the api');
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const allowedStatus = ['interested', 'ignored'];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: 'Invalid status type',
        });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      console.log(existingConnectionRequest);

      if (existingConnectionRequest) {
        return res.status(400).send('Connection request already exists');
      }

      const toUser = await User.findById({ _id: toUserId });
      console.log(toUser);
      if (!toUser) {
        return res.status(400).send('User does not exist');
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      return res.json({
        data,
      });
    } catch (error) {
      res.status(400).send('Error' + error.message);
    }
  }
);

requestRouter.post(
  '/request/review/:status/:requestId',
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      // Dhoni ---> Hari
      // const allowedStatus = ["accepted", "rejected"]
      const allowedSenderRequestStatus = ['interested'];
      if (!allowedSenderRequestStatus.includes('interested')) {
        return res.status(400).send('Invalid status');
      }

      console.log(`Logged in user id is ${loggedInUser._id}`);
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        status: 'interested',
        toUserId: loggedInUser._id,
      });
      console.log(`Connection Request record from db: ${connectionRequest}`);
      if (!connectionRequest) {
        return res.status(404).send('No connection request found');
      }
      res.send('testing');

      connectionRequest.status = status;
      allowedRequestResponderStatus = ['accepted', 'rejected'];
      console.log(`Sender connection request status is ${status}`);
      if (!allowedRequestResponderStatus.includes('accepted', 'rejected')) {
        return res.status(400).send('Invalid response from sender');
      }

      const data = await connectionRequest.save();
      res.status(200).json({ message: 'Connection Request' + status, data });
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = requestRouter;
