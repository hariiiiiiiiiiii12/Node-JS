# Express Routing Behavior

Example route:

```javascript
app.get("/", (req, res) => {
  res.send("Namaste Akshay");
});
```

Request:

```
localhost:7777/
```

Response:

```
Namaste Akshay
```

---

# Wildcard Behavior of "/"

The `/` route behaves like a wildcard if placed early in the code.

Example requests:

```
/hello
/test
/anything
```

All may be handled by the `/` route handler.

---

# Nested Routes

Example route:

```javascript
app.get("/hello", (req, res) => {
  res.send("hello hello hello");
});
```

Requests handled:

```
/hello
/hello/xyz
```

The route handler for `/hello` also handles paths that begin with `/hello`.

---

# Importance of Route Order

Order of routes matters in Express.

Example:

```
/hello
/hello/2
```

If `/hello` appears first, a request to `/hello/2` will still be handled by `/hello`.

Express matches routes in the order they are written.

---

# Handling Unknown Routes

If a route such as `/xyz` is requested and not explicitly defined, the `/` route handler may handle it if present.

---

# Default HTTP Method in Browser

When typing a URL in a browser:

```
GET request is sent by default
```

---

# app.use()

Example:

```javascript
app.use((req, res) => {
  res.send("Hello");
});
```

Important property:

```
app.use() matches all HTTP methods
```

It handles:

```
GET
POST
PUT
DELETE
```

---

# app.use() at the Top of the File

If `app.use()` is placed at the top of the code, it will handle every request regardless of the HTTP method.

---

# Advanced Routing Patterns

Express allows route pattern matching.

---

# Optional Character

Example:

```
/ab?c
```

Valid routes:

```
/abc
/ac
```

The character `b` is optional.

---

# One or More Characters

Example:

```
/ab+c
```

Valid routes:

```
/abc
/abbc
/abbbbbc
```

Invalid:

```
/abbbbbcc
```

The pattern must match correctly.

---

# Wildcard Matching

Example:

```
/ab*cd
```

Valid routes:

```
/abcd
/abakshaycd
```

Anything can appear between `ab` and `cd`.

---

# Grouped Optional Pattern

Example:

```
/a(bc)?d
```

Valid:

```
/abcd
/ad
```

Invalid:

```
/acd
```

---

# Regex Based Routes

Express routes can also use regular expressions.

Example:

```
/a/
```

Matches any path containing `a`.

Examples:

```
/apple
/data
/cat
```

---

# Regex Ending Pattern

Example:

```
/.*fly$
```

Matches any route that ends with `fly`.

Examples:

```
butterfly
dragonfly
housefly
```

---

# Query Parameters

Query parameters are accessed using:

```javascript
req.query
```

Example request:

```
/user?id=707
```

Access:

```javascript
req.query.id
```

---

# Route Parameters

Dynamic route parameters are accessed using:

```javascript
req.params
```

Example route:

```javascript
app.get("/user/:id", (req, res) => {
  console.log(req.params.id);
});
```

Example request:

```
/user/707
```

`707` becomes available as `req.params.id`.

---

# Key Takeaways

- Express routes are matched in order
- `app.use()` handles all HTTP methods
- Express supports advanced route patterns
- `req.query` reads query parameters
- `req.params` reads dynamic route parameters
```