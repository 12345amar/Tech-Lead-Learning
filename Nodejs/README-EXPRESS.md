
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

----

# 📦 Common Third-Party Middleware in Express.js
*Express.js allows the use of middleware to extend the functionality of the HTTP request/response cycle. These **third-party middleware** packages provide essential features like authentication, validation, security, and logging.*

## 🔐 1. helmet – Secure HTTP Headers
*Sets secure HTTP headers to protect against common vulnerabilities.*

```bash
npm install helmet

const helmet = require('helmet');
app.use(helmet());
```

**✅ Protects from:**
- XSS
- Clickjacking
- MIME sniffing

## 🌐 2. cors – Cross-Origin Resource Sharing
*Allows frontend apps from different origins to access the API.*
```nodejs
npm install cors

const cors = require('cors');
app.use(cors());
```
**➡️ Optional config:**
```nodejs
app.use(cors({ origin: 'https://yourfrontend.com', credentials: true }));
```

## 🪵 3. morgan – HTTP Request Logger
*Logs requests to the console (method, URL, status, time).*

npm install morgan

const morgan = require('morgan');
app.use(morgan('dev'));
**✅ Example output:**
GET /users 200 15.2 ms - 123

## 🧼 4. express-validator – Validate and Sanitize Inputs
*Validates and sanitizes data from req.body, req.params, req.query.*

```nodejs
npm install express-validator

const { body, validationResult } = require('express-validator');
app.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send('User registered');
});
```
## 🍪 5. cookie-parser – Parse Cookies
*Parses cookie headers and populates req.cookies.*
```nodejs
npm install cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

## 💾 6. express-session – Manage User Sessions
*Stores session data on the server and sets a session ID in a cookie.*
```nodejs
npm install express-session
const session = require('express-session');
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
```

## 🔐 7. passport – Authentication Middleware
*Provides pluggable authentication (local, JWT, Google, etc.).*
*Requires setup with strategies like passport-local or passport-jwt.*
```nodejs
npm install passport passport-local
```

## 📄 8. multer – File Uploads
*Handles multipart/form-data for file uploads.*
```nodejs
npm install multer

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded: ' + req.file.originalname);
});
```

## 🧃 9. compression – Gzip Response Compression
*Compresses response bodies to improve performance.*
```nodejs
npm install compression
const compression = require('compression');
app.use(compression());
```

## 🔒 10. express-rate-limit – Limit Requests
*Limits repeated requests to prevent abuse or DDoS attacks.*
```nodejs
npm install express-rate-limit

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5 // limit each IP to 5 requests per minute
});
app.use('/api', limiter);
```

## 💥 11. http-errors – HTTP Error Generator
*Creates consistent HTTP errors like 404, 500, etc.*
```nodejs
npm install http-errors

const createError = require('http-errors');
app.use((req, res, next) => {
  next(createError(404, 'Route Not Found'));
});
```
| Middleware           | Purpose                     |
| -------------------- | --------------------------- |
| `helmet`             | Set secure HTTP headers     |
| `cors`               | Allow cross-origin requests |
| `morgan`             | Log HTTP requests           |
| `express-validator`  | Validate & sanitize input   |
| `cookie-parser`      | Parse cookies               |
| `express-session`    | Manage server-side sessions |
| `passport`           | Handle user authentication  |
| `multer`             | Handle file uploads         |
| `compression`        | Compress responses          |
| `express-rate-limit` | Rate limiting per IP        |
| `http-errors`        | Generate HTTP error objects |

----
  

