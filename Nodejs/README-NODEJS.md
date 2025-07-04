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
*- setTimeout: setTimeout is used to schedule a function to run after a minimum delay.*
*- setImmediate: setImmediate is used to execute a function immediately after the current event loop phase, before any I/O events and after the current script completes.*

## Asyncronous Code ##
## Request and Response with Stream & Buffer ##
## Nodejs Core Modules ##
## The Node Module System ##



