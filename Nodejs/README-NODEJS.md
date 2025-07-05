## NodeJS ##
## Create Server in NodeJS ##
*For create nodejs server we need to use few core modules*
- http or https
- fs
- path
- OS

```node.js
const http = require('http')
function reListener(req, res) {
  console.log(req)
  process.exit()
}
const server = http.createServer(reListener);
server.listen(3000)
```


**const http = require('http')**
- This line imports Node.js's built-in http module.
- It allows you to create an HTTP server without any external dependencies.

**http.createServer(function (req, res) { ... })**
- This creates an HTTP server.
- It accepts a callback function with two arguments:
- req (IncomingMessage) — Represents the HTTP request → the incoming request from the client (browser, Postman, curl, etc.)
- res (ServerResponse) — Represents the HTTP response → the server’s response object you use to send data back.
**req is an instance of http.IncomingMessage class**
```node.jsconsole.log(req)```
- This logs the entire req object, which includes:
- req.method — HTTP method (e.g., GET, POST)
- req.url — The URL being requested
- req.headers — The headers sent by the client

**example:**
  ```node.js
  console.log(req.method);     // e.g., "GET", "POST"
  console.log(req.url);        // e.g., "/api/users?name=amar"
  console.log(req.headers);    // object with request headers
  console.log(req.httpVersion); // e.g., "1.1"
```


| Property          | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `req.method`      | HTTP method used (e.g., `'GET'`, `'POST'`, `'PUT'`, `'DELETE'`)           |
| `req.url`         | The full URL path of the request (e.g., `"/api/users?name=amar"`)         |
| `req.headers`     | An object containing request headers                                      |
| `req.httpVersion` | The HTTP version used (e.g., `'1.1'`, `'2.0'`)                            |
| `req.socket`      | The underlying socket object — gives IP info, etc.                        |
| `req.connection`  | Alias for `req.socket` (deprecated in newer versions)                     |
| `req.rawHeaders`  | Array of the raw header names and values                                  |
| `req.rawTrailers` | Similar to `rawHeaders`, but for trailers                                 |
| `req.trailers`    | Object containing trailers (headers sent after body in chunked responses) |
| `req.url`         | The request path with query string (you can parse it with `url.parse()`)  |
| `req.body`        | Not available by default — must be parsed manually or with middleware     |
| `req.aborted`     | Boolean — true if the request was aborted by the client                   |
| `req.complete`    | Boolean — true if the entire request has been received                    |

----
**res object is an instance of the http.ServerResponse class**
- Set status codes
- Set headers
- Send data (string, buffer, stream)
- End the response

**example:**
```node.js
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello, ');
  res.write('World!');
  res.end(); // required to complete response
```
| Method / Property                    | Description                                                           |
| ------------------------------------ | --------------------------------------------------------------------- |
| `res.writeHead(statusCode, headers)` | Sets the HTTP status code and response headers                        |
| `res.statusCode`                     | Manually set or access the status code (default is 200)               |
| `res.setHeader(name, value)`         | Set a single response header                                          |
| `res.getHeader(name)`                | Get a specific response header value                                  |
| `res.removeHeader(name)`             | Remove a header from the response                                     |
| `res.write(data)`                    | Write data to the response body (can be called multiple times)        |
| `res.end([data])`                    | Signals that the response is complete; can optionally send final data |
| `res.writeContinue()`                | Sends a 100 Continue response (rarely needed manually)                |
| `res.statusMessage`                  | Customize status text (default is "OK" for 200)                       |
| `res.headersSent`                    | Boolean indicating if headers have already been sent                  |

----

## Program Lifecyly and Event Loop in NodeJS ##
**Initialization:**
- Node sets up the environment, including the V8 engine, libuv (which manages I/O and the thread pool), and internal modules.
**Global Code Execution:**
- Node runs the top-level code synchronously, line by line.
- It registers async operations like setTimeout, fs.readFile, http.get, etc., with the libuv API.
**Task Registration:**
- Async tasks are handed off to the system kernel or libuv thread pool and executed in the background.
**Event Loop Start:**
- Once the sync code finishes, Node enters the event loop and continuously checks for any completed async tasks and their associated callbacks.

**Example:**
```Nodejs
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
setImmediate(() => console.log("Immediate"));
Promise.resolve().then(() => console.log("Promise"));
process.nextTick(() => console.log("NextTick"));
console.log("End");
```
**Output:**
- Start
- End
- NextTick
- Promise
- Immediate / Timeout (order may vary slightly)

**Explain:**
- process.nextTick() runs before any microtask or timer.
- Promise.then() is a microtask.
- setTimeout and setImmediate are in separate event loop phases.
- *setTimeout: setTimeout is used to schedule a function to run after a minimum delay.*
- *setImmediate: setImmediate is used to execute a function immediately after the current event loop phase, before any I/O events and after the current script completes.*

----

# 📦 Asynchronous Code in Node.js
Node.js is single-threaded, but it's built for asynchronous, non-blocking operations. This allows Node to handle **I/O-heavy operations** like file access, database queries, and HTTP requests **without blocking the main thread**.

## 🔄 What is Asynchronous Code?
Asynchronous code enables the program to start a task and **move on without waiting** for it to finish. Once the task is complete, a callback is triggered to handle the result.

## 🧠 Why Asynchronous?
- Node.js runs on a **single thread**
- Async operations are handled in the background by **libuv**
- Helps build **high-performance** and **scalable** applications

## ⚙️ How Asynchronous Code Works in Node.js
1. Executes synchronous (top-level) code
2. Sends async operations (I/O, timers, HTTP, etc.) to the **event loop**
3. Once async tasks complete, **callbacks** are pushed to a queue
4. Event loop processes these callbacks

## 🔧 Asynchronous Patterns in Node.js
### ✅ 1. Callback-Based

```js
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

## Request and Response with Stream & Buffer ##
## Nodejs Core Modules ##
## The Node Module System ##

## Global Features vs Core Modules vs Third-Party Modules
- **Global features:** Keywords like const or function but also some global objects like process
- **Core Node.js Modules:** Examples would be the file-system module ("fs"), the path module ("path") or the Http module ("http")
- **Third-party Modules:** Installed via npm install - you can add any kind of feature to your app via this way

## Type of Errors
- **Syntax Errors**
*if developer write and incorrect syntax then it give syntax error*
**Example:**
```Nodejs
cons data = [];
```
*It's t in const keywords so it gives syntax error*

- **Runtime Errors**
*A Runtime Error in Node.js is an error that occurs during the execution of your code (as opposed to compile-time errors). These errors crash or interrupt your application if not handled properly.*
**Example**
```Nodejs
function greet(user) {
  console.log(`Hello, ${user.name}`);
}
greet(undefined); // ❌ Runtime Error: Cannot read property 'name' of undefined
```
- **Logical Errors**
Logical Errors: When the code executes without throwing an explicit error but produces incorrect or unintended results due to flawed logic.
----

# 📘 Types of Errors in Node.js
*Node.js handles different types of errors that developers may encounter during application runtime. Understanding these categories helps in better debugging, error handling, and writing resilient applications.*
## 1. 🖥️ System Errors
*These are triggered by failed system operations like file handling, network requests, etc.*
**Example:**
```js
const fs = require('fs');

fs.readFile('/invalid/path', (err, data) => {
  if (err) {
    console.error("System Error:", err.code); // ENOENT
  }
});
```
**Common system error codes:**
- **ENOENT** – No such file or directory
- **EACCES** – Permission denied
- **ECONNREFUSED** – Connection refused
- **ETIMEDOUT** – Operation timed out

## 2. User-defined Errors
*Errors thrown manually by developers when custom validation fails or conditions are unmet.*
```nodejs
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
```
## 3. 🔄 Operational Errors
*Expected runtime failures due to external factors like:*
- Invalid input
- Network failure
- Database connection loss
*These should be gracefully handled.*

## 4. Programmer Errors
*Bugs in code logic that should be fixed rather than caught.*
**Example:**
```Nodejs
const user = undefined;
console.log(user.name); // ❌ TypeError
```
## 5. 🔤 Syntax Errors
*Mistakes in JavaScript syntax that prevent code from executing.*
**Example:**
```nodejs
try {
  eval('function() {}'); // SyntaxError
} catch (err) {
  console.error(err.name); // "SyntaxError"
}
```

## 6. 🔣 Type Errors
*Occurs when a value is used inappropriately.*
**Example:**
```nodejs
const value = null;
value.trim(); // ❌ TypeError: Cannot read properties of null
```

## 7. 🧾 Reference Errors
*Occurs when trying to access an undefined variable.*
**Example:**
```nodejs
console.log(undeclaredVar); // ❌ ReferenceError
```

## 8. 📏 Range Errors
*Happens when a value is not in the expected range.*
**Example:**
```nodejs
new Array(-1); // ❌ RangeError: Invalid array length
```
----





## Useful resources:
- Official Node.js Docs: https://nodejs.org/en/docs/guides/
- Full Node.js Reference (for all core modules): https://nodejs.org/dist/latest/docs/api/
- More about the Node.js Event Loop: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
- Blocking and Non-Blocking Code: https://nodejs.org/en/docs/guides/dont-block-the-event-loop/



