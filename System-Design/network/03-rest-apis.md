# REST APIs

> **Interview mental model:** REST is an architectural style for client/server communication over HTTP, usually using JSON, with stateless requests and resource-oriented endpoints. fileciteturn2file0L11-L26

## 1. Basic REST Flow

```text
Client
  ↓ HTTP Request
REST API / Express Server
  ↓ business logic
Database / services
  ↓
HTTP Response
  ↓
Client
```

The course describes the request–response cycle as the client asking for data/action and the server returning data or a status message. fileciteturn2file0L37-L44

## 2. Why REST?

- **Stateless:** each request is treated independently.
- **Simple:** uses familiar HTTP methods.
- **Platform independent:** web/mobile/desktop clients can consume it.
- **JSON-friendly:** lightweight and easy to parse.
- **Easy integration:** works well with external systems. fileciteturn2file0L18-L26

## 3. HTTP Request

A request mainly contains:

```text
Request Line → method + URL + HTTP version
Headers      → metadata
Body         → optional payload
```

Example:

```http
POST /todos HTTP/1.1
Content-Type: application/json

{"task":"Study REST"}
```

fileciteturn2file0L48-L56

## 4. HTTP Response

A response mainly contains:

```text
Status Line → status code + message
Headers     → response metadata
Body        → returned data
```

Example:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"id":101,"task":"Study REST"}
```

fileciteturn2file0L60-L70

## 5. URL Anatomy

Example:

`https://www.example.com/forum/questions?tag=networking&order=newest#top`

```text
https://          Scheme / protocol
www               Subdomain
example           Domain
.com              TLD
www.example.com   Host
/forum/questions  Path
?tag=...           Query string
#top               Fragment
```

**Important:** the fragment (`#top`) is handled by the browser and is not sent to the server. fileciteturn2file0L107-L142

## 6. HTTP Methods + CRUD

| Method | Purpose | Example |
|---|---|---|
| GET | Read | `GET /todos/10` |
| POST | Create | `POST /todos` |
| PUT | Replace entire resource | `PUT /todos/10` |
| PATCH | Partial update | `PATCH /todos/10` |
| DELETE | Delete | `DELETE /todos/10` |

The course also covers `HEAD`, `OPTIONS`, `CONNECT`, and `TRACE`. fileciteturn2file0L155-L169

### PUT vs PATCH — easy interview answer

```text
PUT    → replace the resource
PATCH  → change selected fields
```

The course explicitly demonstrates PUT replacing the full todo and PATCH updating only supplied fields. fileciteturn2file0L211-L237

## 7. Resource-Oriented API Design

Prefer nouns/resources over action-heavy URLs:

```text
Good:
GET    /users/10
POST   /users
PATCH  /users/10
DELETE /users/10
```

For the course's TODO example:

```text
GET    /todos
GET    /todos/:id
POST   /todos
PUT    /todos/:id
PATCH  /todos/:id
DELETE /todos/:id
```

fileciteturn2file0L266-L272

## 8. Important Request Headers

Know these:

| Header | Why it matters |
|---|---|
| `Host` | Target host/domain |
| `Origin` | Request origin; relevant to CORS |
| `User-Agent` | Client/browser information |
| `Accept` | Expected response format |
| `Accept-Language` | Preferred language |
| `Accept-Encoding` | Supported compression |
| `Authorization` | Auth credentials/token |
| `Cookie` | Browser-stored state |
| `Cache-Control` | Cache behavior |

fileciteturn2file0L278-L332

## 9. Important Response Headers

| Header | Why it matters |
|---|---|
| `Content-Type` | Response format |
| `Content-Length` | Body size |
| `Set-Cookie` | Instructs client to store cookie |
| `Cache-Control` | Caching rules |
| `ETag` | Resource version/validator for caching |
| `Last-Modified` | Last modification time |
| `Location` | Redirect target |
| `Access-Control-Allow-Origin` | CORS policy |
| `Content-Encoding` | Compression used |

fileciteturn2file0L340-L397

## 10. Status Codes You Must Know

```text
2xx = Success
200 OK
201 Created
202 Accepted
204 No Content

3xx = Redirection
301 Moved Permanently
302 Found
304 Not Modified
307 Temporary Redirect
308 Permanent Redirect

4xx = Client error
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
409 Conflict
429 Too Many Requests

5xx = Server error
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
```

fileciteturn2file0L400-L447

### 401 vs 403

- **401:** authentication is required/missing.
- **403:** request is understood, but access is refused. fileciteturn2file0L426-L430 fileciteturn2file0L432-L434

## 11. Express REST Example

```js
const express = require("express");
const app = express();

app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todo = { id: Date.now(), task: req.body.task };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch("/todos/:id", (req, res) => {
  // update selected fields
});

app.delete("/todos/:id", (req, res) => {
  // remove resource
});

app.listen(3000);
```

The course uses Express with `express.json()` and demonstrates GET/POST/PUT/PATCH/DELETE routes. fileciteturn2file0L170-L205

## 12. System Design Interview Checklist

When designing a REST API, talk about:

```text
Resources
  ↓
HTTP methods
  ↓
Request / Response contract
  ↓
Authentication / Authorization
  ↓
Validation + Error handling
  ↓
Pagination
  ↓
Rate limiting
  ↓
Caching
  ↓
Versioning
```

## 13. REST vs GraphQL — Quick Decision

```text
Simple, predictable resources → REST
Dynamic/nested UI data         → GraphQL
```

The GraphQL course notes REST as a good fit for simple resource-based APIs, while GraphQL is useful for flexible nested data fetching. fileciteturn7file0L16-L42

## 14. 30-Second Interview Answer

“REST is an architectural style built mainly around HTTP and resource-oriented APIs. Clients use methods such as GET, POST, PUT, PATCH and DELETE, and requests are stateless. A typical REST request contains a method, URL, headers and optional body; the response contains a status line, headers and body. REST is a strong default for simple, predictable, public or browser-facing APIs because it is simple and widely supported.”
