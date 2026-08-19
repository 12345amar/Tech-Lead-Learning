# 🔴 Advanced System Design — Senior / Tech Lead Interview Practice

These designs focus on distributed systems, failure handling, consistency, ordering, concurrency, scale, and operational complexity.

---

## 1. Distributed Cache

### Architecture
```text
Clients
  ↓
Application Servers
  ↓
Cache Cluster
 ┌────┬────┬────┐
 C1   C2   C3   C4
  ↓    ↓    ↓    ↓
Consistent Hashing / Partitioning
```

### Key Problems
- How keys are distributed
- Cache eviction
- Expiration
- Cache invalidation
- Hot keys
- Node failure
- Rebalancing
- Cache stampede

### Interview Point
A distributed cache improves latency and database load, but introduces another distributed component that must handle stale data and failures.

---

## 2. Distributed Message Queue

### Architecture
```text
Producer
   ↓
Message Broker Cluster
 ┌────────┬────────┬────────┐
Topic P0  Topic P1  Topic P2
   ↓         ↓         ↓
Consumers / Consumer Groups
```

### Important Concepts
- Partitioning
- Ordering within a partition
- Consumer groups
- Replication
- Consumer offset
- Retry
- Dead-letter queue
- Backpressure

### Interview Point
A message queue decouples producers and consumers. The difficult part is not putting a message in a queue; it is defining **ordering, delivery guarantees, retries, and failure recovery**.

---

## 3. Distributed Lock

### Goal
Allow only one worker to perform a critical operation at a time across multiple machines.

### Architecture
```text
Worker A ──┐
Worker B ──┼──→ Lock Service
Worker C ──┘       ↓
                Lock Store
```

### Example
Only one worker should process payment reconciliation for account `123` at a time.

### Critical Rules
- Lock must expire if owner crashes.
- Lock ownership should be verifiable.
- Work must be idempotent.
- A delayed worker must not accidentally act after its lock is no longer valid.

### Interview Question
**Why not simply use a database row lock?**

Answer: Database locking can be perfectly suitable for a single database transaction, but a distributed lock may be required when coordination spans multiple services or resources. The choice depends on the consistency and failure requirements.

---

## 4. Real-Time Analytics

### Architecture
```text
Applications
    ↓
Event Producers
    ↓
Message Broker
    ↓
Stream Processing
    ↓
Aggregated Data Store
    ↓
Analytics API / Dashboard
```

### Example
An e-commerce company wants:

```text
Orders in the last 5 minutes
Revenue today
Top products
Users currently active
```

### Key Problems
- Very high event volume
- Late events
- Duplicate events
- Windowed aggregation
- Data retention
- Real-time versus historical analytics

### Interview Point
Do not run expensive analytical queries directly against the transactional database.

---

## 5. Payment System

### Architecture
```text
Client
  ↓
Payment API
  ↓
Payment Service
  ├── Idempotency Store
  ├── Transaction Database
  └── Payment Provider
           ↓
      External Bank / Network

Payment Events → Message Broker → Reconciliation / Notification
```

### Critical Flow
```text
Create Payment
      ↓
Create unique payment operation identifier
      ↓
Store request state
      ↓
Call payment provider
      ↓
Receive result / callback
      ↓
Update state safely
      ↓
Publish payment event
```

### Must Handle
- Duplicate requests
- Network timeout after provider accepted payment
- Provider retries
- Partial failures
- Reconciliation
- Audit trail
- Strong data integrity

### Most Important Interview Concept
**Idempotency.** If the client retries because it did not receive a response, the system must not charge the customer twice.

---

## 6. Ticket Booking System

### Architecture
```text
User
 ↓
Booking API
 ↓
Inventory Service
 ↓
Seat Database / Reservation Store
 ↓
Payment Service
 ↓
Booking Confirmation
```

### Critical Problem
Two users must not successfully reserve the same seat.

### Possible Approach
```text
Seat Available
      ↓
Temporary Hold
      ↓
Payment
      ↓
Confirmed
```

If payment fails or the hold expires:

```text
Temporary Hold → Released → Available
```

### Interview Topics
- Concurrency control
- Temporary reservation
- Expiration
- Idempotency
- Payment failure
- Overselling prevention

---

## 7. E-Commerce Platform

### Architecture
```text
Client
 ↓
API Gateway
 ├── User Service
 ├── Product Service
 ├── Cart Service
 ├── Order Service
 ├── Inventory Service
 └── Payment Service

Order Events → Message Broker
                  ├── Notification
                  ├── Shipping
                  ├── Analytics
                  └── Recommendation
```

### Critical Flow
```text
Cart
 ↓
Checkout
 ↓
Reserve Inventory
 ↓
Create Order
 ↓
Payment
 ↓
Confirm Order
 ↓
Shipping
```

### Hard Problems
- Inventory race conditions
- Payment failures
- Order state transitions
- Distributed transactions
- Search scale
- Flash-sale traffic

### Interview Point
Avoid trying to make every service part of one distributed transaction. Use clear state machines, idempotency, events, and compensating actions where appropriate.

---

## 8. News Feed at Massive Scale

### Architecture
```text
Users
  ↓
Post Service
  ↓
Event Stream
  ↓
Feed Generation
 ┌───────────────┐
 │ Normal Users  │ → Fan-out on Write
 │ Huge Accounts │ → Fan-out on Read
 └───────────────┘
          ↓
      Feed Cache
          ↓
       Feed API
```

### Why Hybrid?
A normal user may have hundreds of followers, but a celebrity may have tens of millions. Copying a celebrity's post into every follower's feed at write time is extremely expensive.

### Solution
- Normal accounts → precompute feeds.
- Very large accounts → merge their posts during feed reads.
- Cache generated feed pages.

### Interview Topics
- Ranking
- Fan-out
- Hot users
- Cache invalidation
- Feed pagination
- Event ordering

---

## 9. Logging / Monitoring Platform

### Architecture
```text
Applications
 ├── Logs ───────┐
 ├── Metrics ────┼──→ Collection Agents
 └── Traces ─────┘          ↓
                       Message Broker
                             ↓
                     Processing / Storage
                       ↙          ↘
                 Search Store    Time-Series Store
                       ↓              ↓
                    Dashboard / Alerts
```

### Requirements
- High ingestion rate
- Searchable logs
- Metric aggregation
- Distributed request tracing
- Retention policies
- Alerting

### Interview Point
Monitoring infrastructure itself must be resilient. During an outage, you need monitoring more than ever.

---

## 10. Multi-Tenant SaaS Platform

### Goal
Serve many organizations from one platform while keeping their data and configuration isolated.

### Architecture
```text
Tenant Users
     ↓
API Gateway
     ↓
Authentication / Authorization
     ↓
Tenant-Aware Services
     ↓
┌───────────────────────────────┐
│ Shared Database / Separate DB │
│ Tenant-specific storage       │
└───────────────────────────────┘
```

### Isolation Models

**Shared database + tenant identifier:** cheapest and simplest, but requires strict isolation controls.

**Separate schema per tenant:** stronger separation with additional operational complexity.

**Separate database per tenant:** strongest isolation, but expensive at large tenant counts.

### Important Problems
- Tenant data isolation
- Noisy-neighbor protection
- Tenant-specific rate limits
- Tenant-specific configuration
- Database scaling
- Per-tenant billing
- Security and authorization

---

# 🧠 Advanced Interview Concepts

## Exactly-Once vs At-Least-Once Processing

### At-Least-Once
A message is delivered one or more times. Duplicates are possible.

Therefore consumers should be **idempotent**.

### Exactly-Once
The business effect occurs once, even if the underlying message is retried. This is difficult in distributed systems and usually requires careful coordination, transactional processing, or deduplication.

> In interviews, do not casually promise exactly-once delivery. Explain how duplicate processing is prevented.

---

## Hot Keys / Hot Partitions

A hot key is one key receiving far more traffic than others.

Example:

```text
product:iphone
      ↓
Millions of requests
      ↓
One cache/database partition becomes overloaded
```

Possible solutions:

- Replicate hot data
- Split a hot key across multiple keys
- Cache aggressively
- Add request coalescing
- Improve partition strategy

---

## Backpressure

Backpressure prevents a fast producer from overwhelming a slower consumer.

```text
Fast Producer
     ↓
   Queue
     ↓
Slow Consumer
```

Possible techniques:

- Limit producer rate
- Bound queue size
- Reject or delay work
- Scale consumers
- Prioritize important messages

---

# 🔥 Advanced Interview Pattern

For every advanced system, answer these questions:

1. What happens at normal traffic?
2. What happens at 10 times the traffic?
3. What happens if one server fails?
4. What happens if the database fails?
5. What happens if the message is processed twice?
6. What happens if the network times out after the operation succeeds?
7. Where can data become inconsistent?
8. What is the bottleneck?
9. How do we scale that bottleneck?
10. What are the operational trade-offs?

---

# 🏆 Senior / Tech Lead Mental Model

```text
Requirements
      ↓
Capacity
      ↓
Data + API
      ↓
Architecture
      ↓
Concurrency
      ↓
Consistency
      ↓
Failure Handling
      ↓
Scalability
      ↓
Observability
      ↓
Trade-offs
```

> **Advanced system design is mostly about failure, concurrency, consistency, and trade-offs — not about adding more services.**