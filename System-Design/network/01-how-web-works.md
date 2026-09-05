# How the Web Works

> **Interview mental model:** Browser → Cache/Service Worker → DNS → Router/ISP → Internet/Backbone → Server/Data Center → Response → Browser Rendering

## 1. What happens when you type `google.com`?

At a high level, the client sends a request and a server returns a response. The PDF uses a **pizza-delivery analogy**: client = customer, server = pizza shop, response = delivered pizza. fileciteturn7file1L385-L403

```text
Browser
  ↓
Browser Cache / Service Worker
  ↓
DNS → IP address
  ↓
Router → ISP
  ↓
Internet / Routers / Fiber
  ↓
Data Center / Server
  ↓
Response
  ↓
Browser Rendering
```

## 2. DNS — Domain → IP

DNS is hierarchical. Think:

```text
.                 Root
└── com            TLD
    └── google     Second-level domain
        └── mail   Subdomain
```

Example: `mail.google.com` → root `.` + TLD `com` + SLD `google` + subdomain `mail`. fileciteturn7file1L434-L479

**Interview point:** DNS lets users use memorable names while the network routes to an IP address.

## 3. How data travels

Your request moves through local → regional → global networks. The data is split into **packets**; each router hop selects a path toward the destination. The response packets are reassembled at the device. fileciteturn7file1L528-L541

```text
Device → Local ISP → Regional ISP → Backbone/Fiber → Data Center
```

### Why can a nearby server matter?

Greater physical/network distance generally means more latency. Companies use multiple regions/data centers to serve users closer to them. fileciteturn7file1L491-L499

## 4. Router vs ISP

- **Router:** connects/manage devices in the local network and forwards traffic.
- **ISP:** connects that local network to the wider internet.

The PDF shows devices connecting to a router, then a modem/ISP, then the global network. fileciteturn7file1L405-L430

## 5. Caching before the network

A request may not need to reach the origin server.

```text
Browser
  ↓
Browser Cache / Service Worker
  ├─ HIT  → return locally
  └─ MISS → Network
             ↓
          CDN / other caches
             ├─ HIT  → return cached data
             └─ MISS → Origin server
```

The PDF highlights browser cache, service-worker cache, and network/CDN caches as layers that can avoid an origin request and reduce latency. fileciteturn7file1L555-L577

### Service Worker
A service worker can intercept fetch requests, read its cache, return cached resources, and even support some offline behavior. fileciteturn7file1L567-L577

## 6. ISP Peering

**Peering** = two networks connect directly to exchange traffic. This can reduce latency, cost, and hops. The PDF gives edge-server placement near ISP networks as an example. fileciteturn7file1L580-L587

## 7. TCP Three-Way Handshake

Before data transfer, TCP establishes a connection:

```text
Client                 Server
  | ---- SYN ----------> |
  | <--- SYN + ACK ----- |
  | ---- ACK ----------> |
  |    Connection ready  |
```

The PDF explains the same flow using a parcel-delivery analogy. fileciteturn7file1L605-L615

## 8. Browser Rendering

After the response arrives, the browser turns HTML/CSS/JS into pixels:

```text
HTML
 ↓
DOM
 ↓
CSS → CSSOM
 ↓
DOM + CSSOM
 ↓
Render Tree
 ↓
Layout / Reflow
 ↓
Paint
 ↓
Compositing / GPU
 ↓
Pixels
```

The PDF describes DOM creation from HTML, CSSOM creation from CSS, then render tree, layout, painting, and compositing. fileciteturn7file1L678-L698 fileciteturn7file1L708-L745

### Performance interview points

- CSS can be **render-blocking**.
- JavaScript can be **parser-blocking**.
- DOM changes can trigger style recalculation/layout work. fileciteturn7file1L623-L645

## 9. Common Interview Questions

**Q: Why DNS?**  
A: To resolve a human-readable domain to the IP used for network routing.

**Q: What is a packet?**  
A: A small unit of network data; many packets together carry the full response. fileciteturn7file1L535-L541

**Q: Why use multiple regions?**  
A: To reduce user-to-server distance/latency and improve service reach. fileciteturn7file1L491-L499

**Q: Why cache?**  
A: To serve frequently requested resources closer to the user and avoid unnecessary origin work. fileciteturn7file1L555-L564

**Q: Explain the full request path in 30 seconds.**  
A: “The browser first checks local caches/service worker. On a miss, DNS resolves the domain, then the request travels through the router, ISP and internet routers to the destination server. The response comes back as packets. The browser then parses HTML into the DOM, CSS into the CSSOM, builds the render tree, performs layout, paints, and composites the final pixels.” fileciteturn7file1L544-L552
