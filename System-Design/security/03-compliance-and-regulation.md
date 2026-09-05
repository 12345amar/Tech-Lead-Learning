# Compliance & Regulation

Security is not only about preventing attacks. Systems may also need to follow **privacy, payment and data-protection regulations**.

## Why Compliance Matters

Companies can face legal/financial consequences when they mishandle user data or violate regulations.

A simple frontend example is asking for user consent before storing certain cookies.

## Common Regulations / Standards

| Standard / Regulation | Main concern |
|---|---|
| GDPR | Privacy and protection of personal data |
| CCPA | Consumer privacy rights |
| PCI-DSS | Payment-card data security |

## Design Mindset

Before collecting data, ask:

1. Do we really need it?
2. What is the purpose?
3. Do we have user consent where required?
4. How long should we retain it?
5. Who can access it?
6. How do we delete/export it when required?
7. Is sensitive data encrypted and protected?

## Example: Cookies

```text
User visits site
      ↓
Cookie consent
      ↓
Essential cookies → allowed as applicable
Optional cookies  → enable after consent as required
```

## Interview Answer

> "I consider compliance as a system-design requirement, not a final checkbox. Data collection, consent, retention, access control, deletion and auditing should be designed according to the regulations applicable to the product and region."

**Important:** exact legal requirements depend on jurisdiction, product and data type; involve the security/legal/compliance teams for production decisions.
