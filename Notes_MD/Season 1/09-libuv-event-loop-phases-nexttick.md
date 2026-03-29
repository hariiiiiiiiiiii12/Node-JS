# Node.js — libuv, Event Loop, Callback Queue and process.nextTick()

## Role of libuv in Node.js

libuv is a core library used by Node.js to enable asynchronous operations.

libuv makes the following possible in Node.js:

- Asynchronous I/O
- Non-blocking I/O
- Event-driven architecture

Without libuv, Node.js would not be able to handle asynchronous operations efficiently.

---

# Components of libuv

libuv consists of three major components:

1. Event Loop
2. Callback Queue
3. Thread Pool

These components work together to manage asynchronous operations in Node.js.

---

# How Asynchronous Operations Work

When asynchronous operations occur in Node.js, such as:

- API calls
- `setTimeout()`
- `fs.readFile()`

the callbacks associated with these operations are handled by libuv.

libuv receives these callbacks and places them into the appropriate **callback queue**.

---

# When Are Callbacks Executed

Callbacks cannot execute immediately.

libuv can push callbacks to the **call stack inside the V8 engine** only when the call stack is empty.

Important rule:

```
Callbacks are executed only when the call stack is empty.
```

This ensures that synchronous code always completes before asynchronous callbacks are processed.

---

# Role of the Event Loop

The **event loop** continuously checks two things:

- The call stack
- The callback queues

If the event loop finds that the call stack is empty, it pushes callbacks from the queues into the call stack.

This allows the V8 engine to execute them.

---

# What Happens If Many Callbacks Arrive at the Same Time

Multiple asynchronous operations can complete at the same time.

Their callbacks will be placed in different callback queues.

The event loop manages them using **priority and phases**.

---

# Event Loop Phases

The event loop works in several phases.

Important phases include:

1. Timers
2. Poll
3. Check
4. Close

During each phase, the event loop processes callbacks associated with that phase.

---

# Event Loop Cycle

Before each phase of the event loop executes, an internal cycle runs.

The order works like this:

```
Internal cycle
Timer phase
Internal cycle
Poll phase
Internal cycle
Check phase
Internal cycle
Close phase
```

This internal cycle handles certain high-priority callbacks.

---

# Different Callback Queues

Different types of asynchronous operations have separate callback queues.

Examples include:

- Timer callbacks
- API callbacks
- Promise callbacks
- I/O callbacks

Each type of callback is processed during the appropriate event loop phase.

---

# Execution Order of Node.js Programs

Important rule:

```
All synchronous JavaScript code is executed first by the V8 engine.
```

Only after the **Global Execution Context is removed from the call stack** can asynchronous callbacks begin executing.

Once the call stack is empty, the event loop starts pushing callbacks into the stack.

---

# What Happens When the Event Loop Is Idle

If the event loop finds no callbacks in the callback queues, it waits.

The event loop waits in the **poll phase** until new events arrive.

---

# process.nextTick()

`process.nextTick()` allows scheduling a callback that executes immediately after the current operation.

Example:

```javascript
process.nextTick(() => {
  console.log("nextTick callback");
});
```

---

# Priority of process.nextTick()

`process.nextTick()` has the highest priority among callbacks.

Its callbacks run before:

- Timer callbacks
- I/O callbacks
- Promise callbacks

---

# Nested process.nextTick()

If `process.nextTick()` calls another `process.nextTick()`, the inner callback executes before the event loop continues.

Example:

```javascript
process.nextTick(() => {
  console.log("first");

  process.nextTick(() => {
    console.log("second");
  });
});
```

Output:

```
first
second
```

The inner `nextTick` executes before the event loop proceeds to other phases.

---

# Key Takeaways

- libuv enables asynchronous and non-blocking behavior in Node.js
- libuv manages the event loop, callback queues, and thread pool
- Callbacks execute only when the call stack is empty
- The event loop processes callbacks in phases
- Each type of asynchronous operation has its own callback queue
- `process.nextTick()` callbacks have the highest execution priority
- Nested `process.nextTick()` calls execute before other event loop phases