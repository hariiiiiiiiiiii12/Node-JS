const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: {
        values: ['interested', 'ignored', 'accepted', 'rejected'],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre('save', function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error('Cannot send connection request to yourself');
  }
  next();
});

const connectionRequestModel = new mongoose.model(
  'ConnectionRequest',
  connectionRequestSchema
);

module.exports = connectionRequestModel;
