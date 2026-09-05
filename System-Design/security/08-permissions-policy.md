# Permissions Policy

**Permissions Policy** lets a website explicitly control which browser features can be used by the page and embedded content such as iframes.

## Why?

Third-party scripts/iframes may otherwise interact with sensitive browser capabilities.

Examples:
- camera
- microphone
- geolocation
- autoplay
- fullscreen

## Example

```http
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
```

Meaning conceptually:
- camera → disabled
- microphone → disabled
- geolocation → allowed for this site

## iframe Control

A specific iframe can also be restricted with its `allow` attribute.

```html
<iframe src="https://example.com" allow="fullscreen"></iframe>
```

## Permissions Policy vs CSP

- **CSP:** controls which resources/scripts/content the page may load or execute.
- **Permissions Policy:** controls browser features/APIs available to the page/frames.

## Interview Answer

> "When composing a page with third-party content, I use Permissions Policy to explicitly allow only the browser capabilities that are required, especially sensitive features such as camera, microphone and geolocation."
