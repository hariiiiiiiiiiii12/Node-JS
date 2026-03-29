# Node.js — Event Driven Architecture and Asynchronous I/O

## Event Driven Architecture in Node.js

Node.js follows an **event driven architecture** and uses **asynchronous I/O operations**.

JavaScript by itself is:

- Synchronous
- Single threaded

This means JavaScript executes code **one line at a time on a single thread**.

Because of this limitation, handling multiple operations such as:

- File reads
- Database queries
- Network requests
- Timers

would be difficult if JavaScript worked alone.

Node.js solves this problem.

---

# JavaScript Execution Model

JavaScript is a **synchronous single-threaded language**.

This means:

- Only one operation runs at a time
- Code executes line by line

Example:

```javascript
console.log("A");
console.log("B");
console.log("C");
```

Output:

```
A
B
C
```

Each statement waits for the previous one to finish.

---

# Limitation of the JavaScript Engine

The JavaScript engine (V8) cannot directly perform operations such as:

- Reading files
- Making database calls
- Performing network requests
- Running timers

The engine alone does not have the ability to communicate with the operating system.

Therefore, something is needed to connect the JavaScript engine with the operating system.

This is where **Node.js and libuv** come into the picture. :contentReference[oaicite:0]{index=0}

---

# Role of Node.js

Node.js acts as a runtime environment for JavaScript.

It provides APIs that allow JavaScript to interact with:

- File systems
- Databases
- Networks
- Timers
- Operating system resources

Node.js internally uses **libuv** to perform these operations.

---

# What is libuv

libuv is a library written in **C language**.

Its main responsibilities include:

- Handling asynchronous I/O
- Managing the event loop
- Managing the thread pool
- Communicating with the operating system

libuv acts as a **bridge between Node.js and the operating system**.

---

# Why libuv is Needed

JavaScript is synchronous.

Operations like reading files or making network requests take time.

If JavaScript handled them directly, the main thread would become blocked.

libuv solves this problem by performing these operations asynchronously.

This allows Node.js to remain **non-blocking**.

---

# Thread Pool in libuv

libuv contains a **thread pool** that performs heavy operations in the background.

Examples of such operations:

- File system operations
- Cryptography
- Compression
- DNS lookups

These operations are delegated to worker threads instead of blocking the main thread.

---

# Event Loop in libuv

The **event loop** is responsible for handling asynchronous callbacks.

The event loop continuously checks for completed operations and executes their callbacks.

This is what enables Node.js to handle multiple requests efficiently.

---

# Execution Flow of a Node.js Program

Consider a program that performs the following operations:

- API request
- File read
- Timer
- A normal synchronous function

The execution process works as follows.

---

## Step 1 — Code Execution Begins

All Node.js code runs inside the **call stack**.

A **Global Execution Context (GEC)** is created.

The JavaScript engine begins executing code synchronously.

---

## Step 2 — Encountering Asynchronous APIs

When the V8 engine encounters asynchronous operations such as:

- File system APIs
- Network APIs
- setTimeout()

these tasks are passed to **libuv**.

The callbacks associated with these operations are registered inside libuv.

Example callbacks:

```
Callback A
Callback B
Callback C
```

All of these callbacks are stored and managed by libuv.

---

## Step 3 — Execution of Synchronous Functions

If a function does not require asynchronous operations, the V8 engine executes it directly.

Example:

```javascript
function multiplyFn(a, b) {
  return a * b;
}
```

The function execution context is created in the call stack.

Once execution finishes, it is removed from the call stack.

---

## Step 4 — Completion of Asynchronous Tasks

When an asynchronous operation finishes, libuv places its callback into the event loop queue.

The event loop then pushes the callback to the call stack when it becomes available.

Example:

- File system finishes reading a file
- Callback is passed back to V8
- V8 executes the callback

---

# Example Scenario

Suppose the program performs these operations:

1. File read
2. API call
3. setTimeout
4. A synchronous function

Execution happens in this order:

- Synchronous code runs immediately
- Asynchronous operations are delegated to libuv
- Their callbacks are registered
- Once completed, callbacks return to the event loop
- Event loop sends callbacks back to the call stack
- V8 executes them

---

# Why Node.js is Non Blocking

Node.js is considered **non blocking** because the main thread is never blocked by slow operations.

Heavy tasks are delegated to libuv.

While those tasks execute in the background, the main thread continues running other code.

This allows Node.js to handle many concurrent requests efficiently.

---

# Important Concept

```
The V8 engine executes JavaScript synchronously,
while Node.js enables asynchronous behavior using libuv.
```

---

# Key Takeaways

- JavaScript is synchronous and single threaded
- Node.js enables asynchronous behavior
- libuv connects Node.js with the operating system
- libuv manages the thread pool and event loop
- Asynchronous tasks are handled outside the main thread
- Callbacks are executed once operations are completed
- Node.js is non blocking because the main thread remains free