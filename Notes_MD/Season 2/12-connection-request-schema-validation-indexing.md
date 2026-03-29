# Node.js — Connection Request Design, Schema Validation and Indexing

## Storing Connection Requests

Connection requests should not be stored inside the `User` collection.

Example bad approach:

```
User
 ├── name
 ├── email
 └── connectionRequests: []
```

Problems:

- Difficult to manage relationships
- Many edge cases
- Complex queries
- Poor scalability

Correct approach:

```
User Collection
ConnectionRequest Collection
```

Connection relationships must be stored in a separate collection.

---

# Connection Request Schema

Connection request represents a relationship between two users.

Example schema structure:

```javascript
const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String
  }
}, { timestamps: true });
```

`timestamps: true` automatically creates:

```
createdAt
updatedAt
```

---

# Connection Request Status

Only four status values are allowed:

```
interested
ignored
accepted
rejected
```

These represent the state of the relationship.

Example:

```
User A → interested → User B
User B → accepted → User A
```

---

# Sending Connection Request

API example:

```
POST /request/send/:status/:toUserId
```

Explanation:

```
fromUserId → logged-in user
toUserId → user being swiped
```

Example:

```
User A sends request to User B
```

```
fromUserId = User A
toUserId = User B
```

---

# Tinder Equivalent Actions

Tinder swipe actions:

```
Right swipe → like
Left swipe → pass
```

DevTinder equivalent:

```
Right swipe → interested
Left swipe → ignored
```

---

# Using Same API for Interested and Ignored

Instead of two APIs:

```
/like/:userId
/pass/:userId
```

We can use:

```
/request/send/:status/:userId
```

Where:

```
status = interested or ignored
```

---

# API Validation for Status

The API must ensure that only valid statuses are allowed.

Example validation:

```
status must be either
interested
ignored
```

Any other value must be rejected.

---

# Prevent Duplicate Requests

Problem scenario:

```
User A → request → User B
User A → request → User B again
```

This should not be allowed.

Validation must check if the request already exists.

---

# Prevent Reverse Requests

Another edge case:

```
User A → request → User B
User B → request → User A
```

This should also be prevented.

Validation logic should check both directions.

Example query:

```javascript
const existingRequest = await ConnectionRequest.findOne({
  $or: [
    { fromUserId: userA, toUserId: userB },
    { fromUserId: userB, toUserId: userA }
  ]
});
```

If a request already exists, the API should reject the request.

---

# Prevent Requests to Nonexistent Users

Another problem:

```
Sending request to a random userId that does not exist
```

Example:

```
POST /request/send/interested/randomId
```

The API must first verify that the target user exists.

Example:

```javascript
const user = await User.findById(toUserId);
```

If user does not exist:

```
throw error
```

---

# Prevent Self Connection Requests

Users should not be able to send requests to themselves.

Example invalid case:

```
fromUserId = User A
toUserId = User A
```

This must be prevented.

---

# Schema Validation using pre()

Mongoose provides **pre middleware**.

This works like middleware for schema operations.

Example:

```javascript
connectionRequestSchema.pre("save", function(next) {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("Cannot send request to yourself");
  }
  next();
});
```

Important rule:

```
Always call next() inside pre middleware.
```

Execution flow:

```
pre() runs
save() runs afterwards
```

---

# Database Indexing

Indexing improves query performance.

Example:

We frequently search using:

```
emailId
```

If a field is marked as `unique`, MongoDB automatically creates an index.

Example:

```javascript
emailId: {
  type: String,
  unique: true
}
```

---

# Compound Index

In connection requests, queries often use both fields:

```
fromUserId
toUserId
```

Instead of indexing them separately, we create a **compound index**.

Example:

```javascript
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
```

Explanation:

```
1 → ascending index
-1 → descending index
```

---

# Why Compound Index is Important

Example scenario:

```
1000 users
Each sends 100 requests
```

Total records:

```
100,000 connection requests
```

Without indexing:

```
Database scans entire collection
Slow queries
```

With compound index:

```
Database finds matching records quickly
Better performance
```

---

# Key Takeaways

- Connection requests must be stored in a separate collection
- Only four statuses are allowed: interested, ignored, accepted, rejected
- API must validate request status
- Duplicate connection requests must be prevented
- Reverse connection requests must also be prevented
- Users cannot send requests to themselves
- Schema `pre()` middleware can enforce validation
- Indexing improves database performance
- Unique fields automatically create indexes
- Compound indexes help optimize multi-field queries
```