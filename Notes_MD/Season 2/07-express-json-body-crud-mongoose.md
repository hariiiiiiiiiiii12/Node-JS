# Node.js — Handling Request Body, JSON Middleware and CRUD APIs with Mongoose

## Sending Data to the Server

Hardcoding user data inside the backend is not practical.

Instead, data should come from the client.

Typical flow:

```
Client Form → HTTP Request → Server → Database
```

For testing APIs during development, tools like **Postman** can be used to send request data.

---

# JavaScript Object vs JSON

Example JavaScript object:

```javascript
{
  name: "Akshay",
  age: 25
}
```

Example JSON:

```json
{
  "name": "Akshay",
  "age": 25
}
```

Difference:

```
JavaScript Object → keys do not need quotes
JSON → keys must always be strings
```

---

# Incoming Request Body

When a request is sent with data, the data exists in the request body.

Example:

```
POST /user
Body:
{
  "firstName": "Akshay",
  "lastName": "Saini"
}
```

This data must be read on the server.

---

# Request as a Readable Stream

The incoming request is a **readable stream**.

This means the server must read the data from the request body before using it.

---

# Problem: req.body is Undefined

Example:

```javascript
app.post("/user", (req, res) => {
  console.log(req.body);
});
```

Output:

```
undefined
```

Reason:

```
Express does not automatically parse JSON request bodies.
```

---

# Solution: JSON Middleware

Express provides a middleware to parse JSON requests.

Middleware:

```javascript
app.use(express.json());
```

This middleware:

```
reads incoming JSON
converts it into a JavaScript object
makes it available in req.body
```

After adding this middleware, `req.body` will contain the parsed data.

---

# Middleware Scope

Example:

```javascript
app.use(express.json());
```

This middleware runs for **all routes**.

Therefore, every route can access `req.body`.

---

# Creating User Data API

Example API:

```javascript
app.post("/user", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User saved successfully");
});
```

Flow:

```
Client sends JSON data
express.json() parses it
req.body contains the object
data is saved in MongoDB
```

---

# Getting All Users

API to fetch all users.

Example:

```javascript
app.get("/feed", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});
```

Important:

```
find({})
```

This returns **all documents** from the collection.

---

# Deleting a User

To delete a user, the user ID must be provided.

Example API:

```javascript
app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;

  await User.findByIdAndDelete(userId);

  res.send("User deleted");
});
```

---

# Which ID Should Be Used

MongoDB automatically generates an ID for every document.

Example:

```
_id: ObjectId(...)
```

Since the schema does not define a custom `userId`, we use the **MongoDB generated `_id`**.

---

# Updating User Data (PATCH)

Example update API:

```javascript
app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;

  await User.findByIdAndUpdate(userId, req.body);

  res.send("User updated");
});
```

---

# Fields Not in Schema

If a field is sent in the update request but not defined in the schema:

```
The field will be ignored.
```

MongoDB does not update fields that are not part of the schema.

Example:

Schema:

```
name
email
age
```

Request body:

```
name
email
skills
```

`skills` will be ignored.

---

# Update Options in Mongoose

Example:

```javascript
User.findByIdAndUpdate(id, data, options)
```

Common options include:

```
new: true
runValidators: true
```

---

## new: true

Returns the updated document instead of the old document.

Example:

```
Before update → old data returned
After update → updated data returned
```

---

## runValidators: true

Ensures schema validations run during updates.

Without this option, validation rules may not be applied during update operations.

---

# Example with Options

```javascript
await User.findByIdAndUpdate(
  userId,
  req.body,
  {
    new: true,
    runValidators: true
  }
);
```

---

# Key Takeaways

- Data should come from client requests rather than hardcoded values
- JSON keys must be strings
- Express cannot read JSON request bodies without middleware
- `express.json()` parses incoming JSON data
- `req.body` contains parsed request data
- `find({})` returns all documents
- MongoDB automatically generates `_id`
- Updates use the MongoDB `_id`
- Fields not defined in the schema are ignored
- Mongoose update operations support options like `new` and `runValidators`