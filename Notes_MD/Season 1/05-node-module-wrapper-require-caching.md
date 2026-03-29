# Node.js — Module Wrapper, IIFE and require() Internals

## How Node.js Executes JavaScript

When we write JavaScript code in Node.js, Node does not execute it directly.

The process is:

Node.js → V8 Engine → Execution

Node.js takes the JavaScript code we write and passes it to the **V8 JavaScript Engine**, which is responsible for executing the code.

---

# What Happens When You Use require()

When a module is required in Node.js, several steps happen internally.

Example:

```javascript
require("./xyz.js");
```

Node.js does not directly give this file to the V8 engine.

Instead, Node.js **wraps the entire module inside a function** and then executes it.

---

# Module Wrapper Function

Every module in Node.js is wrapped inside a function like this:

```javascript
(function (exports, require, module, __filename, __dirname) {

  // Your module code here

});
```

This is known as the **Module Wrapper Function**.

Node.js automatically wraps every module using this function before execution.

---

# Why Node.js Uses the Wrapper Function

This wrapper function provides several important benefits.

### 1. Private Scope

Variables and functions inside a module remain private.

Example:

```javascript
const x = 10;
```

This variable cannot be accessed outside the module unless it is exported.

This prevents variables from leaking into the global scope.

---

### 2. Encapsulation

Each module has its own scope.

Example:

```
moduleA.js
moduleB.js
```

Both modules can have:

```javascript
const x = 10;
```

There will be **no conflict** because each module is wrapped inside its own function.

---

# IIFE (Immediately Invoked Function Expression)

The wrapper function behaves like an **IIFE**.

An IIFE is a function that runs immediately after it is defined.

Example:

```javascript
(function () {
  console.log("IIFE executed");
})();
```

Node.js internally wraps modules in a similar way.

This ensures that all module code runs inside a private execution environment.

---

# Access to module and require

Inside the wrapper function, Node.js provides special parameters.

```
exports
require
module
__filename
__dirname
```

These are **not part of JavaScript itself**.

Node.js injects them into the module wrapper.

Example:

```javascript
module.exports
require("./file")
```

Both `module` and `require` come from the wrapper function provided by Node.js.

---

# How Modules Stay Private

Because all module code is wrapped inside the function:

```
(function(exports, require, module) {

   // module code

})
```

Variables declared inside this function cannot be accessed outside it unless explicitly exported.

Example:

```javascript
const a = 10;
```

Another file cannot access `a` unless we export it using:

```javascript
module.exports = a;
```

---

# What Happens Internally When require() is Called

When Node.js processes a `require()` statement, the following steps occur:

1. Resolving the module path  
2. Loading the module file  
3. Wrapping the code inside the module wrapper function  
4. Executing the wrapped code  
5. Returning the exported value

---

# Module Caching

Node.js caches modules after they are loaded.

Example:

```
app.js → require("./xyz.js")
sum.js → require("./xyz.js")
multiply.js → require("./xyz.js")
```

Three files are requiring the same module.

However, Node.js **executes the module only once**.

After the first execution, the module is stored in cache.

The next time another file requires the same module:

- Node.js does not execute the module again
- The cached result is returned

---

# Why Module Caching is Important

Caching improves performance.

Without caching:

- Every `require()` would execute the module again
- This would slow down applications

With caching:

- The module is executed once
- Future requests return the cached module

---

# Important Concept

```
A module is executed only once.
All subsequent require() calls return the cached version.
```

---

# Node.js and libuv

Node.js relies heavily on **libuv**.

libuv is a C library responsible for:

- Asynchronous I/O
- Event loop management
- Thread pool management
- File system operations
- Networking

libuv is a key component that makes Node.js powerful and efficient for handling asynchronous operations.

---

# Summary

Key points to remember:

- Node.js passes JavaScript code to the V8 engine for execution
- Every module is wrapped inside a function
- This wrapper function acts like an IIFE
- The wrapper provides `exports`, `require`, and `module`
- Modules have private scope
- Variables cannot be accessed unless exported
- Node.js caches modules after the first require
- libuv powers asynchronous behavior in Node.js