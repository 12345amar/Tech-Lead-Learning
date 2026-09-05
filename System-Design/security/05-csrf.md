# CSRF — Cross-Site Request Forgery

CSRF tricks a user who is already authenticated into performing an **unwanted state-changing action**.

## Easy Example

Imagine the user is logged into a bank.

```text
User logged into bank.com
        ↓
User clicks malicious link
        ↓
Browser sends bank request with existing credentials/cookies
        ↓
Unwanted transfer
```

The important point: the attacker wants the **victim's browser** to send the request.

## Why It Happens

HTTP is stateless, while browser authentication state such as cookies can be automatically attached to requests.

A dangerous design is using GET for state-changing operations:

```text
GET /fund-transfer?account=123&amount=10000
```

GET should not be used to perform destructive/state-changing actions.

## Defences

### 1. CSRF Token

Server creates an unpredictable token and expects it back with the state-changing request.

```text
Form/API request
   + CSRF token
        ↓
Server validates token
        ↓
Process request
```

### 2. SameSite Cookies

```text
Strict → strongest cross-site restriction
Lax    → sends in limited cross-site cases
None   → allows cross-site sending; Secure is required
```

### 3. Origin / Referer Validation

For sensitive operations, validate that the request originated from an expected site.

## CSRF vs XSS

| | CSRF | XSS |
|---|---|---|
| Main idea | Trick browser into action | Execute attacker JS |
| Victim | Authenticated user | User/page |
| Typical target | State-changing request | Page/session/data |
| Common defence | CSRF token, SameSite | Output encoding, CSP, sanitization |

## Interview Answer

> "CSRF exploits ambient browser credentials. I protect state-changing operations with CSRF tokens where applicable, SameSite cookies, origin validation and proper authentication design, and I never use GET for state-changing operations."
