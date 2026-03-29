# Node.js — Reviewing Connection Requests, Populate and Fetching Connections

## Review Connection Requests API

In previous APIs we handled **sending connection requests**.

Now we work on **review APIs**, where users **accept or reject** connection requests.

Example endpoint:

```
POST /request/review/:status/:requestId
```

Possible values for `status`:

```
accepted
rejected
```

---

# Who Can Accept a Connection Request

Only the **receiver of the connection request** can accept or reject it.

Definitions:

```
fromUserId → sender
toUserId → receiver
```

Important rule:

```
toUserId must be the logged-in user.
```

Example:

```
User A → interested → User B
```

Only **User B** can accept or reject the request.

---

# Required Conditions for Reviewing Requests

Two important validations must be performed.

### Condition 1

The logged-in user must be the receiver.

```
toUserId === loggedInUserId
```

---

### Condition 2

The sender must have the status:

```
interested
```

Example valid flow:

```
User A → interested → User B
User B → accepted → User A
```

Invalid example:

```
User A → ignored → User B
User B tries to accept → invalid
```

---

# Finding the Connection Request

Example query:

```javascript
const connectionRequest = await ConnectionRequest.findOne({
  _id: requestId,
  toUserId: loggedInUserId,
  status: "interested"
});
```

Explanation:

```
Find request by ID
Ensure receiver is logged-in user
Ensure status is interested
```

---

# Updating the Request Status

Example:

```javascript
connectionRequest.status = status;

await connectionRequest.save();
```

After saving:

```
Connection request becomes accepted or rejected
```

---

# Difference Between POST and GET API Thinking

Designing **POST APIs** and **GET APIs** require different thinking.

### POST APIs

Focus on:

```
Validation
Data modification
Database writes
Security
```

---

### GET APIs

Focus on:

```
Fetching data
Filtering results
Shaping response
Performance
```

---

# User Router APIs

Now we move to **user router APIs**.

These APIs allow users to see:

```
Received requests
Accepted connections
```

---

# API to See Received Requests

Example endpoint:

```
GET /user/requests/received
```

Users should only see requests where:

```
status === interested
```

Example query:

```javascript
ConnectionRequest.find({
  toUserId: loggedInUserId,
  status: "interested"
});
```

---

# Problem with Default Response

Without extra configuration, the response contains only:

```
ObjectIds
```

Example:

```
fromUserId
toUserId
```

But users should see details like:

```
firstName
lastName
```

---

# Creating Relationship Between Collections

We create a reference between collections.

In `ConnectionRequest` schema:

```javascript
fromUserId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
```

Explanation:

```
fromUserId references User collection
```

---

# Populating User Data

Using `populate()` we can fetch data from the Users collection.

Example:

```javascript
ConnectionRequest.find({
  toUserId: loggedInUserId,
  status: "interested"
})
.populate("fromUserId", ["firstName", "lastName"]);
```

This fetches user details.

Example response:

```
fromUserId:
   firstName
   lastName
```

---

# Important Mapping Rule

```
fromUserId in ConnectionRequests
=
_id in Users collection
```

MongoDB uses this relationship to populate user details.

---

# Why We Select Specific Fields

If we do not specify fields:

```
populate("fromUserId")
```

MongoDB returns all user fields including:

```
emailId
password
```

This is unsafe.

Correct approach:

```
populate("fromUserId", ["firstName", "lastName"])
```

Only required fields are returned.

---

# API for Accepted Connections

Example endpoint:

```
GET /user/connections
```

This API returns all accepted connections of the logged-in user.

Two possible cases:

```
User sent request → other user accepted
User received request → user accepted
```

Example query:

```javascript
ConnectionRequest.find({
  $or: [
    { toUserId: loggedInUserId, status: "accepted" },
    { fromUserId: loggedInUserId, status: "accepted" }
  ]
});
```

---

# Populating Connection Users

Example:

```javascript
.populate("fromUserId", ["firstName", "lastName"])
.populate("toUserId", ["firstName", "lastName"])
```

This fetches user details for both sides of the connection.

---

# Cleaning the Response using map()

The response still contains fields from:

```
ConnectionRequest collection
```

Example unwanted fields:

```
status
timestamps
_ids
```

We only want user details.

Example transformation:

```javascript
const data = connections.map(row => {
  if (row.fromUserId._id.toString() === loggedInUserId.toString()) {
    return row.toUserId;
  }
  return row.fromUserId;
});
```

This returns only the connected user information.

---

# Final API Response

The response should contain only relevant user data:

```
firstName
lastName
profile info
```

Not internal database fields.

---

# Key Takeaways

- Review APIs allow users to accept or reject connection requests
- Only the receiver of the request can review it
- The request must have status "interested"
- POST APIs focus on validation and database writes
- GET APIs focus on fetching and formatting data
- populate() fetches related data from another collection
- fromUserId references _id in Users collection
- Only required fields should be populated
- Accepted connections include both sent and received requests
- map() helps filter unnecessary fields from responses