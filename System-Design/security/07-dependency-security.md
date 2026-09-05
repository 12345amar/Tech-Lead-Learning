# Dependency Security

Your application is only as secure as its dependencies can make it.

## Why It Matters

A vulnerable npm package can introduce a security issue even when your own code is correct.

## Basic Practices

### 1. Audit

```bash
npm audit
npm audit fix
npm audit report
```

Run audits regularly and as part of CI/CD where appropriate.

### 2. Monitor

Use tools such as **Dependabot** to detect dependency updates/vulnerabilities.

**CodeQL** can extend security analysis to code and dependencies.

### 3. Lock Versions

Commit `package-lock.json`.

```text
package.json
    ↓
package-lock.json
    ↓
reproducible dependency versions
```

Locking direct and transitive dependencies helps make builds reproducible.

### 4. Security Testing

Use vulnerability/security scanners and penetration-testing tools where appropriate, such as Burp Suite or OWASP-related tooling.

## Interview Answer

> "I secure the supply chain by minimizing unnecessary dependencies, auditing them regularly, monitoring vulnerabilities, locking dependency versions, keeping packages patched, and adding automated security checks to CI/CD."

## Memory Trick

**Audit → Monitor → Lock → Patch → Test**
