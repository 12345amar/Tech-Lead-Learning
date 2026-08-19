# 🟢 Basic System Design — Interview Practice

These designs teach the most reusable building blocks: APIs, caching, databases, load balancing, rate limiting, object storage, and gateways.

## 1. URL Shortener

### Goal
Convert a long URL into a short code and redirect users quickly.

### Architecture
```text
User
  ↓
Load Balancer
  ↓
URL Service
  ├── Cache
  └── Database
       ↓
  Analytics Queue → Worker → Analytics Storage
```

### Flow
1. User sends a long URL.
2. Service generates a unique short code.
3. Store `short_code → long_url` in the database.
4. Put frequently used mappings in cache.
5. On redirect, check cache first, then database.
6. Send click analytics asynchronously so redirects stay fast.

### Key Decisions
- Unique short-code generation must avoid collisions.
- Database needs an index on the short code.
- Cache improves redirect latency.
- Analytics should not block the redirect.

### Interview Follow-ups
- How do you generate unique codes?
- How do you handle billions of URLs?
- What happens when cache is unavailable?
- How do you expire old URLs?

---

## 2. Rate Limiter

### Goal
Prevent a client from sending too many requests in a given period.

### Architecture
```text
Client
  ↓
API Gateway
  ↓
Rate Limiter
  ↓
Application Service
```

For multiple application servers:

```text
Clients → Load Balancer → API Gateway
                         ↓
                    Shared Cache
                         ↓
                    Application
```

### Common Algorithms
**Fixed Window:** count requests in fixed time windows. Simple but can allow bursts at window boundaries.

**Sliding Window:** considers a continuously moving time range and gives smoother control.

**Token Bucket:** tokens are added at a fixed rate; each request consumes a token. Allows controlled bursts.

**Leaky Bucket:** requests enter a queue and leave at a controlled rate. Useful when traffic must be smoothed.

### Interview Follow-ups
- Where should the rate limiter run?
- How does it work across many servers?
- What happens when the shared cache fails?
- Should limits be per user, IP address, API key, or endpoint?

---

## 3. File Storage System

### Goal
Upload, store, download, and optionally share large files.

### Architecture
```text
User
  ↓
API Service
  ↓
Metadata Database
  ↓
Object Storage

Download:
User → API → Signed Download URL → Object Storage
```

### Why Object Storage?
Large files should not normally pass through application servers. Object storage is designed for durable, scalable file storage.

### Upload Flow
1. Client requests an upload URL.
2. API authenticates the user.
3. API returns a temporary signed upload URL.
4. Client uploads directly to object storage.
5. API stores file metadata.
6. Background worker can scan, resize, compress, or process the file.

### Interview Follow-ups
- How do you upload a 10 gigabyte file?
- How do you resume interrupted uploads?
- How do you secure private files?
- How do you handle duplicate files?

---

## 4. Pastebin

### Goal
Allow users to create text snippets and retrieve them using a short identifier.

### Architecture
```text
Client
  ↓
Load Balancer
  ↓
Paste Service
  ├── Cache
  └── Database
```

### Flow
```text
Create Paste → Generate ID → Store Content
                                  ↓
                              Database

Read Paste → Cache → Database → Return Content
```

### Important Design Points
- Short identifier generation
- Expiration of old pastes
- Maximum paste size
- Abuse protection
- Read-heavy caching
- Access control for private pastes

### Interview Follow-ups
- How do you prevent malicious content?
- How do you expire millions of pastes efficiently?
- Why use cache?

---

## 5. API Gateway

### Goal
Provide one controlled entry point for clients accessing multiple backend services.

### Architecture
```text
                         ┌── User Service
Client → API Gateway ────┼── Order Service
                         ├── Payment Service
                         └── Notification Service
```

### Responsibilities
- Authentication
- Authorization checks
- Routing
- Rate limiting
- Request validation
- Logging
- Response transformation
- API version handling

### Important Trade-off
The gateway simplifies clients and centralizes cross-cutting concerns, but it becomes a critical component. Use multiple gateway instances and health checks to avoid a single point of failure.

### Interview Follow-ups
- Gateway versus load balancer?
- What happens if the gateway fails?
- Where should authentication happen?
- Should every internal service also validate authorization?

---

# 🧠 Basic-Level Memory Map

```text
URL Shortener → Unique ID + Cache + Database
Rate Limiter  → Request Control + Token/Window + Shared State
File Storage  → Metadata Database + Object Storage
Pastebin      → Text Storage + Expiration + Cache
API Gateway   → Entry Point + Security + Routing
```

> **Interview goal:** explain the request flow, identify the bottleneck, scale it, and explain the trade-offs.