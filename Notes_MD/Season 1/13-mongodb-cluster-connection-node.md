# Node.js — MongoDB Cluster, Connection String and Node Integration

## MongoDB Provider

When using MongoDB Atlas, the database is hosted on cloud providers such as:

- AWS
- Azure
- Google Cloud

MongoDB Atlas manages the infrastructure behind the scenes.

This means:

- MongoDB provisions a server on a cloud provider
- The database is deployed on that server
- Access is provided through a connection string

---

# MongoDB Cluster

A cluster is the database environment created on MongoDB Atlas.

Once the cluster is created, it can contain multiple databases.

Example structure:

```
Cluster
  ├── Database 1
  ├── Database 2
  └── Database 3
```

Each database can contain multiple collections.

---

# MongoDB Connection String

To connect an application to MongoDB, a **connection string** is required.

Example format:

```
mongodb+srv://username:password@cluster-url/database
```

The connection string contains all the necessary information required to access the database.

Important point:

```
The connection string alone is sufficient to connect to the database.
```

---

# Accessing MongoDB Using MongoDB Compass

MongoDB Compass is a graphical interface used to interact with MongoDB databases.

It allows users to:

- View databases
- Create collections
- Insert documents
- Query data
- Analyze database structure

MongoDB Compass acts as a **user interface for MongoDB**.

---

# Connecting to MongoDB Using Compass

Steps:

1. Install MongoDB Compass
2. Open MongoDB Compass
3. Paste the MongoDB connection string
4. Click "Save and Connect"

Once connected, the cluster and its databases become visible.

---

# Databases and Collections

Inside a cluster:

- Multiple databases can exist
- Each database contains collections

Example:

```
Cluster
  └── HelloWorld Database
        └── User Collection
```

Collections store documents.

---

# MongoDB Documents

Documents in MongoDB are similar to JavaScript objects.

Example document:

```json
{
  "name": "John",
  "age": 25,
  "city": "London"
}
```

Documents are stored in **JSON-like format** (internally stored as BSON).

---

# Automatic Object IDs

If a document is inserted without specifying an ID, MongoDB automatically generates one.

Example:

```
_id: ObjectId("...")
```

This ID ensures that every document is uniquely identifiable.

---

# Connecting Node.js to MongoDB

To connect a Node.js application to MongoDB, a package must be installed.

Package:

```
mongodb
```

This package is available on npm.

---

# Installing the MongoDB Package

Install the package using npm:

```bash
npm install mongodb
```

After installation:

- The package is downloaded from npm
- It is stored inside the `node_modules` folder
- The folder is created automatically

---

# Requiring MongoDB in Node.js

After installation, the package can be imported using:

```javascript
const { MongoClient } = require("mongodb");
```

Now the Node.js application can connect to the MongoDB database.

---

# Querying Documents

To retrieve documents from a collection, the `find()` method is used.

Example:

```javascript
collection.find({})
```

Explanation:

```
{} represents an empty filter
```

This means:

```
Return all documents in the collection
```

---

# Inserting Documents

Documents can be inserted into a collection using insert operations.

Example methods:

```
insertOne()
insertMany()
```

These methods add documents to the collection.

---

# Counting Documents

To count the number of documents in a collection, the following method can be used:

```javascript
collection.countDocuments()
```

This returns the total number of documents stored in the collection.

---

# MongoDB Documentation

MongoDB provides official documentation with detailed explanations for:

- database operations
- queries
- indexing
- performance optimization

Developers should refer to the MongoDB documentation for advanced usage.

---

# Key Takeaways

- MongoDB Atlas hosts databases on cloud providers such as AWS and Azure
- A MongoDB cluster can contain multiple databases
- Databases contain collections
- Collections store documents
- Documents are JSON-like structures
- MongoDB generates an ObjectId if no ID is provided
- Node.js connects to MongoDB using the mongodb npm package
- MongoDB Compass provides a graphical interface to manage databases
- `find({})` retrieves all documents from a collection
- `countDocuments()` returns the number of documents in a collection