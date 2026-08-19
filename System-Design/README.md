# 🏗️ System Design — Interview Notes

> **System Design is not about finding one perfect architecture.** It is about understanding requirements, scale, constraints, trade-offs, and choosing the simplest solution that works.

---

## 🧠 3 Principles to Remember

### 1. Abstraction
Hide implementation details behind a clear interface/contract.

**Benefits:** loose coupling, lower complexity, easier testing, change, reuse and scaling.

### 2. Every System Is Unique
Architecture depends on:

- Business requirements
- Traffic and data scale
- Read/write pattern
- Latency
- Availability
- Consistency
- Security
- Cost

> **Different problems → different constraints → different designs.**

### 3. No "One" Correct Solution
Multiple designs can work. Interviewers care about **why** you chose a design and what trade-offs it has.

---

# 🚀 System Design Interview Framework

Use this flow for almost every interview question:

```text
1. Clarify Requirements
        ↓
2. Functional Requirements
        ↓
3. Non-Functional Requirements
        ↓
4. Capacity / Scale Estimation
        ↓
5. API + Data Model
        ↓
6. High-Level Architecture
        ↓
7. Deep Dive into Critical Components
        ↓
8. Scalability + Reliability + Security
        ↓
9. Bottlenecks + Trade-offs
```

### Golden Interview Rule

> **Do not start with technology. Start with requirements.**

---

# 1️⃣ Functional Requirements — WHAT?

Ask: **What must the system do?**

Example — URL Shortener:

- Create short URL
- Redirect short URL → original URL
- Optional expiry
- Analytics

Keep requirements limited to the **core features** first.

---

# 2️⃣ Non-Functional Requirements — HOW WELL?

Ask about:

| NFR | Key Question |
|---|---|
| Performance | How fast? |
| Scalability | How much traffic/data? |
| Availability | What uptime/SLA (Service Level Agreement)? |
| Reliability | What happens when components fail? |
| Consistency | Must reads always show latest data? |
| Durability | Can stored data ever be lost? |
| Security | Who can access what? |
| Observability | How will we detect/debug failures? |
| Cost | What budget/complexity is acceptable? |

---

# 3️⃣ Capacity Estimation

You do not need exact numbers. Show your assumptions and order of magnitude.

### Basic Formulas

```text
Daily Requests = Users × Requests/User/Day

QPS ≈ Daily Requests / 86,400

Peak QPS ≈ Average QPS × Peak Factor

Storage = Objects × Average Object Size

Bandwidth = Requests × Average Response Size
```

### Always Estimate

- Users / active users
- Requests per second (QPS)
- Read vs write ratio
- Peak traffic
- Storage growth
- Bandwidth
- Cache size if relevant

> **State assumptions clearly. Approximate numbers are better than no reasoning.**

---

# 4️⃣ API Design

Define APIs only for important functional requirements.

Example:

```http
POST /urls
GET  /{shortCode}
DELETE /urls/{id}
GET /urls/{id}/analytics
```

### API Concepts — Quick Definitions

| Concept | Short Definition |
|---|---|
| **HTTP Method** | Defines the operation: `GET` read, `POST` create/action, `PUT` replace, `PATCH` update, `DELETE` remove. |
| **Request / Response** | Request is what the client sends; response is what the server returns, usually with status code, headers and body. |
| **Authentication** | Verifies **who** the caller is, e.g. JWT, OAuth, API key. |
| **Pagination** | Splits large result sets into smaller pages using `page/limit`, cursor, etc. |
| **Idempotency** | Repeating the same request produces the same intended result; important for retries such as payments. |
| **Error Handling** | Return meaningful status codes and safe, consistent error responses. |
| **Rate Limiting** | Restricts requests per client/time window to protect the system and ensure fair usage. |
| **API Versioning** | Allows APIs to evolve without breaking existing clients, e.g. `/api/v1/users`. |

### Mention when relevant

- HTTP method
- Request/response
- Authentication
- Pagination
- Idempotency
- Error handling
- Rate limiting
- API versioning

---

# 5️⃣ Data Model

Identify the important entities and relationships before choosing a database.

Example — URL Shortener:

```text
URL
-----------------
id
short_code
long_url
user_id
created_at
expires_at
```

Ask:

- What is the primary key?
- Which fields need indexes?
- What are the read/write patterns?
- Do we need transactions?
- How large will the data become?

---

# 🏛️ 6️⃣ High-Level Architecture

A common starting point:

```text
                    Client
                      ↓
                 DNS / CDN
                      ↓
               Load Balancer
                      ↓
                API Gateway
                      ↓
               Application Tier
                /     |      \
               ↓      ↓       ↓
            Cache   Service   Queue
               |      |        |
               ↓      ↓        ↓
            Database       Workers
               |
               ↓
        Object / Blob Storage
```

Do not add components unless a requirement justifies them.

---

# 🧩 Core Building Blocks

## DNS
Maps a domain name to an IP/service.

## CDN
Caches static/content-heavy data near users.

**Good for:** images, videos, JS/CSS, static files.

## Load Balancer
Distributes traffic across healthy instances.

Common strategies:

- Round Robin
- Least Connections
- Weighted
- IP Hash

## API Gateway
Common entry point for APIs.

Can provide:

- Authentication
- Routing
- Rate limiting
- Logging
- Request transformation

## Stateless Application Servers
Keep session state outside the server so instances can scale horizontally.

## Cache
Stores frequently accessed data closer to the application.

Common pattern:

```text
Cache-Aside:
App → Cache → Miss → DB → Cache
```

Important topics:

- TTL
- Eviction
- Cache invalidation
- Cache stampede
- Hot keys
- Hit ratio

## Message Queue
Decouples producers and consumers and enables asynchronous processing.

```text
Producer → Queue → Consumer
```

Use for:

- Email/notifications
- Image/video processing
- Analytics
- Background jobs
- Event-driven workflows

Important concepts:

- At-most-once
- At-least-once
- Ordering
- Retry
- Dead-letter queue
- Consumer lag
- Idempotency

---

# 🗄️ Database Design

## SQL vs NoSQL

### SQL
Use when you need:

- Strong relationships
- Transactions
- Structured schema
- Complex queries
- Strong consistency

Examples: PostgreSQL, MySQL.

### NoSQL
Useful for:

- Massive scale
- Flexible schema
- High throughput
- Specific access patterns

Examples: DynamoDB, Cassandra, MongoDB.

> **Choose the database from access patterns and requirements — not popularity.**

## Database Scaling

### Read Replicas

```text
              Primary
             /       \
          Write     Replicas
                     /   \
                   Read Read
```

### Sharding / Partitioning
Split data across nodes.

```text
Shard 1 → Users 1–1M
Shard 2 → Users 1M–2M
Shard 3 → Users 2M–3M
```

Common partition keys:

- user_id
- tenant_id
- region

### Important Problems

- Hot partitions
- Cross-shard queries
- Rebalancing
- Distributed transactions
- Replication lag

---

# 🔄 Consistency & Availability

## Strong Consistency
Reads immediately reflect successful writes.

**Useful for:** payments, balances, critical transactions.

## Eventual Consistency
Replicas converge over time.

**Useful for:** feeds, likes, analytics, recommendations.

### CAP Theorem
In the presence of a **network partition**, a distributed system must choose between:

- **Consistency (C)**
- **Availability (A)**

Partition tolerance (P) is assumed for distributed systems.

> CAP is about behavior **during a partition**, not a simple "pick any two" rule.

---

# ⚡ Scalability

## Vertical Scaling
Increase resources of one machine.

```text
4 CPU / 8 GB
     ↓
16 CPU / 64 GB
```

Simple, but has hardware limits.

## Horizontal Scaling
Add more machines.

```text
             Load Balancer
            /      |      \
         Server  Server  Server
```

Preferred for large distributed systems.

### Common Scaling Techniques

- Load balancing
- Stateless services
- Caching
- CDN
- Read replicas
- Sharding
- Async processing
- Queue-based architecture
- Auto-scaling

---

# 🛡️ Reliability & Fault Tolerance

Assume components **will fail**.

Use:

- Replication
- Health checks
- Timeouts
- Retries
- Exponential backoff
- Circuit breakers
- Failover
- Idempotency
- Graceful degradation
- Backups
- Disaster recovery

### Retry Warning
Never blindly retry every request.

For payments, use **idempotency keys** to avoid duplicate operations.

---

# 🔐 Security

Always consider:

```text
Authentication
      ↓
Authorization
      ↓
Input Validation
      ↓
Rate Limiting
      ↓
Encryption
      ↓
Audit / Monitoring
```

Know these interview topics:

- OAuth / JWT
- TLS/HTTPS
- Encryption at rest/in transit
- RBAC
- Secrets management
- API rate limiting
- DDoS protection
- SQL/NoSQL injection
- Least privilege

---

# 📊 Observability

Three pillars:

```text
Logs + Metrics + Traces
```

Monitor:

- Latency
- Error rate
- Throughput/QPS
- CPU/memory
- DB latency
- Cache hit ratio
- Queue depth/consumer lag
- Availability

Use correlation/request IDs to trace a request across services.

---

# 🔁 Synchronous vs Asynchronous

### Synchronous
Caller waits for response.

```text
Client → API → Service → DB → Response
```

Use when the result is required immediately.

### Asynchronous
Caller submits work and processing happens later.

```text
Client → API → Queue → Worker → DB/Storage
```

Use for long-running or non-critical background work.

---

# 🔥 Common System Design Interview Questions

Prepare these patterns rather than memorizing individual diagrams:

### Beginner / Core

1. Design a URL Shortener
2. Design a Rate Limiter
3. Design a File Storage System
4. Design a Pastebin
5. Design an API Gateway

### Medium

6. Design WhatsApp / Chat System
7. Design Twitter/X Feed
8. Design Instagram
9. Design YouTube
10. Design Netflix
11. Design Notification System
12. Design Search Autocomplete
13. Design Web Crawler
14. Design Ride Sharing
15. Design Food Delivery

### Advanced

16. Design Distributed Cache
17. Design Distributed Message Queue
18. Design Distributed Lock
19. Design Real-Time Analytics
20. Design Payment System
21. Design Ticket Booking System
22. Design E-commerce Platform
23. Design News Feed at Massive Scale
24. Design Logging / Monitoring Platform
25. Design Multi-Tenant SaaS Platform

---

# 🧠 Questions Interviewers Commonly Ask

For any design, be ready to answer:

### Requirements
- What are the core features?
- What can we ignore for now?
- What is the expected scale?

### API
- What APIs are needed?
- Is the API idempotent?
- How will pagination work?
- How will we rate-limit clients?

### Database
- SQL or NoSQL — why?
- What is the partition key?
- Where do we need indexes?
- How will reads scale?
- What happens when a shard fails?

### Performance
- Where is the bottleneck?
- Can we cache it?
- Can we use a CDN?
- Can the operation become asynchronous?

### Scalability
- How do we handle 10× traffic?
- What happens during traffic spikes?
- How do we scale the database?

### Reliability
- What happens if a server/database/queue fails?
- How do we retry safely?
- How do we avoid duplicate processing?
- What is the disaster-recovery strategy?

### Consistency
- Strong or eventual consistency?
- What stale data is acceptable?
- What happens during replication lag?

### Trade-offs
- Why this database?
- Why cache?
- Why queue?
- Why microservices instead of a monolith?
- What would you change at 10× scale?

---

# ⚖️ Essential Trade-offs

| Decision | Trade-off |
|---|---|
| SQL vs NoSQL | Transactions/relationships vs flexible massive-scale access patterns |
| Strong vs Eventual Consistency | Correctness/immediacy vs availability/latency |
| Cache | Lower latency/load vs invalidation/staleness |
| Sync vs Async | Immediate result vs better decoupling/scalability |
| Monolith vs Microservices | Simplicity vs independent scaling/deployment |
| Replication | Availability/read scale vs consistency/storage cost |
| Sharding | Massive write/data scale vs operational complexity |
| More replicas | Availability/read scale vs cost |

> **Every architecture decision should have a reason and a trade-off.**

---

# 🎯 Deep-Dive Topics You Must Know

For senior / Tech Lead interviews, understand these beyond definitions:

- Load balancing
- CDN
- Caching strategies
- Cache invalidation
- Database indexing
- Replication
- Sharding
- CAP theorem
- Consistency models
- Message queues
- Kafka fundamentals
- Idempotency
- Distributed locks
- Rate limiting algorithms
- Circuit breaker
- Retry/backoff
- API gateway
- Service discovery
- Event-driven architecture
- Pub/Sub
- WebSockets
- Long polling
- Object storage
- Search systems
- Authentication/authorization
- Observability
- Disaster recovery
- Multi-region architecture
- Hot keys / hot partitions
- Backpressure
- Exactly-once vs at-least-once processing

---

# 📌 Quick Interview Checklist

Before finishing your answer, verify:

- [ ] Requirements clarified
- [ ] FR + NFR defined
- [ ] Scale estimated
- [ ] APIs defined
- [ ] Data model discussed
- [ ] Database choice justified
- [ ] High-level architecture drawn
- [ ] Cache/CDN considered
- [ ] Queue/async processing considered
- [ ] Scaling strategy explained
- [ ] Failure handling explained
- [ ] Consistency model explained
- [ ] Security covered
- [ ] Observability covered
- [ ] Bottlenecks identified
- [ ] Trade-offs explained
- [ ] Future 10× scale discussed

---

# 🧩 One-Line Mental Model

```text
Requirements
   ↓
Scale
   ↓
API + Data
   ↓
Architecture
   ↓
Scale + Cache + DB + Queue
   ↓
Reliability + Security + Observability
   ↓
Bottlenecks + Trade-offs
```

> ## 🚀 Interview Formula
> **Understand → Estimate → Design → Deep Dive → Scale → Handle Failures → Explain Trade-offs**

---

# 🏆 Final Takeaway

> **Good System Design = Correct Requirements + Appropriate Architecture + Explicit Trade-offs**

Don't try to draw the biggest architecture. Build the **simplest system that satisfies the current requirements and can evolve as the system grows.**
