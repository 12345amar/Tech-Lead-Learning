# Security Overview

Security is not one feature. It is a set of layers protecting **user data, identity, actions, communication and browser capabilities**. The course highlights XSS, CSRF, authentication/authorization, input validation, HTTPS, headers, iframe protection, dependency security, client storage, compliance, SSRF, SSJI, feature policy, SRI and CORS. fileciteturn31file1L53-L110

## 1. XSS — Cross-Site Scripting

Attacker gets malicious JavaScript executed in your application.

**Example:** user input is rendered as HTML instead of text.

**Impact:** session theft, data manipulation, phishing, unauthorized actions.

**Defence:** output encoding, safe rendering, input sanitization and CSP.

## 2. CSRF — Cross-Site Request Forgery

Attacker tricks an already-authenticated browser into sending an unwanted state-changing request.

**Example:** logged-in bank user clicks a malicious link and a transfer request is triggered. fileciteturn31file11L586-L605

**Defence:** CSRF token, SameSite cookies and appropriate authentication controls.

## 3. Authentication vs Authorization

- **Authentication:** Who are you?
- **Authorization:** What are you allowed to do?

Use secure sessions/tokens and RBAC where appropriate. fileciteturn31file1L57-L61

## 4. Input Validation

Never trust client input.

Validate:
- type
- allowed values
- format
- length/size
- file type/extension

Client-side validation improves UX; **server-side validation is mandatory**. fileciteturn31file0L18-L43

## 5. HTTPS

Protects data in transit using encryption, authentication and integrity mechanisms. fileciteturn30file10L2-L9

## 6. Browser Security Layers

- CSP → controls what resources/scripts can run
- CORS → controls cross-origin browser access
- X-Frame-Options / CSP frame-ancestors → iframe/clickjacking protection
- Permissions Policy → restricts browser features such as camera/microphone/geolocation. fileciteturn31file6L286-L310
- SRI → verifies externally loaded resources

## 7. Dependency Security

Audit dependencies, monitor vulnerabilities, lock versions and use security scanners. fileciteturn30file6L2-L11 fileciteturn30file6L15-L40

## 8. Server-Side Attacks

- **SSRF:** attacker makes your server request an unintended/internal resource.
- **SSJI:** attacker-controlled input becomes executable server-side JavaScript. fileciteturn31file3L515-L525

## Interview Answer

> "I treat security as defense in depth: validate untrusted input, authenticate and authorize users, use HTTPS, protect cookies, apply CSP and security headers, configure CORS carefully, protect against XSS/CSRF/SSRF, secure third-party dependencies, and continuously audit and patch the system."

## Memory Trick

**Input → Identity → Permission → Transport → Browser → Dependencies → Monitoring**
