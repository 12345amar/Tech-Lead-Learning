# XSS — Cross-Site Scripting

XSS happens when attacker-controlled content is interpreted as **executable JavaScript** in another user's browser.

## Example

Unsafe:

```js
document.getElementById('username').innerHTML = name;
```

If `name` contains HTML/JavaScript, the browser may interpret it as markup/code.

Safer for plain text:

```js
element.textContent = name;
```

## What Can Happen?

- Session/cookie theft when cookies are accessible to JavaScript
- Unauthorized actions
- Keystroke capture
- Reading sensitive page content
- Phishing/UI manipulation

## Common Injection Sources

- URL/query parameters
- Form fields
- Search boxes
- User comments
- Stored database content
- Third-party content

## Defences

### 1. Output Encoding / Safe Rendering

Treat user data as **data, not HTML**.

### 2. Input Validation / Sanitization

Allow only the formats/content you actually need.

### 3. CSP

Use Content-Security-Policy to restrict where scripts and other resources can come from.

Example concept:

```http
Content-Security-Policy: default-src 'self'
```

### 4. Cookie Protection

For authentication cookies, use `HttpOnly` so JavaScript cannot read them.

## Stored vs Reflected XSS

- **Stored:** malicious payload is saved (for example, in a comment) and later served to users.
- **Reflected:** payload comes from the current request, such as a URL parameter, and is immediately reflected into the page.

## XSS vs CSRF

**XSS = attacker executes code in your page.**

**CSRF = attacker causes the browser to make an unwanted authenticated request.**

## Interview Answer

> "I prevent XSS by treating all user-controlled data as untrusted, using safe rendering/output encoding, sanitizing only where HTML is genuinely required, avoiding dangerous DOM APIs, and adding a strong CSP. Authentication cookies should also use HttpOnly and Secure attributes."
