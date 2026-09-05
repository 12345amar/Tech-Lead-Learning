# iFrame Protection

iframes are useful for embedding websites, ads, videos and third-party content, but untrusted framing can introduce security risks.

## Main Risks

### 1. Clickjacking

Attacker places a transparent iframe over a visible button. The user thinks they click your UI but actually clicks the framed page.

```text
Visible UI
   ↓ click
Transparent iframe on top
   ↓
Unwanted action
```

### 2. Cross-Window Access

Poorly controlled embedding can create risks around communication between parent and child windows.

### 3. Cookie / Session Risks

Embedded contexts can interact with cookies depending on browser rules and cookie attributes.

## Defences

### X-Frame-Options

Older/common header:

```http
X-Frame-Options: DENY
```

or, where framing is intentionally allowed, use an appropriate policy.

### CSP frame-ancestors

Modern flexible approach:

```http
Content-Security-Policy: frame-ancestors 'self'
```

This says the page may be framed only by the same origin.

## Cookie Hardening

```js
res.cookie('sessionID', value, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});
```

## Interview Answer

> "For pages that should not be embedded, I use CSP frame-ancestors and/or X-Frame-Options to reduce clickjacking risk. I also harden authentication cookies with HttpOnly, Secure and an appropriate SameSite policy."
