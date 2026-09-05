# HTTPS — Secure Communication

HTTPS is HTTP over a secure TLS connection. It protects data travelling between client and server.

## What HTTPS Gives You

### 1. Confidentiality

Traffic is encrypted so a network observer cannot simply read sensitive application data.

### 2. Authentication

TLS certificates help the client verify the server's identity.

### 3. Integrity

Cryptographic mechanisms help detect tampering with data in transit.

## Simple Flow

```text
Browser
  │
  │ HTTPS / TLS
  ↓
Server
```

Without HTTPS:

```text
Browser ── plaintext ──> Server
```

## TLS vs HTTP

- HTTP = application protocol
- TLS = security layer protecting the connection
- HTTPS = HTTP carried over TLS

## HSTS

HSTS tells browsers to use HTTPS for the site in future connections.

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Interview Answer

> "All sensitive client-server communication should use HTTPS. TLS provides confidentiality, server authentication through certificates, and integrity protection against tampering. I would also consider HSTS so browsers consistently use HTTPS."
