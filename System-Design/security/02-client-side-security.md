# Client-Side Security

Client-side code runs in an environment controlled by the user, so **never treat the browser as trusted storage**.

## Sensitive Data

Prefer keeping sensitive information on the server instead of storing it unnecessarily in browser storage.

If client storage is required:
- store the minimum data
- avoid secrets where possible
- encrypt sensitive data when appropriate
- consider expiry and cleanup

The course also highlights browser storage limits and performance/data-loss concerns when storing too much data.

## Authentication

Common concepts:
- JWT
- OAuth
- token/session expiry
- MFA (multi-factor authentication)

### Example

```text
Login
  ↓
Authentication
  ↓
Short-lived session/token
  ↓
API requests
  ↓
Expiry / refresh / logout
```

## Session Management

For authentication cookies, prefer appropriate security attributes:

```text
HttpOnly → JavaScript cannot read cookie
Secure   → send over HTTPS
SameSite → restrict cross-site cookie sending
```

## Data Integrity

Data integrity means data has not been changed by an unauthorized party. It matters for data **at rest, during processing and in transit**.

Checksums/hashes can help detect unwanted changes.

## Interview Answer

> "I don't trust the client for security decisions. Sensitive data should stay server-side where possible, authentication tokens should have controlled expiry, MFA should be used for high-risk authentication, and cookies should use HttpOnly, Secure and appropriate SameSite settings."

## Memory Trick

**Browser = untrusted. Minimize storage + expire sessions + protect cookies.**
