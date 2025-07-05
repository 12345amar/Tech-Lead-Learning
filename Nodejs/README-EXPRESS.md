
# 🚀 Express.js Introduction

[Express.js](https://expressjs.com/) is a **fast**, **minimal**, and **unopinionated** web framework for **Node.js**, designed to simplify the development of **web applications** and **RESTful APIs**.

It provides a thin layer of fundamental web application features, without obscuring Node.js features.

---

## 📦 Why Use Express?

- ✅ Minimal boilerplate to get started
- ✅ Built-in HTTP routing methods (GET, POST, etc.)
- ✅ Middleware support for handling requests
- ✅ Integration with databases, auth, and templating engines
- ✅ Suitable for microservices, APIs, and full-stack apps

---

## ⚙️ Key Features

| Feature             | Description                                       |
|---------------------|---------------------------------------------------|
| 🧭 Routing          | URL-based request handlers (GET, POST, etc.)      |
| 🔁 Middleware       | Functions that handle requests before responses   |
| 📤 Response Methods | `res.send()`, `res.json()`, `res.redirect()`, etc.|
| 📥 Request Parsing  | Access data from query, body, headers, etc.       |
| 🔌 Extensibility     | Use third-party or custom middleware              |

---

## 🧪 Basic Example

```js
const express = require('express');
const app = express();

// Built-in middleware to parse JSON
app.use(express.json());

// Route handler
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

# Use Cases
- ✅ RESTful APIs
- ✅ Backend for mobile/web apps
- ✅ Microservices and serverless functions
- ✅ Full-stack apps (MERN/MEVN stack)
- ✅ SSR with template engines like Pug/EJS

----

# 🔁 Middleware in Express.js
**Middleware** functions in Express.js are functions that execute during the **request-response lifecycle**. Middleware can:
- Access `req` (request) and `res` (response) objects
- Modify them
- End the response
- Or pass control to the next middleware using `next()`
## ✅ Syntax

```js
function middleware(req, res, next) {
  // Perform operations
  next(); // Pass control to the next middleware
}
```

## 🎯 Why Middleware?
Middleware is used to:
- 🪵 Log requests
- 🔐 Authenticate users
- 🧼 Validate or sanitize input
- 📦 Parse request bodies (JSON, form, etc.)
- 🧱 Serve static files
- 🚨 Handle errors globally
- 🧪 Example: Basic Middleware Usage

```nodejs
const express = require('express');
const app = express();

// Custom Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Route
app.get('/', (req, res) => {
  res.send('Hello, Middleware!');
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## 🧱 Types of Middleware
*Type	Description	Example*
- Application-level	Runs on all or specific routes	app.use()
- Router-level	Applied to an instance of express.Router()	router.use()
- Built-in	Comes with Express	express.json(), express.static()
- Error-handling	Catches errors (has 4 args)	(err, req, res, next)
- Third-party	External libraries	morgan(), cors(), helmet()

## ⚠️ Error-Handling Middleware
```nodejs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
✅ Must have four arguments to be considered an error handler in Express.
```

## 📦 Real-World Middleware Examples
- 🔐 Authentication Middleware
```nodejs
function isAuthenticated(req, res, next) {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}
```

## 🛠 Third-party Middleware
```nodejs
const cors = require('cors');
const morgan = require('morgan');
app.use(cors());           // Enables CORS
app.use(morgan('dev'));    // Logs requests
```



