# CORS — Cross-Origin Resource Sharing

CORS is a **browser security mechanism** that controls whether JavaScript running on one origin can read resources from another origin.

## Same Origin

Origin = **scheme + host + port**.

```text
https://app.example.com:443
```

Changing protocol, host/subdomain or port can make it cross-origin.

## Example

```text
Frontend: https://app.example.com
API:      https://api.example.com

Frontend JS → Browser → API
                    ↓
             CORS policy check
```

The browser normally enforces the same-origin policy. The API can explicitly allow trusted origins using response headers.

## Important Headers

```text
Access-Control-Allow-Origin
Access-Control-Allow-Methods
Access-Control-Allow-Headers
Access-Control-Allow-Credentials
Access-Control-Expose-Headers
```

## Preflight

For requests that require a CORS preflight, the browser first sends:

```http
OPTIONS /users
```

If the server allows the origin/method/headers, the browser sends the actual request.

## Express Example

```js
const cors = require('cors');

app.use(cors({
  origin: ['https://app.example.com']
}));
```

### Avoid

```js
origin: '*'
```

when the application needs credentials or a restricted trust boundary.

## CORS ≠ Authentication

CORS does **not** decide whether a user is logged in. It controls browser cross-origin access.

## CORS ≠ CSRF

- CORS → browser permission to read cross-origin responses
- CSRF → attacker causes an authenticated user to perform an unwanted action

## Interview Answer

> "CORS is a browser-enforced mechanism that lets a server declare which origins can access its resources. For sensitive APIs I use an explicit allowlist, configure methods/headers/credentials carefully, and handle preflight OPTIONS requests."
