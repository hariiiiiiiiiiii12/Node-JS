# Node.js — JWT Authentication, Cookies and Auth Middleware

## Signup Workflow

During signup:

1. The user enters credentials.
2. The password is hashed using bcrypt.
3. The hashed password is stored in the database.

Important point:

```
There is no comparison during signup.
Only hashing is performed.
```

Example flow:

```
User enters password
bcrypt.hash(password)
Store hashed password in database
```

---

# JWT Authentication Workflow

JWT (JSON Web Token) is used to authenticate users after login.

Basic workflow:

```
1 User logs in
2 Server verifies password
3 Server generates JWT token
4 Server sends token to client
5 Client stores token
6 Client sends token with future requests
7 Server verifies token for each request
```

---

# Why Authentication Is Needed

Some APIs should only work for logged-in users.

Examples:

```
Profile
Connection requests
User data
```

Without authentication, anyone could access protected APIs.

---

# Login Flow

When a user logs in:

```
User sends email and password
Server verifies credentials
Server generates JWT token
Server sends token to client
```

After login, the token is used for authentication in future requests.

---

# Where Is the JWT Token Stored

The JWT token is stored in a **cookie**.

The server sends the token inside a cookie to the browser.

Example:

```
Server → Response → Set-Cookie header → Browser
```

The browser stores this cookie automatically.

---

# Cookie Expiry

Cookies depend on expiry settings.

If the cookie expires:

```
User must login again.
```

Example cookie option:

```
expires
maxAge
```

---

# Generating JWT Token

JWT tokens are generated on the server.

Example:

```javascript
const token = jwt.sign({ _id: user._id }, "secretKey");
```

Explanation:

```
user._id → hidden inside token
secretKey → known only to server
```

The token now contains encoded information about the user.

---

# Hidden Data in JWT

JWT can store data inside the token.

Example hidden data:

```
userId
roles
permissions
```

Example payload:

```
{ _id: user._id }
```

This identifies which user is authenticated.

---

# Sending Token as Cookie

Example:

```javascript
res.cookie("token", token);
```

This sends the token back to the browser.

The browser stores it automatically.

---

# Accessing Cookies in Requests

When the user makes another request:

```
Browser sends cookie automatically
```

Example:

```
GET /profile
Cookie: token=xxxx
```

---

# Reading Cookies in Express

Cookies are accessed using:

```
req.cookies
```

Example:

```javascript
req.cookies.token
```

Problem:

```
req.cookies may be undefined
```

---

# cookie-parser Middleware

To read cookies, we need middleware.

Package:

```
cookie-parser
```

Install:

```bash
npm install cookie-parser
```

Use in server:

```javascript
const cookieParser = require("cookie-parser");

app.use(cookieParser());
```

Now cookies become accessible using:

```
req.cookies
```

---

# Verifying JWT Token

Token verification is done using:

```javascript
jwt.verify(token, secretKey);
```

Example:

```javascript
const decoded = jwt.verify(token, "secretKey");
```

Return value:

```
decoded user data
```

Example decoded value:

```
{ _id: "userId" }
```

---

# Fetching User Using Token

Once the user ID is decoded:

```javascript
const user = await User.findById(decoded._id);
```

Now the server knows which user made the request.

---

# Securing Profile API

Example flow:

```
Client sends request with cookie
Server extracts token from cookie
Server verifies token
Server gets userId from token
Server fetches user data
Server returns response
```

---

# Auth Middleware

Instead of repeating authentication logic in every API, a middleware is created.

Purpose of middleware:

```
Authenticate the user before accessing protected APIs
```

---

# Example Auth Middleware

```javascript
const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  const decoded = jwt.verify(token, "secretKey");

  const user = await User.findById(decoded._id);

  if (!user) {
    throw new Error("User not found");
  }

  req.user = user;

  next();
};
```

---

# Attaching User to Request

Inside middleware:

```
req.user = user
```

This allows the route handler to access the authenticated user.

Example:

```
req.user.firstName
req.user.emailId
```

---

# Using Middleware in APIs

Example:

```javascript
app.get("/profile", userAuth, async (req, res) => {
  res.send(req.user);
});
```

Flow:

```
userAuth middleware runs first
User authentication happens
Route handler executes
```

---

# Protecting Other APIs

Example protected API:

```
/sendConnectionRequest
```

Example usage:

```javascript
app.post("/sendConnectionRequest", userAuth, handler);
```

Now the API only works for authenticated users.

---

# Expiring Tokens

JWT tokens can be given expiry times.

Example:

```javascript
jwt.sign(payload, secretKey, { expiresIn: "1h" });
```

After expiry:

```
Token becomes invalid
User must login again
```

---

# Expiring Cookies

Cookies can also be expired.

Example:

```
maxAge
expires
```

When cookies expire:

```
Browser stops sending the cookie
```

---

# Mongoose Schema Methods

Mongoose allows adding custom methods to schemas.

Example:

```javascript
userSchema.methods.getJWT = function () {
  return jwt.sign({ _id: this._id }, "secretKey");
};
```

Important rule:

```
Do not use arrow functions in schema methods.
```

Reason:

```
Arrow functions break the "this" context.
```

---

# Meaning of `this` in Schema Methods

Inside schema methods:

```
this → current user document instance
```

Example:

```
this._id
this.emailId
this.firstName
```

---

# Using Schema Method in API

Example:

```javascript
const token = user.getJWT();
```

This generates a token for the logged-in user.

---

# Key Takeaways

- Signup hashes passwords using bcrypt
- JWT tokens authenticate users after login
- Tokens are stored in cookies
- cookie-parser middleware reads cookies
- jwt.verify validates tokens
- Auth middleware protects APIs
- req.user stores authenticated user
- JWT tokens can contain hidden data
- Schema methods allow reusable logic in Mongoose
- Do not use arrow functions in schema methods
```