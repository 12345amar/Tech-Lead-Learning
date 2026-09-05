# Security Headers

Security headers add browser-enforced protection around your web application.

## Important Headers

### 1. X-Powered-By

Express may expose technology information such as `Express`.

Remove unnecessary server-identification headers:

```js
res.removeHeader('X-Powered-By');
```

### 2. Referrer-Policy

Controls how much referrer information the browser sends.

```http
Referrer-Policy: no-referrer
```

### 3. X-Content-Type-Options

Prevents MIME sniffing when the server has declared a content type.

```http
X-Content-Type-Options: nosniff
```

### 4. HSTS

Tells browsers to use HTTPS for future requests.

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### 5. Content-Security-Policy

Restricts where scripts/resources can be loaded from and is an important XSS defence.

```http
Content-Security-Policy: default-src 'self'
```

### 6. X-Frame-Options

Helps prevent clickjacking by controlling whether the page can be framed.

```http
X-Frame-Options: DENY
```

## Express Example

```js
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});
```

## Interview Answer

> "I use security headers as defense in depth: CSP for resource/script control, HSTS for HTTPS enforcement, nosniff for MIME-type protection, Referrer-Policy for referrer privacy, and frame protections against clickjacking."
