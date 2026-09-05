# Security

Short, practical security notes based on the completed course PDFs. The goal is to remember the **problem → example → mitigation → interview answer** quickly.

## Notes

1. [Security Overview](./01-security-overview.md)
2. [Client-Side Security](./02-client-side-security.md)
3. [Compliance & Regulation](./03-compliance-and-regulation.md)
4. [CORS](./04-cors.md)
5. [CSRF](./05-csrf.md)
6. [XSS](./06-xss.md)
7. [Dependency Security](./07-dependency-security.md)
8. [Permissions Policy](./08-permissions-policy.md)
9. [iFrame Protection](./09-iframe-protection.md)
10. [Input Validation & Sanitization](./10-input-validation.md)
11. [HTTPS](./11-https.md)
12. [Security Headers](./12-security-headers.md)
13. [SSJI](./13-ssji.md)
14. [SSRF](./14-ssrf.md)

## Security Mental Model

```text
User Input
   ↓
Validate / Sanitize
   ↓
Authenticate → Authorize
   ↓
Secure Transport (HTTPS)
   ↓
Secure Browser (CSP, CORS, iframe, Permissions Policy)
   ↓
Secure Dependencies
   ↓
Monitor + Audit + Patch
```

## High-Value Interview Topics

- XSS vs CSRF
- Authentication vs Authorization
- CORS vs CSRF
- HTTPS and TLS
- HttpOnly / Secure / SameSite cookies
- CSP and security headers
- SSRF and input validation
- Dependency security
- iFrame clickjacking
- SRI and third-party resources
