# Node.js — MongoDB Connection using Mongoose, Schema and Model

## Connecting to MongoDB Cluster

To store data in MongoDB, the application must connect to a MongoDB cluster.

The cluster can be accessed using tools such as:

```
MongoDB Compass
```

MongoDB Compass allows us to visually connect to the cluster and inspect databases.

---

# Creating a Database in the Cluster

Inside a cluster we can create multiple databases.

Example structure:

```
Cluster
 ├── Database 1
 ├── Database 2
 └── Database 3
```

Our Node.js application must connect to this cluster in order to create or access databases.

---

# Connection String

To connect the application to the cluster, a **connection string** is required.

Example format:

```
mongodb+srv://username:password@cluster-url/database-name
```

The connection string contains all necessary information required to connect to the database cluster.

---

# Using Mongoose to Connect to MongoDB

To connect Node.js with MongoDB we use the npm library:

```
mongoose
```

Install it using:

```bash
npm install mongoose
```

---

# Basic Database Connection

Example connection code:

```javascript
const mongoose = require("mongoose");

mongoose.connect("connection-string");
```

This connection string connects the application to the MongoDB cluster.

---

# Using Async / Await for Database Connection

`mongoose.connect()` returns a promise.

Therefore it is better to use `async/await`.

Example:

```javascript
const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect("connection-string");
}

module.exports = connectDB;
```

---

# Why Async Connection Is Important

If the server starts listening before the database connects, it can cause problems.

Example of incorrect flow:

```
Server starts listening
Database connection happens later
```

Correct flow:

```
Connect to database
Start server
```

---

# Correct Application Flow

Example:

```javascript
const connectDB = require("./config/database");

connectDB().then(() => {
  app.listen(7777, () => {
    console.log("Server started");
  });
});
```

This ensures the server starts only after the database connection is established.

---

# MongoDB Schema

Once connected to the database, we define a **schema**.

A schema defines the structure of documents in a collection.

Example:

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});
```

Schema defines:

```
what fields exist
what type of data is stored
```

---

# Creating a Mongoose Model

After defining a schema, we create a model.

Example:

```javascript
const User = mongoose.model("User", userSchema);
```

Important rule:

```
Mongoose models start with a capital letter.
```

Example:

```
User
Product
Order
```

The model represents a collection in MongoDB.

---

# Saving Data to the Database

To insert data into the database, create an instance of the model.

Example:

```javascript
const user = new User({
  firstName: "Akshay",
  lastName: "Saini",
  email: "akshay@example.com"
});
```

Save the document:

```javascript
await user.save();
```

---

# MongoDB Operations Return Promises

Most MongoDB operations return promises.

Examples:

```
save()
find()
update()
delete()
```

These operations should typically be handled using `async/await`.

---

# Automatic Fields in MongoDB

Two fields are automatically added to MongoDB documents:

```
_id
__v
```

---

## _id

MongoDB automatically generates a unique identifier for each document.

Example:

```
_id: ObjectId("...")
```

This ensures every document has a unique ID.

---

## __v

`__v` is a version key added by Mongoose.

It is used internally by Mongoose for version control.

---

# Example MongoDB Document

Example document stored in MongoDB:

```json
{
  "_id": "ObjectId",
  "firstName": "Akshay",
  "lastName": "Saini",
  "email": "akshay@example.com",
  "__v": 0
}
```

---

# Key Takeaways

- Applications must connect to a MongoDB cluster using a connection string
- Mongoose is used to connect Node.js with MongoDB
- `mongoose.connect()` returns a promise
- Database connection should be established before starting the server
- Schema defines the structure of database documents
- Models represent MongoDB collections
- Documents are inserted using model instances
- MongoDB automatically generates `_id`
- Mongoose automatically adds `__v`