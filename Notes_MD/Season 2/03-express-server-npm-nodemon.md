# Node.js — npm, Express Server and Nodemon

## npm init

`npm init` is used to initialize a Node.js project.

It creates a configuration file called:

```
package.json
```

This file contains metadata about the project.

Examples of information stored in `package.json`:

- project name
- version
- description
- entry point
- scripts
- dependencies

It acts as the central configuration file for a Node.js application.

---

# Installing Express

Express is a web framework used to build servers and APIs in Node.js.

Install Express using:

```bash
npm install express
```

After installing Express, the following items are created or updated:

```
node_modules
package-lock.json
package.json
```

---

# node_modules Folder

The `node_modules` folder contains:

- Express itself
- All dependencies required by Express
- Dependencies of those dependencies

This folder is automatically created when packages are installed.

---

# package.json

`package.json` stores the project metadata and dependency list.

Example dependency entry:

```json
"dependencies": {
  "express": "^4.21.2"
}
```

The dependency is automatically added after installing Express.

---

# package-lock.json

`package-lock.json` stores the exact versions of installed dependencies.

Example:

```
package.json → may allow version ranges
package-lock.json → locks the exact version installed
```

This ensures that all environments install the same dependency versions.

---

# Version Numbering

Package versions follow the format:

```
major.minor.patch
```

Example:

```
4.19.2
```

Explanation:

```
4 → Major version
19 → Minor version
2 → Patch version
```

Minor version updates are usually backward compatible.

For example:

```
4.x.x versions are typically compatible with each other
```

---

# Special Version Symbols

## Caret (^)

Example:

```
^4.21.2
```

This means npm can automatically install compatible minor and patch updates.

Possible versions:

```
4.21.3
4.22.0
```

---

## Tilde (~)

Example:

```
~4.21.2
```

This allows patch updates but not minor updates.

Possible versions:

```
4.21.3
4.21.4
```

---

# Creating an Express Server

Example Express server:

```javascript
const express = require("express");

const app = express();

app.use((req, res) => {
  res.send("Hello from the server");
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
```

---

# Creating Express Application Instance

```javascript
const app = express();
```

This line creates an instance of the Express application.

The application instance is responsible for handling requests and responses.

---

# Request Handler

A request handler is the function responsible for processing incoming requests.

Example:

```javascript
app.use((req, res) => {
  res.send("Hello from the server");
});
```

The function receives two objects:

```
req → request object
res → response object
```

---

# Default Route Behavior

If the server is configured like this:

```javascript
app.use((req, res) => {
  res.send("Hello from the server");
});
```

Then all routes will respond with the same message.

Examples:

```
localhost:7777/
localhost:7777/hello
localhost:7777/test
```

All return:

```
Hello from the server
```

---

# Handling Specific Routes

Example:

```javascript
app.use("/test", (req, res) => {
  res.send("Hello from test route");
});
```

Now the server only responds to routes starting with:

```
/test
```

Example:

```
localhost:7777/test
```

---

# Restarting Server Problem

When using Node.js directly, the server must be restarted after every code change.

Example:

```
node app.js
```

If code changes, the server must be restarted manually.

---

# Nodemon

Nodemon solves this issue.

It automatically restarts the server when file changes are detected.

Install nodemon:

```bash
npm install -g nodemon
```

Run the server using:

```bash
nodemon app.js
```

Now the server automatically restarts whenever code changes.

---

# Adding Nodemon Script

Instead of typing the command every time, it can be added to the `scripts` section of `package.json`.

Example:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

Now run the server using:

```bash
npm run dev
```

---

# Key Takeaways

- `npm init` creates the `package.json` configuration file
- Installing Express creates the `node_modules` folder
- `package.json` stores dependency information
- `package-lock.json` stores exact dependency versions
- Express simplifies creating web servers
- Request handlers process incoming requests
- Nodemon automatically restarts the server during development