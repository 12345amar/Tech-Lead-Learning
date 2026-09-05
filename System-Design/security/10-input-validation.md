# Input Validation & Sanitization

**Never trust user input.** Validate it before using it in business logic, queries, URLs, file handling or code execution.

## Validation Checklist

### 1. Whitelist

Allow only expected keys and values.

```text
role = admin/user
```

Don't accept arbitrary role values from the client.

### 2. Type Validation

If you expect a number, verify it is a number. Same for strings, booleans, arrays, etc.

### 3. Format Validation

Use appropriate schemas/regex for things such as email, IDs or dates.

### 4. Length & Size Limits

Always limit request body, strings and uploaded files.

```text
10 MB upload ❌
1 GB unexpected payload → resource exhaustion risk
```

### 5. File Validation

Validate:
- size
- type/MIME
- extension
- content where necessary

Don't trust only the filename extension.

### 6. Sanitization / Output Encoding

If data will be rendered as HTML, sanitize it appropriately. Prefer safe text rendering where HTML is not required.

### 7. Parameterized Queries/URLs

Avoid building commands/queries by concatenating untrusted strings.

## Client vs Server

```text
Client validation → UX + early feedback
Server validation → SECURITY BOUNDARY
```

Never rely only on client-side validation because attackers can bypass the browser.

## Other Practices

- Global error handling
- Security headers
- Regular library updates
- Security audits
- Minimize unnecessary third-party libraries

## Interview Answer

> "I validate at the trust boundary: whitelist fields, validate types/formats, enforce size limits, safely handle files, sanitize or encode output, and use parameterized operations. Client validation is for UX; server validation is mandatory."
