# Node.js — Designing APIs and Structuring Routes using Express Router

## Planning APIs for the Application

Before implementing backend logic, we should identify all APIs required for the application.

Example reference: Tinder.

In Tinder:

```
Right swipe → Like
Left swipe → Pass
```

Whenever a user swipes, an API request is made.

Example APIs:

```
/like
/pass
```

---

# DevTinder Equivalent Actions

In the developer networking application:

```
Right swipe → interested
Left swipe → ignore
```

These actions will trigger API requests.

Example request:

```
POST /request/interested/:userId
POST /request/ignore/:userId
```

The `userId` represents the developer profile being swiped.

---

# Connection APIs

Example APIs related to connections:

```
POST /request/interested/:userId
POST /request/ignore/:userId
```

Accepting or rejecting connection requests:

```
POST /request/accept/:requestId
POST /request/reject/:requestId
```

---

# Feed API

Tinder initially loads around 30 profiles.

As the user swipes:

```
New profiles appear one by one
```

Similarly, our application will have an API:

```
GET /feed
```

This API returns a list of developer profiles.

---

# Problem with Keeping All APIs in app.js

If all APIs are written directly inside `app.js`, the file becomes:

```
Large
Hard to maintain
Difficult to read
```

Example issue:

```
Hundreds of route handlers in one file
```

This approach is not scalable.

---

# Solution — Express Router

Express provides a feature called **Router**.

Router allows us to:

```
Group related APIs
Organize routes into separate files
Keep the project modular
```

---

# Creating a Routes Folder

Project structure:

```
project
 ├── routes
 │    ├── auth.js
 │    ├── profile.js
 │    ├── request.js
 │    └── feed.js
 └── app.js
```

Each file handles a specific category of APIs.

---

# Auth Router

File:

```
routes/auth.js
```

Handles authentication APIs.

Example routes:

```
/signup
/login
/logout
```

Example router:

```javascript
const express = require("express");

const authRouter = express.Router();

authRouter.post("/signup", signupHandler);
authRouter.post("/login", loginHandler);
authRouter.post("/logout", logoutHandler);

module.exports = authRouter;
```

---

# Router vs app

Example:

```
app.get("/profile")
```

Equivalent router syntax:

```
router.get("/profile")
```

Routers work exactly like the Express app object but for modular route handling.

---

# Connecting Routers to app.js

Routers must be registered inside `app.js`.

Example:

```javascript
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", profileRouter);
```

---

# How Express Processes Routers

Example:

```
Request → /profile
```

Processing steps:

```
Express checks authRouter
If route not found
Express checks profileRouter
If route exists → execute handler
```

Example flow:

```
Request arrives
app.use("/", authRouter)
Check if route exists
If not
app.use("/", profileRouter)
Check again
If found → run handler
```

---

# Why "/" Works for All Routers

When we use:

```javascript
app.use("/", router)
```

The `/` matches all incoming requests.

Therefore:

```
Every request passes through each router
until a matching route handler is found.
```

---

# Example Flow

Example request:

```
GET /profile
```

Flow:

```
app.use("/", authRouter)
authRouter does not contain /profile

app.use("/", profileRouter)
profileRouter contains /profile

Execute /profile handler
Return response
```

---

# Logout API

Logout API example:

```
POST /logout
```

Purpose:

```
Clear authentication cookie
End user session
```

Example:

```javascript
res.clearCookie("token");
res.send("Logout successful");
```

---

# Profile Edit API

Example API:

```
PATCH /profile/edit
```

Purpose:

```
Allow users to update profile information
```

Example fields updated:

```
firstName
lastName
skills
about
age
```

---

# Benefits of Using Express Router

Using routers provides several advantages:

```
Better project structure
Improved maintainability
Separation of concerns
Scalable backend architecture
```

Instead of a single large file, the codebase becomes modular.

---

# Key Takeaways

- APIs should be planned before implementation
- Tinder-style applications use swipe APIs
- Express Router helps organize APIs into modules
- Routes should be grouped based on functionality
- Routers must be registered in app.js
- Express checks routers sequentially for matching routes
- Using routers improves backend scalability
```