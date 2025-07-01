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
**req is an instance of http.IncomingMessage**
```node.jsconsole.log(req)```
- This logs the entire req object, which includes:
- req.method — HTTP method (e.g., GET, POST)
- req.url — The URL being requested
- req.headers — The headers sent by the client

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



