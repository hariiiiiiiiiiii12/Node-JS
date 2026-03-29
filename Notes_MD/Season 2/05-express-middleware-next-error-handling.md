# Node.js — Express Route Handlers, next() and Middleware

## What Happens if a Request Handler Does Not Send a Response

If no response is returned from a request handler, the request will keep running and never complete.

Example:

```javascript
app.get("/user", (req, res) => {
  // No response sent
});
```

In this case, the request hangs because Express is waiting for a response.

---

# Multiple Route Handlers for a Single Route

A single route can have multiple request handlers.

Example:

```javascript
app.get("/user",
  (req, res, next) => {
    console.log("First handler");
  },
  (req, res) => {
    console.log("Second handler");
  }
);
```

However, by default only the first handler executes unless `next()` is used.

---

# Why the Second Handler Does Not Execute

Example:

```javascript
app.get("/user",
  (req, res) => {
    res.send("Response from first handler");
  },
  (req, res) => {
    res.send("Response from second handler");
  }
);
```

Only the first handler runs.

Reason:

```
res.send() ends the request-response cycle.
```

Once a response is sent, Express does not move to the next handler.

---

# The next() Function

`next()` is used to pass control to the next request handler.

Example:

```javascript
app.get("/user",
  (req, res, next) => {
    console.log("First handler");
    next();
  },
  (req, res) => {
    res.send("Second handler response");
  }
);
```

Flow:

```
First handler executes
next() is called
Second handler executes
```

---

# Using res.send() and next() Together

Example:

```javascript
app.get("/user",
  (req, res, next) => {
    res.send("Response from first handler");
    next();
  },
  (req, res) => {
    res.send("Second handler response");
  }
);
```

This produces an error.

Error reason:

```
Cannot send multiple responses for one request.
```

Even though the response was already sent, execution continues and the second handler tries to send another response.

---

# What Happens When next() Is Not Called

If `next()` is not called, the request will not move to the next handler.

Example:

```javascript
app.get("/user",
  (req, res) => {
    console.log("First handler");
  },
  (req, res) => {
    res.send("Second handler");
  }
);
```

The second handler will never execute.

---

# Calling next() in the Last Handler

Example:

```javascript
app.get("/user",
  (req, res, next) => {
    console.log("Handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Handler 2");
    next();
  }
);
```

If no additional route handler exists after `next()`, Express throws an error.

Example error:

```
Cannot GET /user
```

---

# Route Handlers as Arrays

Request handlers can also be passed as an array.

Example:

```javascript
app.get("/user", [
  (req, res, next) => {
    console.log("Handler 1");
    next();
  },
  (req, res) => {
    res.send("Handler 2 response");
  }
]);
```

This works the same as defining them individually.

---

# Mixing Arrays and Individual Handlers

Example:

```javascript
app.get(
  "/user",
  [
    (req, res, next) => {
      console.log("Handler 1");
      next();
    },
    (req, res, next) => {
      console.log("Handler 2");
      next();
    }
  ],
  (req, res) => {
    res.send("Final handler");
  }
);
```

This also works correctly.

---

# Separate Handler Functions

Handlers can also be defined separately.

Example:

```javascript
function handler1(req, res, next) {
  console.log("Handler 1");
  next();
}

function handler2(req, res) {
  res.send("Handler 2 response");
}

app.get("/user", handler1, handler2);
```

---

# Why next() Is Important

`next()` is important because it allows Express to move execution to the next middleware or handler.

This forms the foundation of **middleware architecture**.

---

# What is Middleware

Middleware is a function that runs before the final request handler.

Middleware can:

- modify requests
- validate data
- perform authentication
- log requests
- handle errors

---

# Example Middleware

Example:

```javascript
function authMiddleware(req, res, next) {
  console.log("Checking authentication");
  next();
}
```

Usage:

```javascript
app.get("/user", authMiddleware, (req, res) => {
  res.send("User data");
});
```

---

# Middleware for Admin Routes

Instead of writing authorization logic in every route, middleware can be used.

Example:

```javascript
app.use("/admin", adminAuthMiddleware);
```

Now every route starting with `/admin` will automatically pass through the middleware.

Example routes:

```
/admin/getUsers
/admin/deleteUser
/admin/updateUser
```

All these routes will run the authorization middleware.

---

# Middleware for User Routes

Example middleware:

```javascript
function userAuth(req, res, next) {
  console.log("User authentication");
  next();
}
```

Usage:

```javascript
app.get("/user/profile", userAuth, (req, res) => {
  res.send("User profile");
});
```

---

# Routes That Do Not Require Authentication

Example:

```
/login
/signup
```

These routes do not need authentication middleware.

---

# Error Handling

Errors may occur during request processing.

Example:

- database errors
- server errors
- invalid requests

To handle errors properly, `try-catch` blocks should be used.

Example:

```javascript
app.get("/getUserData", async (req, res) => {
  try {
    // database logic
    res.send("User data");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});
```

---

# Global Error Handling Middleware

For errors that are not caught using `try-catch`, Express provides error-handling middleware.

Example:

```javascript
app.use((err, req, res, next) => {
  res.status(500).send("Server error");
});
```

---

# Key Takeaways

- A route can have multiple request handlers
- `res.send()` ends the request-response cycle
- `next()` moves execution to the next handler
- Sending multiple responses causes errors
- Middleware functions run before the final handler
- Middleware is useful for authentication and logging
- Global error handlers catch unhandled errors