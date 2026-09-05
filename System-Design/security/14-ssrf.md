# Server-Side Request Forgery (SSRF)

SSRF happens when an attacker can influence your **server** into making a request to a location the attacker should not be able to reach.

## Easy Example

Suppose your API accepts:

```text
POST /fetch
{ "url": "https://example.com/image.jpg" }
```

If the server blindly fetches any URL, an attacker may try to make the server access internal services.

```text
Attacker
   ↓ URL
Your Server
   ↓
Internal service / metadata endpoint / unintended system
```

## Why Dangerous?

The server may have network access or credentials that the attacker does not have directly. SSRF can therefore expose sensitive internal resources.

## Main Causes

- Unvalidated user-supplied URLs
- Missing URL/domain allowlists
- Weak network access controls
- Excessive server privileges

## Defences

### 1. Allowlist

Allow only known domains/protocols required by the feature.

```text
Allowed: https://trusted.example.com
Denied: everything else
```

### 2. Validate URL Carefully

Don't rely only on string checks. Parse and validate scheme, hostname, port and resolved destination.

### 3. Network Controls

Prevent application servers from reaching unnecessary internal networks and sensitive endpoints.

### 4. Least Privilege

Limit credentials and permissions available to the application.

## Important Distinction

**SSRF:** attacker controls where the server sends a request.

**SSJI:** attacker gets code executed on the server.

## Related: XXE

Unsafe XML processing can allow attacker-controlled XML to access files or interact with systems reachable by the application.

## Interview Answer

> "For any server-side URL fetching feature, I treat the URL as untrusted. I validate and allowlist destinations, restrict protocols and ports, prevent access to internal networks, and run the service with least privilege."
