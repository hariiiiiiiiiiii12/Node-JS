# Node.js — Episode 04: module.exports & require

## Node.js Modules

In Node.js, **every file is treated as a module**.

Modules help to:

- Organize code
- Avoid global scope pollution
- Reuse functionality
- Maintain encapsulation

Each module has its **own private scope**, meaning variables and functions defined inside one module **cannot be accessed by another module unless explicitly exported**.

---

# Case 1 — Basic Module Execution

Suppose we have two files:

```
app.js
sum.js
```

### sum.js

```javascript
function calculateSum(a, b) {
  return a + b;
}

const x = 10;
```

### app.js

```javascript
require("./sum");
```

When you run:

```bash
node app.js
```

The code inside `sum.js` **will execute**, but:

- You **cannot access** `calculateSum`
- You **cannot access** variable `x`

---

# Why?

Modules **protect their variables and functions from leaking**.

```
Each module has its own scope.
Variables and functions are private by default.
```

So simply requiring a module **does not expose its internal variables**.

---

# Case 2 — Exporting a Function

To use something from another module, we must:

1. Export it
2. Require it

### sum.js

```javascript
function calculateSum(a, b) {
  return a + b;
}

module.exports = calculateSum;
```

### app.js

```javascript
const calculateSum = require("./sum");

console.log(calculateSum(5, 6));
```

### Output

```
11
```

---

# Case 3 — Exporting Multiple Values

Suppose we want to export:

- a function
- a variable

### sum.js

```javascript
function calculateSum(a, b) {
  return a + b;
}

const x = 10;

module.exports = {
  calculateSum,
  x
};
```

### app.js

```javascript
const { calculateSum, x } = require("./sum");

console.log(calculateSum(5, 5));
console.log(x);
```

### Output

```
10
10
```

---

# Alternative Way to Access Exports

Instead of destructuring:

```javascript
const sumModule = require("./sum");

console.log(sumModule.calculateSum(5, 5));
console.log(sumModule.x);
```

---

# Important Rule

```
You cannot access the variables and functions of one module
unless that module explicitly exports them.
```

Each module **controls what it exposes**.

---

# Module Scope Example

Two modules can have variables with the same name.

### moduleA.js

```javascript
const x = 10;
```

### moduleB.js

```javascript
const x = 20;
```

There is **no conflict**, because each module has its own scope.

---

# How module.exports Works Internally

Node initializes every module with:

```javascript
module.exports = {};
```

So `module.exports` **starts as an empty object**.

When we export:

```javascript
module.exports = calculateSum;
```

We replace that default object.

---

# Nested Modules

Modules can require other modules.

Example:

```
app.js → require(sum.js)
sum.js → require(multiply.js)
```

This is called **nested modules**.

---

# Two Ways to Export Modules

## 1️. CommonJS Modules (Default in Node.js)

Uses:

```
module.exports
require()
```

Example:

```javascript
module.exports = myFunction;
const myFunction = require("./file");
```

---

## 2️. ES Modules (Modern JavaScript)

Uses:

```
export
import
```

### sum.js

```javascript
export function sum(a, b) {
  return a + b;
}
```

### app.js

```javascript
import { sum } from "./sum.js";
```

To enable ES Modules in Node.js, add this to `package.json`:

```json
{
  "type": "module"
}
```

---

# Summary

Node.js modules provide:

- Encapsulation
- Code organization
- Reusability

Key points:

- Every file in Node.js is a module
- Modules protect their internal variables
- Use `module.exports` to export
- Use `require()` to import
- Default Node.js module system is **CommonJS**

---

# Key Takeaway

```
Modules protect their variables and functions from leaking.
Only exported values can be accessed by other modules.
```