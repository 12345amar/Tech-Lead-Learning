# 🧠 System Design Attributes — Deep-Dive Interview Notes

> **Purpose:** Deep learning + interview preparation for senior/Tech Lead System Design discussions.
>
> For every topic, remember: **What → Why → How → Real Scenario → Trade-offs → Interview Questions**.

---

## 📚 Topics

1. Load Balancing
2. CDN
3. Caching Strategies
4. Cache Invalidation
5. Database Indexing
6. Replication
7. Sharding
8. CAP Theorem
9. Consistency Models
10. Message Queues
11. Kafka Fundamentals
12. Idempotency
13. Distributed Locks
14. Rate Limiting Algorithms
15. Circuit Breaker
16. Retry & Backoff
17. API Gateway
18. Service Discovery
19. Event-Driven Architecture
20. Pub/Sub
21. WebSockets
22. Long Polling
23. Object Storage
24. Search Systems
25. Authentication & Authorization
26. Observability
27. Disaster Recovery
28. Multi-Region Architecture
29. Hot Keys / Hot Partitions
30. Backpressure
31. Exactly-Once vs At-Least-Once Processing

---

# 1️⃣ Load Balancing

### What?
A **Load Balancer (LB)** distributes incoming requests across multiple healthy servers.

```text
                 Users
                   ↓
              Load Balancer
              /     |     \
             ↓      ↓      ↓
          Server  Server  Server
```

### Why?
Without an LB, one server can become overloaded while others remain idle.

Benefits:

- Horizontal scaling
- High availability
- Failover
- Better resource utilization
- Zero/low downtime deployments

### Common Algorithms

| Algorithm | Idea | Good For |
|---|---|---|
| Round Robin | 1 → 2 → 3 → 1 | Similar servers/requests |
| Weighted | More traffic to stronger servers | Different server capacity |
| Least Connections | Send to least busy server | Long-lived requests |
| IP Hash | Same client → same server | Session affinity |

### Real Scenario
An e-commerce sale generates 100,000 requests/sec. Instead of one application server receiving all traffic, the LB spreads traffic across 100 instances.

If Server 7 becomes unhealthy, health checks remove it from rotation.

### Interview Point
**Q: Why prefer stateless servers?**

Because any request can go to any healthy instance. Session data should be stored externally, such as Redis/database, when required.

### Trade-off
An LB adds another component that must itself be highly available.

---

# 2️⃣ CDN — Content Delivery Network

### What?
A CDN caches content at geographically distributed **edge locations** close to users.

```text
User India  → India Edge ─┐
User USA    → USA Edge   ├→ Origin Server
User Europe → EU Edge    ┘
```

### Why?
It reduces:

- Latency
- Origin traffic
- Bandwidth cost
- Load on application servers

### Good Candidates

- Images
- Videos
- JS/CSS
- Static pages
- Downloadable files

### Real Scenario
A user in India requests an image hosted in the US. If the image is cached at an Indian edge, the request is served locally instead of crossing the globe.

### Interview Questions
- CDN vs cache?
- What happens on a cache miss?
- How do you invalidate CDN content?
- How do you handle private/user-specific content?

### Remember
**CDN = distributed cache for content, usually at the network edge.**

---

# 3️⃣ Caching Strategies

### What?
Caching stores frequently accessed data in a faster layer so the application avoids expensive computation/database calls.

```text
Client → App → Cache → DB
                 ↑
             Fast path
```

### Cache-Aside / Lazy Loading
Most common application pattern.

```text
1. App checks cache
2. Hit → return data
3. Miss → read DB
4. Put data in cache
5. Return data
```

### Write-Through
Write to cache and database together.

**Advantage:** cache stays current.

**Cost:** writes can be slower.

### Write-Behind / Write-Back
Write to cache first; persist to DB asynchronously.

**Advantage:** fast writes.

**Risk:** data can be lost if cache fails before persistence.

### Read-Through
Application asks cache; cache itself loads missing data from the backing store.

### Real Scenario
Product details are read millions of times but change rarely. Cache product data in Redis for 5 minutes.

### Interview Point
Always discuss:

- TTL
- Eviction policy
- Cache hit ratio
- Invalidation
- Hot keys
- Stampede protection

---

# 4️⃣ Cache Invalidation

### What?
Cache invalidation means ensuring stale cached data is removed or updated when source data changes.

> **The difficult part of caching is often not reading data—it is keeping cached data correct.**

### Strategies

#### TTL
Data automatically expires.

#### Explicit Invalidation
After DB update:

```text
Update DB → Delete/Update Cache
```

#### Versioned Keys

```text
product:123:v5
```

New version naturally bypasses the old cache.

### Real Scenario
A product price changes from ₹999 → ₹799, but Redis still has ₹999. Users may see the wrong price.

For critical values, do not rely only on a long TTL.

### Cache Stampede
A popular key expires and thousands of requests hit the DB simultaneously.

Solutions:

- Lock/single-flight
- Staggered TTLs
- Refresh-ahead
- Request coalescing

### Interview Question
**Why is cache invalidation hard?**

Because distributed caches can become stale, multiple writers may update data, and invalidation itself can fail or race with writes.

---

# 5️⃣ Database Indexing

### What?
An index is a data structure that helps a database find rows faster without scanning the entire table.

```text
Without index:
DB → Scan 10M rows → Find user

With index:
Index → Locate user → Read row
```

### Common Index
B-Tree indexes support efficient equality/range queries and sorting for many relational databases.

### Example

```sql
CREATE INDEX idx_user_email ON users(email);
```

Now:

```sql
SELECT * FROM users WHERE email = 'a@example.com';
```

can avoid a full table scan.

### Composite Index

```sql
INDEX(user_id, created_at)
```

Useful for queries filtering by `user_id` and then sorting/filtering by `created_at`.

### Trade-offs
Indexes improve reads but:

- Consume storage
- Slow writes
- Need maintenance

### Interview Questions
- Which fields should be indexed?
- Why not index every column?
- What is a composite index?
- What is index selectivity?
- What happens when an index is not used?

> **Index for actual query patterns, not for every column.**

---

# 6️⃣ Replication

### What?
Replication keeps copies of data on multiple database/storage nodes.

```text
             Primary
            /       \
       Replica A   Replica B
          Read        Read
```

### Why?

- High availability
- Read scaling
- Fault tolerance
- Disaster recovery

### Primary-Replica
Writes go to primary; reads can go to replicas.

### Problem: Replication Lag
A write succeeds on primary but a replica may not have received it yet.

```text
Write → Primary ✅
Read  → Replica ❌ old value
```

### Real Scenario
After changing a user's password, a request immediately routed to a lagging replica could still see old state.

Critical reads may need to go to the primary or use stronger consistency guarantees.

### Interview Trade-off
Replication improves availability/read scale but adds storage cost and possible consistency/lag issues.

---

# 7️⃣ Sharding / Partitioning

### What?
Split a large dataset across multiple nodes so no single database must store/process everything.

```text
               Application
                    ↓
              Shard Router
             /      |      \
            ↓       ↓       ↓
         Shard 1  Shard 2  Shard 3
```

### Shard Key
A field used to decide where data lives.

Examples:

- user_id
- tenant_id
- region

### Good Shard Key
Should have:

- High cardinality
- Even distribution
- Query usefulness
- Stable value

### Bad Shard Key
A low-cardinality or monotonically increasing key can create hotspots.

### Real Scenario
A social platform has 2 billion users. User data is partitioned by `user_id` across hundreds of database shards.

### Problems

- Cross-shard queries
- Hot shards
- Rebalancing
- Distributed transactions
- Operational complexity

> **Sharding is powerful, but expensive in complexity. Do it when scale requires it.**

---

# 8️⃣ CAP Theorem

### What?
For a distributed system, when a **network partition (P)** occurs, you cannot guarantee both:

- **Consistency (C)**
- **Availability (A)**

So during a partition, the system chooses behavior closer to **CP** or **AP**.

### C — Consistency
Every successful read sees the latest agreed value.

### A — Availability
Every request receives a non-error response, subject to the system's stated guarantees.

### P — Partition Tolerance
The system continues operating despite communication failures between nodes.

### Real Scenario
Suppose two data centers lose communication:

```text
DC-A  X  DC-B
```

A bank may reject some writes rather than risk conflicting balances → **CP-oriented behavior**.

A social feed may continue accepting posts and reconcile later → **AP-oriented behavior**.

### Interview Trap
Do not say simply **"CAP means choose any 2 of 3."**

The important point is: **when a partition happens, C and A conflict.**

---

# 9️⃣ Consistency Models

### Strong Consistency
A successful write is immediately visible to subsequent reads under the model's guarantees.

**Use:** bank balance, inventory, payment state.

### Eventual Consistency
Replicas may temporarily disagree but converge.

**Use:** likes, feeds, analytics.

### Read-Your-Writes
A user should see their own update immediately.

### Monotonic Reads
Once a user sees version N, they should not later see an older version.

### Real Scenario
You change your profile name to "Amar". If the next request shows the old name, the system may violate the user experience expectation of read-your-writes.

### Interview Question
**Does every part of a system need strong consistency?**

No. Choose consistency per business operation.

---

# 🔟 Message Queues

### What?
A queue temporarily stores messages between producers and consumers.

```text
Producer → Queue → Consumer
```

### Why?

- Decouple services
- Absorb traffic spikes
- Enable async work
- Improve resilience
- Control processing rate

### Real Scenario
An e-commerce checkout should not wait for email delivery:

```text
Order Service → Queue → Email Worker
```

Order creation can succeed even if the email provider is temporarily unavailable.

### Important Concepts

- Producer
- Consumer
- Acknowledgement
- Retry
- Dead-letter queue (DLQ)
- Ordering
- Visibility timeout / lease where supported
- Consumer lag
- Idempotency

---

# 1️⃣1️⃣ Kafka Fundamentals

### What?
Kafka is a distributed event streaming platform built around durable, ordered logs.

```text
Producer
   ↓
Topic
 ┌───────┬───────┬───────┐
 P0      P1      P2
 ↓       ↓       ↓
Consumers / Consumer Group
```

### Key Concepts

**Topic:** logical stream of events.

**Partition:** ordered sequence within a topic. Ordering is guaranteed within a partition, not across the entire topic.

**Offset:** position of a record in a partition.

**Consumer Group:** consumers share partitions so each partition is processed by one consumer within a group at a time.

### Real Scenario
Order events:

```text
OrderCreated → PaymentCompleted → OrderShipped
```

Different consumer groups can independently process the same event stream:

```text
Kafka
 ├── Analytics Group
 ├── Notification Group
 └── Fraud Group
```

### Interview Questions
- Why partitions?
- How does Kafka scale consumers?
- What happens when a consumer fails?
- How is ordering handled?
- What is consumer lag?
- Why is the partition key important?

---

# 1️⃣2️⃣ Idempotency

### What?
An operation is idempotent when repeating it produces the same intended final result.

### Real Scenario: Payment

```text
Client → POST /payment
       ↓
Network timeout
       ↓
Client retries
```

Without protection, customer may be charged twice.

Use an **Idempotency-Key**:

```http
Idempotency-Key: 8f92...
```

Server stores the result associated with that key and returns the same result for duplicate retries.

### Important
Idempotency is not exactly the same as HTTP method semantics. A `POST` can be made idempotent by application design.

### Interview Question
**Where is idempotency critical?**

- Payments
- Order creation
- Ticket booking
- Message processing
- External API calls

---

# 1️⃣3️⃣ Distributed Locks

### What?
A distributed lock ensures only one process/service instance performs a critical operation at a time across multiple machines.

```text
Server A ──┐
           ├→ Distributed Lock → Critical Work
Server B ──┘
```

### Real Scenario
Two workers detect the same expired subscription and both attempt to charge the customer.

A distributed lock can coordinate ownership of the operation.

### Requirements for a Good Lock

- Lease/expiry
- Ownership identity
- Safe release
- Failure handling
- Avoid indefinite lock retention

### Important Warning
A lock alone does not guarantee correctness if the lock can expire while work continues. Use fencing tokens or equivalent mechanisms when stale owners could corrupt state.

### Interview Question
**When should you avoid a distributed lock?**

Prefer idempotency, database constraints, atomic operations, or partition ownership when they solve the problem more simply.

---

# 1️⃣4️⃣ Rate Limiting Algorithms

### Why?
Protect APIs from abuse, overload, and unfair traffic.

## Fixed Window
Count requests in fixed time windows.

Example: 100 requests/minute.

**Problem:** boundary burst.

## Sliding Window
Counts requests over a rolling time interval.

**More accurate, more state.**

## Token Bucket
Tokens are added at a fixed rate; each request consumes a token.

```text
Bucket: 10 tokens
Refill: 2 tokens/sec
```

Allows controlled bursts.

## Leaky Bucket
Requests enter a queue and leave at a controlled rate.

Good for smoothing traffic.

### Real Scenario
Login API:

```text
5 attempts / minute / IP
```

This reduces brute-force attacks.

### Interview Question
**Token bucket vs leaky bucket?**

Token bucket allows bounded bursts; leaky bucket focuses on a steadier output rate.

---

# 1️⃣5️⃣ Circuit Breaker

### What?
A circuit breaker stops repeatedly calling a failing downstream service.

```text
Caller → Circuit Breaker → Payment Service ❌
```

### States

```text
CLOSED → OPEN → HALF-OPEN → CLOSED
```

**Closed:** requests flow normally.

**Open:** requests fail fast; no calls to unhealthy dependency.

**Half-Open:** allow limited test requests.

### Real Scenario
Recommendation service is down. Instead of every request waiting 5 seconds and retrying, circuit breaker fails fast and the product page returns without recommendations.

### Benefits

- Prevents cascading failures
- Saves resources
- Faster failure response

---

# 1️⃣6️⃣ Retry & Exponential Backoff

### What?
Retry a transient failure instead of immediately failing the operation.

### Exponential Backoff

```text
Attempt 1 → wait 100ms
Attempt 2 → wait 200ms
Attempt 3 → wait 400ms
Attempt 4 → wait 800ms
```

Usually add **jitter** so many clients do not retry simultaneously.

### Retry Only Transient Failures
Good candidates:

- Temporary network error
- 503
- Rate-limit response, respecting Retry-After

Bad candidates:

- Invalid request
- Authentication failure
- Business validation failure

### Real Scenario
If a database connection briefly fails, retrying with backoff may recover. Immediate unlimited retries can create a retry storm and make the outage worse.

> **Timeout + limited retries + backoff + jitter + idempotency** is a common resilient pattern.

---

# 1️⃣7️⃣ API Gateway

### What?
A centralized entry point between clients and backend services.

```text
Clients
   ↓
API Gateway
 ┌───┼────┐
 ↓   ↓    ↓
User Order Payment
```

### Responsibilities

- Routing
- Authentication
- Rate limiting
- TLS termination
- Request validation
- Logging
- API versioning
- Aggregation where appropriate

### Real Scenario
A mobile app calls one gateway instead of knowing the locations of 20 microservices.

### Trade-off
Gateway simplifies clients but can become a bottleneck or single point of failure if poorly designed. Run multiple instances and keep responsibilities focused.

---

# 1️⃣8️⃣ Service Discovery

### What?
Allows services to find the current network location of other service instances.

```text
Order Service
     ↓
Service Discovery
     ↓
Payment Service Instances
```

### Why?
In dynamic environments, IPs/instances change because of scaling, deployments, or failures.

### Types

**Client-side discovery:** client queries registry and chooses instance.

**Server-side discovery:** client calls a load balancer/proxy which discovers the instance.

### Real Scenario
Kubernetes services provide stable service names while pods are replaced dynamically.

### Interview Point
Service discovery + health checking + load balancing work together.

---

# 1️⃣9️⃣ Event-Driven Architecture

### What?
Services communicate by publishing and reacting to events instead of tightly coupling every operation through synchronous calls.

```text
Order Service
     ↓
OrderCreated Event
     ↓
 ┌───┼────┬─────┐
 ↓   ↓    ↓     ↓
Email Fraud Analytics Inventory
```

### Benefits

- Loose coupling
- Async processing
- Independent scaling
- Easy addition of consumers

### Trade-offs

- Eventual consistency
- Debugging complexity
- Duplicate events
- Ordering challenges
- Schema evolution

### Real Scenario
After an order is created, multiple independent systems need to react. Publishing `OrderCreated` avoids making Order Service synchronously call every downstream system.

---

# 2️⃣0️⃣ Pub/Sub

### What?
Publishers send messages to a topic; subscribers receive messages independently.

```text
Publisher
   ↓
 Topic
 / | \
↓  ↓  ↓
A  B  C
```

### Queue vs Pub/Sub

**Queue:** commonly distributes work so one consumer/worker processes a message.

**Pub/Sub:** commonly broadcasts an event so multiple subscribers can independently receive it.

Actual delivery semantics depend on the technology.

### Real Scenario
`UserRegistered` can be consumed independently by:

- Welcome-email service
- Analytics service
- Recommendation service
- CRM service

---

# 2️⃣1️⃣ WebSockets

### What?
WebSockets provide a persistent, bidirectional connection between client and server.

```text
Client ⇄ WebSocket Server
```

### Good For

- Chat
- Live notifications
- Multiplayer games
- Live dashboards
- Real-time collaboration

### Real Scenario
WhatsApp-style chat needs the server to push a new message to the recipient without waiting for another HTTP request.

### Scaling Questions
At large scale, discuss:

- Connection distribution
- Sticky sessions or connection routing
- Shared state/pub-sub
- Reconnection
- Heartbeats
- Backpressure

---

# 2️⃣2️⃣ Long Polling

### What?
Client sends an HTTP request; server holds it until new data is available or timeout occurs.

```text
Client ── request ──→ Server
Client ← data/timeout ─ Server
```

Client then opens another request.

### Good For
Systems where WebSockets are unavailable or unnecessary.

### WebSocket vs Long Polling

| WebSocket | Long Polling |
|---|---|
| Persistent connection | Repeated HTTP requests |
| Bidirectional | Mostly server-to-client updates |
| Lower overhead for frequent updates | Simpler infrastructure |
| Great for real-time systems | Good fallback / lower-frequency updates |

---

# 2️⃣3️⃣ Object Storage

### What?
Stores large unstructured objects such as images, videos, backups, and documents.

Examples: Amazon S3, Google Cloud Storage, Azure Blob Storage.

### Why Not Database?
Large binary files are usually better stored in object storage while the database stores metadata.

```text
DB:
file_id, user_id, object_key, size, created_at

Object Storage:
actual image/video/file
```

### Real Scenario
Instagram stores image/video objects in durable object storage and stores metadata in databases.

### Important Concepts

- Object key
- Metadata
- Versioning
- Lifecycle policies
- Multipart upload
- Presigned URLs
- Durability
- Access control

### Common Pattern
Client uploads directly to object storage using a short-lived presigned URL, reducing load on application servers.

---

# 2️⃣4️⃣ Search Systems

### What?
Search systems build indexes optimized for text and relevance queries.

Common technology: Elasticsearch/OpenSearch.

```text
Documents
   ↓
Indexing
   ↓
Search Index
   ↓
Query → Ranking → Results
```

### Why Not SQL LIKE for Everything?
SQL can handle simple search, but dedicated search engines provide advanced capabilities such as:

- Full-text search
- Tokenization
- Relevance scoring
- Fuzzy matching
- Facets/filters
- Distributed indexing

### Real Scenario
An e-commerce site needs:

```text
"nike running shoes"
```

with typo tolerance, category filters, price filters, and relevance ranking.

### Interview Topics

- Inverted index
- Shards/replicas
- Relevance ranking
- Autocomplete
- Fuzzy search
- Index refresh
- Eventual consistency between DB and search index

---

# 2️⃣5️⃣ Authentication & Authorization

### Authentication — WHO are you?
Verifies identity.

Examples:

- Password + MFA
- OAuth
- JWT
- API key

### Authorization — WHAT can you do?
Checks permissions after identity is established.

```text
Authentication → Identity
Authorization  → Permission
```

### Example
A user successfully logs in (**authentication**) but cannot access another user's admin endpoint (**authorization**).

### RBAC
Role-Based Access Control:

```text
Admin → create/delete users
Agent → view/update tickets
User  → view own profile
```

### Security Principles

- Least privilege
- Short-lived tokens where appropriate
- Secure token storage
- TLS
- Password hashing
- Key rotation
- Audit logs

---

# 2️⃣6️⃣ Observability

### What?
The ability to understand system behavior from its external outputs.

Three pillars:

```text
Logs + Metrics + Traces
```

### Logs
Detailed events/errors.

### Metrics
Numerical measurements over time.

Examples:

- QPS
- p95 latency
- error rate
- CPU
- queue depth

### Traces
Follow one request across multiple services.

```text
Client
 ↓
Gateway [trace-id]
 ↓
Order Service
 ↓
Payment Service
 ↓
Database
```

### Real Scenario
Users report checkout is slow. Metrics show p95 latency increased; traces show Payment Service is taking 3 seconds; logs reveal a downstream timeout.

### Interview Point
Discuss **SLIs, SLOs, alerts, dashboards, correlation IDs, and actionable telemetry**.

---

# 2️⃣7️⃣ Disaster Recovery

### What?
Disaster Recovery (DR) is the ability to restore service/data after a major failure.

### Two Critical Metrics

**RPO — Recovery Point Objective**

How much data loss is acceptable?

Example: RPO = 5 minutes → at worst, 5 minutes of recent data may be lost.

**RTO — Recovery Time Objective**

How quickly must service recover?

Example: RTO = 30 minutes → service should be restored within 30 minutes.

### Strategies

- Backups
- Replication
- Multi-zone deployment
- Warm standby
- Cold standby
- Multi-region recovery

### Real Scenario
If a primary region is unavailable, critical payment services may fail over to another region according to the DR plan.

### Interview Question
**Backup vs replication?**

Replication helps availability and current copies; backups help recover from corruption, accidental deletion, ransomware, or historical states.

---

# 2️⃣8️⃣ Multi-Region Architecture

### What?
Run services/data across multiple geographic regions.

```text
             Global DNS / Traffic Manager
                 /              \
                ↓                ↓
            Region A          Region B
            App + DB          App + DB
```

### Why?

- Disaster recovery
- Lower latency for global users
- Regional fault isolation
- Business continuity

### Models

**Active-Passive:** one region serves traffic; another waits for failover.

**Active-Active:** multiple regions serve traffic simultaneously.

### Challenges

- Cross-region replication
- Data conflicts
- Higher cost
- Global routing
- Consistency
- Operational complexity

### Real Scenario
A global SaaS platform routes European users to Europe and Asian users to Asia, while maintaining a recovery strategy for regional failures.

---

# 2️⃣9️⃣ Hot Keys / Hot Partitions

### Hot Key
One cache/database key receives disproportionate traffic.

Example:

```text
product:iphone-17
```

is requested millions of times during a sale.

### Hot Partition
One shard receives much more traffic/data than others because of an uneven partition key.

### Problems

- CPU overload
- Cache node overload
- Uneven DB utilization
- Increased latency

### Solutions

**Hot key:**

- Replicate popular value across cache nodes
- Local/in-process cache
- Request coalescing
- Pre-warm cache

**Hot partition:**

- Better partition key
- Key salting/bucketing
- Repartitioning
- Traffic-aware routing

### Interview Point
A theoretically balanced hash distribution can still experience hotspots because **traffic distribution is not always uniform**.

---

# 3️⃣0️⃣ Backpressure

### What?
Backpressure prevents a fast producer from overwhelming a slower consumer.

```text
Producer → Queue → Slow Consumer
              ↑
        Backpressure
```

### Real Scenario
A service receives 50,000 events/sec but workers process only 10,000/sec.

Without control:

- Queue grows indefinitely
- Memory/storage fills
- Latency increases
- System eventually fails

### Solutions

- Bounded queues
- Rate limiting
- Consumer autoscaling
- Batch processing
- Load shedding
- Flow control
- Reject/defer non-critical work

### Interview Question
**Backpressure vs rate limiting?**

Rate limiting controls how much traffic enters; backpressure coordinates production/processing when downstream capacity is constrained.

---

# 3️⃣1️⃣ Exactly-Once vs At-Least-Once Processing

### At-Most-Once
A message is processed zero or one time.

**Risk:** message can be lost.

### At-Least-Once
A message is retried until acknowledged, so duplicates can occur.

**Benefit:** lower chance of loss.

```text
Message → Consumer → DB
             ↓
          ACK fails
             ↓
          Retry
             ↓
       Same message again
```

### Exactly-Once
The system provides semantics where the logical effect occurs once, despite retries/failures. True end-to-end exactly-once is difficult and usually depends on the entire processing pipeline.

### Practical Pattern
Prefer:

```text
At-Least-Once Delivery
          +
Idempotent Consumer
          +
Deduplication / Transactional Processing
```

### Real Scenario
An order event is delivered twice. Consumer checks `event_id` or uses a unique database constraint so the order is not processed twice.

### Interview Point
Do not casually claim **"Kafka gives exactly-once everywhere."** Explain the scope and guarantees of the particular pipeline.

---

# 🧠 How These Concepts Connect

A senior interview is rarely about one component. The interviewer may ask you to connect several concepts.

### Example: E-commerce System

```text
                    Client
                      ↓
                 CDN / DNS
                      ↓
                Load Balancer
                      ↓
                API Gateway
                      ↓
              Stateless Services
                /     |      \
               ↓      ↓       ↓
            Redis    DB      Queue
                      ↓        ↓
                  Replicas   Workers
                               ↓
                         Event / Kafka
                               ↓
                    Search / Analytics
```

Then ask:

> **What happens if traffic becomes 10×?**

Think:

```text
LB → Horizontal Scaling
CDN → Reduce origin traffic
Cache → Reduce DB reads
Queue → Absorb spikes
DB Replicas → Scale reads
Sharding → Scale data/write capacity
Kafka → Scale event processing
Rate Limiting → Protect system
Backpressure → Protect consumers
Circuit Breaker → Stop cascading failure
Observability → Detect bottlenecks
Multi-Region/DR → Survive regional failure
```

---

# 🎯 Senior / Tech Lead Interview Pattern

For every deep-dive topic, answer in this order:

```text
1. Definition
      ↓
2. Why do we need it?
      ↓
3. How does it work?
      ↓
4. Real-world example
      ↓
5. Failure scenario
      ↓
6. Scaling approach
      ↓
7. Trade-offs
      ↓
8. When would you NOT use it?
```

### Example: Cache

**What?** Fast temporary storage.

**Why?** Reduce latency and DB load.

**How?** Cache-aside/TTL/etc.

**Scenario?** Product catalog.

**Failure?** Cache outage → DB load spike.

**Scale?** Cluster/replicas/partitioning.

**Trade-off?** Stale data + invalidation complexity.

**Don't use?** Data that must always be strongly current unless the design can guarantee correctness.

---

# 📝 Quick Memory Map

```text
TRAFFIC
  ↓
Load Balancer → Horizontal Scaling
  ↓
CDN → Static/Edge Content
  ↓
Cache → Fast Reads
  ↓
DB Index → Faster Queries
  ↓
Replication → Availability / Read Scale
  ↓
Sharding → Data / Write Scale

ASYNC WORK
  ↓
Queue → Buffer / Decouple
  ↓
Kafka → Distributed Event Stream
  ↓
Pub/Sub → Multiple Consumers
  ↓
Backpressure → Protect Slow Consumers

RELIABILITY
  ↓
Timeout → Don't wait forever
  ↓
Retry + Backoff → Recover transient failures
  ↓
Circuit Breaker → Stop cascading failures
  ↓
Idempotency → Safe retries / duplicates
  ↓
Distributed Lock → Coordinate ownership

DISTRIBUTED DATA
  ↓
Consistency Models
  ↓
CAP
  ↓
Replication
  ↓
Sharding
  ↓
Multi-Region

REAL-TIME
  ↓
WebSocket → Persistent bidirectional
  ↓
Long Polling → HTTP-based fallback

OPERATIONS
  ↓
Observability
  ↓
DR: RPO + RTO
  ↓
Security
```

---

# 🔥 Top Interview Questions to Practice

1. Why do we need a load balancer if we already have multiple servers?
2. CDN vs cache — what is the difference?
3. What happens when a cache expires under huge traffic?
4. How would you prevent cache stampede?
5. Why not create indexes on every DB column?
6. What is replication lag and how do you handle it?
7. How do you choose a shard key?
8. What causes a hot partition?
9. Explain CAP with a real example.
10. Strong vs eventual consistency — where would you use each?
11. Queue vs Pub/Sub — when would you choose each?
12. Kafka partition vs consumer group?
13. How does Kafka preserve ordering?
14. Why is idempotency critical for payments?
15. How would you implement a distributed lock safely?
16. Token bucket vs leaky bucket?
17. How does a circuit breaker prevent cascading failures?
18. Why use exponential backoff + jitter?
19. What belongs in an API Gateway?
20. Why is service discovery required in microservices?
21. Event-driven vs request/response architecture?
22. WebSocket vs long polling?
23. Why use object storage instead of DB BLOBs for large files?
24. How would you design search for an e-commerce site?
25. Authentication vs authorization?
26. Logs vs metrics vs traces?
27. RPO vs RTO?
28. Active-active vs active-passive multi-region?
29. How do you solve hot keys?
30. What happens when consumers are slower than producers?
31. At-least-once vs exactly-once — what does exactly-once really mean?

---

# 🏆 Final Mental Model

> **A strong System Designer does not just know components. They understand why each component exists, what problem it solves, how it fails, how it scales, and what trade-off it introduces.**

```text
Problem
  ↓
Requirement
  ↓
Constraint
  ↓
Component
  ↓
Failure Mode
  ↓
Scaling Strategy
  ↓
Trade-off
```

> ## 🚀 Remember
> **Don't memorize architecture diagrams. Memorize the problems each building block solves.**
