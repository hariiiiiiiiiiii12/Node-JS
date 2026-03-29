const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://harikrishnan080300:qec3J1wJm9NzYxyV@namastenode.8j7fl.mongodb.net/devTinder'
  );
};

module.exports = {
  connectDB,
};


