# Node.js — Synchronous vs Asynchronous Operations and setTimeout(0)

## Synchronous Operations in Node.js

A synchronous operation blocks the execution of the program until it finishes.

Example:

```javascript
const fs = require("fs");

const data = fs.readFileSync("./file.txt", "utf8");
console.log(data);
```

`fs.readFileSync()` blocks the main thread.

While this function is executing, the event loop cannot process other tasks.

This means the program must wait for the file read operation to complete before moving forward.

---

# Important Concept

Even though `fs.readFileSync()` is synchronous and blocks the main thread, the operation can still be handled internally using **libuv**.

This means:

```
A synchronous function can still be offloaded to libuv,
but the JavaScript thread waits for the result.
```

So the difference is not whether libuv is used, but whether the JavaScript thread waits.

---

# Asynchronous Operations in Node.js

Asynchronous operations do not block the main thread.

Instead of waiting, Node.js delegates the task to **libuv**.

Example:

```javascript
const fs = require("fs");

fs.readFile("./file.txt", "utf8", (err, data) => {
  console.log(data);
});

console.log("Execution continues");
```

Execution order:

1. `readFile` request is sent to libuv
2. JavaScript continues executing the next line
3. Once the file read is complete, the callback is executed

---

# The crypto Module

`crypto` is a core Node.js module.

It provides functionality for cryptographic operations such as:

- hashing
- encryption
- password derivation

Example:

```javascript
const crypto = require("crypto");

crypto.pbkdf2("password", "salt", 100000, 64, "sha512", () => {
  console.log("Password encrypted");
});
```

`crypto.pbkdf2` is an **asynchronous function**.

It is offloaded to **libuv's thread pool**.

---

# Synchronous vs Asynchronous Example

Consider the following operations:

1. File system synchronous read
2. Cryptographic hashing
3. setTimeout
4. Normal JavaScript function

Execution behavior:

- Synchronous functions run immediately in the call stack
- Asynchronous operations are delegated to libuv
- Callbacks are executed later through the event loop

---

# setTimeout() in Node.js

`setTimeout()` is also handled by libuv.

Example:

```javascript
setTimeout(() => {
  console.log("Timer executed");
}, 0);
```

Even with a delay of **0 milliseconds**, the callback does not run immediately.

---

# Why setTimeout(0) Does Not Run Immediately

When `setTimeout()` is called:

1. The timer is registered with libuv
2. The callback is placed in the timer queue
3. The event loop waits for the call stack to become empty
4. Only then is the callback pushed to the call stack

Important rule:

```
setTimeout(0) executes only after the call stack becomes empty.
```

This means the **Global Execution Context must finish first**.

---

# Example

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");
```

Output:

```
Start
End
Timer
```

Explanation:

1. `Start` runs
2. Timer is registered with libuv
3. `End` runs
4. Call stack becomes empty
5. Event loop pushes timer callback to the call stack

---

# Interaction Between V8 and libuv

Execution model:

1. V8 executes synchronous JavaScript code
2. Asynchronous APIs are passed to libuv
3. libuv performs the operation
4. Once complete, the callback is placed in the event loop queue
5. Event loop pushes callback to call stack when available

---

# Key Takeaways

- Node.js uses both synchronous and asynchronous operations
- `fs.readFileSync()` blocks the main thread
- Asynchronous functions delegate work to libuv
- `crypto.pbkdf2()` runs in libuv's thread pool
- `setTimeout()` is managed by libuv
- `setTimeout(0)` runs only after the call stack becomes empty
- The event loop ensures callbacks run when the main thread is free