# 🏗️ System Design

> **System Design is not about finding one perfect architecture.**  
> It is about understanding requirements, constraints, scale, and trade-offs, and then designing the most suitable system.

---

## 📚 Table of Contents

- [3 Important Concepts](#-3-important-concepts)
  - [1. Abstraction](#1-abstraction)
  - [2. Uniqueness of Each System](#2-uniqueness-of-each-system)
  - [3. There Is No "One" Correct Solution](#3-there-is-no-one-correct-solution)
- [System Design Step-by-Step Process](#-system-design-step-by-step-process)
- [1. Functional Requirements](#1️⃣-functional-requirements)
- [2. Non-Functional Requirements](#2️⃣-non-functional-requirements)
- [3. Define APIs & Sequence of Events](#3️⃣-define-apis--sequence-of-events)
- [4. Design for Functional Requirements](#4️⃣-design-for-functional-requirements)
- [5. Address Non-Functional Requirements](#5️⃣-address-non-functional-requirements)
- [Banking vs Social Media](#-banking-vs-social-media)
- [System Design Mindset](#-system-design-mindset)
- [Golden Rules](#-golden-rules)
- [Complete System Design Flow](#-complete-system-design-flow)

---

# 🧠 3 Important Concepts

Before starting any system design problem, understand these three principles.

## 1. Abstraction

**Abstraction** means hiding unnecessary implementation details behind a simple interface or service contract.

It allows components to interact **without knowing how the underlying implementation works**.

### Example

An **Order Service** can call a **Payment Gateway** without knowing whether the payment is processed through Stripe, Razorpay, PayPal, or another provider.

```text
Order Service
      |
      | Payment API
      ↓
Payment Gateway
      |
      ├── Stripe
      ├── Razorpay
      └── PayPal
```

### Benefits of Abstraction

1. Less complexity
2. Loose coupling
3. Easy to change
4. Reusability
5. Easy maintenance
6. Better testing
7. Scalability

> **Key idea:** Abstraction reduces complexity and coupling, making software easier to maintain, test, change, and scale.

---

## 2. Uniqueness of Each System

Every system is different.

Each system has its own:

- Functional requirements
- Non-functional requirements
- Business rules
- Users
- Traffic patterns
- Data characteristics
- Security requirements
- Availability requirements
- Consistency requirements
- Cost constraints

Therefore:

> **A system should be designed according to its own requirements, not by blindly copying another system.**

### Example: Banking System

A banking system may require:

- Very high security
- Strong consistency
- Accurate transactions
- Audit logs
- Very low tolerance for data loss
- Transaction integrity

For example:

```text
Transfer ₹10,000

Account A: -₹10,000
Account B: +₹10,000
```

Both operations must be correctly handled.

### Example: Social Media System

A social-media system may require:

- Millions or billions of users
- Very high traffic
- High read volume
- Caching
- CDN
- Eventual consistency for some features
- High availability
- Feed generation
- Asynchronous processing

For some social-media features, seeing slightly stale data may be acceptable.

> **Different problems → Different constraints → Different designs**

---

## 3. There Is No "One" Correct Solution

There is no single universally correct solution to a system-design problem.

Multiple architectures can satisfy the same requirements.

For example:

```text
Option 1:
Monolith + SQL

Option 2:
Microservices + SQL

Option 3:
Microservices + NoSQL

Option 4:
Event-driven architecture
```

All can potentially work depending on:

- Scale
- Team size
- Budget
- Latency requirements
- Availability requirements
- Consistency requirements
- Operational complexity
- Future growth

Therefore:

> **System design is about trade-offs, not memorizing one architecture.**

> **There is no "one" correct solution — there is a suitable solution based on requirements and constraints.**

---

# 🚀 System Design Step-by-Step Process

The core process:

```text
1. Functional Requirements
          ↓
2. Non-Functional Requirements
          ↓
3. Define APIs + Sequence of Events
          ↓
4. Design for Functional Requirements
          ↓
5. Address Non-Functional Requirements
```

For interviews and real-world design, this can be expanded to:

```text
Requirements
     ↓
Functional Requirements
     ↓
Non-Functional Requirements
     ↓
Scale Estimation
     ↓
API Design
     ↓
Data Model
     ↓
High-Level Architecture
     ↓
Component Deep Dive
     ↓
Scalability
     ↓
Reliability
     ↓
Security
     ↓
Monitoring / Observability
     ↓
Bottlenecks & Trade-offs
```

---

# 1️⃣ Functional Requirements

## What are Functional Requirements?

Functional requirements describe the **features, actions, and business capabilities** that the system must provide to its users.

In simple words:

> **Functional Requirements = What should the system do?**

### Example: Image-Sharing Social Media Platform

The system should allow users to:

- Register / Login
- Upload images
- Create posts
- Follow / Unfollow users
- View feed
- Like posts
- Comment on posts
- Delete posts
- View profiles

```text
                    User
                      |
       ┌──────────────┼──────────────┐
       ↓              ↓              ↓
    Register       Upload         Create
     / Login       Image           Post
       ↓              ↓              ↓
   Follow/User     View Feed     Like / Comment
       ↓
   View Profile
       ↓
   Delete Post
```

These requirements describe **what the system can do**.

### Important

Functional requirements answer:

> **"What should the system do?"**

---

# 2️⃣ Non-Functional Requirements

## What are Non-Functional Requirements?

Non-functional requirements define the **quality attributes, operational constraints, and characteristics** of the system.

In simple words:

> **Non-Functional Requirements = How well should the system work?**

Common examples:

- Performance
- Scalability
- Availability
- Reliability
- Consistency
- Security
- Durability
- Maintainability
- Observability
- Cost

---

## Example NFRs

For our image-sharing platform:

```text
System should:

✓ Handle 10M users
✓ Respond within ~200 ms for important APIs
✓ Provide 99.99% availability
✓ Scale during traffic spikes
✓ Secure user data
✓ Prevent data loss
✓ Continue working if a server fails
```

These are not features.

They define **how well the system should operate**.

---

# 📊 Main NFR Categories

```text
                    Non-Functional
                          |
      ┌──────────┬────────┼────────┬──────────┐
      ↓          ↓        ↓        ↓          ↓
 Performance  Scalability Availability Reliability
      |           |           |          |
 Latency      Traffic      Uptime     Failure
 Throughput   Growth       SLA        Recovery
      |
      ↓
 Consistency
      |
      ↓
 Security
      |
      ↓
 Durability
      |
      ↓
 Maintainability
      |
      ↓
 Observability
      |
      ↓
 Cost
```

---

## 2.1 Performance

Performance describes how quickly and efficiently the system responds.

### Important Metrics

### Latency

How long a request takes.

```text
Request → System → Response

Latency = 150 ms
```

### Throughput

How many requests or operations the system can process per unit of time.

```text
10,000 requests / second
```

### Example

```text
API response time < 200 ms
```

---

## 2.2 Scalability

Scalability is the ability of a system to handle increasing load.

### Traffic Growth

```text
1M users
   ↓
10M users
   ↓
100M users
```

The system should continue functioning as traffic grows.

### Horizontal Scaling

Add more servers:

```text
              Load Balancer
             /      |      \
            ↓       ↓       ↓
         Server   Server   Server
```

### Vertical Scaling

Increase resources of an existing server:

```text
4 CPU / 8 GB RAM
        ↓
16 CPU / 64 GB RAM
```

---

## 2.3 Availability

Availability means the system remains accessible when users need it.

Example:

```text
99.99% Availability
```

The system should continue serving users even when individual components fail.

```text
Server A ❌
    |
    ↓
Load Balancer
    |
    ↓
Server B ✅
```

---

## 2.4 Reliability

Reliability means the system consistently performs correctly over time.

A reliable system should:

- Handle failures
- Recover from failures
- Avoid incorrect results
- Maintain data integrity

Example:

```text
Payment Request
      ↓
Payment Service
      ↓
Database
```

If something fails midway, the system should avoid charging the customer incorrectly or losing transaction state.

---

## 2.5 Consistency

Consistency determines whether users see the correct/latest state of data.

### Strong Consistency

After a successful write, subsequent reads immediately see the updated value.

Important for:

- Banking
- Payments
- Financial transactions

### Eventual Consistency

Data may temporarily differ between replicas but eventually becomes consistent.

Often acceptable for:

- Social-media feeds
- Likes/counts
- Analytics
- Recommendations

> **Consistency requirements depend on the business.**

---

## 2.6 Security

Security protects:

- User data
- Authentication credentials
- APIs
- Infrastructure
- Financial information

Common mechanisms:

- Authentication
- Authorization
- Encryption
- TLS/HTTPS
- Token-based security
- Rate limiting
- Input validation
- Secrets management

---

## 2.7 Durability

Durability means once data is successfully stored, it should not be lost.

Important for:

- Payments
- Banking
- User-generated content
- Orders
- Important business records

Common techniques:

- Replication
- Backups
- Durable storage
- Disaster recovery

---

## 2.8 Maintainability

Maintainability describes how easily the system can be:

- Changed
- Debugged
- Tested
- Extended
- Upgraded

Good abstraction and loose coupling improve maintainability.

---

## 2.9 Observability

Observability helps us understand what is happening inside the system.

### Three Pillars

```text
Observability
   ├── Logs
   ├── Metrics
   └── Traces
```

Example:

```text
API latency suddenly increases
        ↓
Metrics detect problem
        ↓
Logs show error
        ↓
Trace identifies slow service
        ↓
Engineer fixes bottleneck
```

---

## 2.10 Cost

A technically excellent architecture may still be a bad design if it is unnecessarily expensive.

Consider:

- Compute cost
- Database cost
- Storage cost
- Network cost
- CDN cost
- Operational cost
- Engineering complexity

> **Design for the required scale, not imaginary scale.**

---

# 🏦 Banking vs 📱 Social Media

Understanding the uniqueness of systems is important.

| Requirement | Banking | Social Media |
|---|---|---|
| Security | Extremely high | High |
| Consistency | Usually strong | Eventual consistency may be acceptable |
| Data loss | Very low tolerance | Depends on data |
| Audit logs | Critical | Important |
| Traffic | High | Extremely high |
| Caching | Selective | Very important |
| CDN | Less central | Very important |
| Availability | Critical | Critical |
| Transactions | Must be accurate | Less transaction-heavy |

This demonstrates why we **cannot simply copy one system's architecture into another system**.

---

# 3️⃣ Define APIs & Sequence of Events

Once requirements are clear, define how components and users interact with the system.

## API Design

Example:

```http
POST /api/v1/users
POST /api/v1/login

POST /api/v1/posts
GET  /api/v1/feed

POST /api/v1/posts/{id}/like
POST /api/v1/posts/{id}/comments

POST /api/v1/users/{id}/follow
DELETE /api/v1/users/{id}/follow

GET /api/v1/users/{id}
DELETE /api/v1/posts/{id}
```

The exact API depends on the functional requirements.

---

## 🔄 Sequence of Events

### Example: Upload Image

```text
User
  |
  | 1. Request upload
  ↓
API Server
  |
  | 2. Generate upload URL
  ↓
Object Storage
  |
  | 3. Upload image
  ↓
Object Storage
  |
  | 4. Return success
  ↓
API Server
  |
  | 5. Save metadata
  ↓
Database
```

For large systems, heavy operations can be asynchronous:

```text
User
 ↓
API
 ↓
Queue
 ↓
Worker
 ↓
Image Processing
 ↓
Object Storage
```

---

# 4️⃣ Design for Functional Requirements

Now convert the functional requirements into actual system components.

### Example: Image-Sharing Platform

```text
                    Users
                      |
                      ↓
                 CDN / DNS
                      |
                      ↓
                Load Balancer
                      |
                      ↓
                API Gateway
                      |
          ┌───────────┼───────────┐
          ↓           ↓           ↓
       User        Post        Feed
      Service     Service     Service
          |           |           |
          ↓           ↓           ↓
       Database    Database     Cache
                      |
                      ↓
                 Message Queue
                      |
                      ↓
                   Workers
                      |
                      ↓
                Object Storage
```

### Possible Technologies

| Component | Examples |
|---|---|
| CDN | Cloud CDN, CloudFront |
| Load Balancer | Cloud/AWS Load Balancer |
| Cache | Redis |
| Database | PostgreSQL, MySQL, MongoDB |
| Queue | Kafka, Pub/Sub, SQS |
| Object Storage | S3, GCS |

> **Technology selection comes after requirements, not before them.**

---

# 5️⃣ Address Non-Functional Requirements

After the functional architecture is ready, optimize it for the required NFRs.

## Performance

Use:

- Caching
- CDN
- Database indexing
- Efficient queries
- Connection pooling
- Async processing

```text
User
 ↓
CDN / Cache
 ↓
API
 ↓
Database
```

---

## Scalability

Use:

- Horizontal scaling
- Load balancing
- Stateless services
- Database replication
- Partitioning / Sharding
- Queues
- Caching

```text
                 Load Balancer
               /       |       \
              ↓        ↓        ↓
           Server    Server    Server
```

---

## Availability

Use:

- Multiple instances
- Multiple availability zones
- Health checks
- Failover
- Replication
- Auto-scaling

```text
           Load Balancer
          /             \
       Zone A          Zone B
       Server          Server
          \             /
           \           /
             Database
             Replica
```

---

## Reliability

Use:

- Retries
- Timeouts
- Circuit breakers
- Idempotency
- Replication
- Disaster recovery
- Graceful degradation

---

## Security

```text
Authentication
      ↓
Authorization
      ↓
Rate Limiting
      ↓
Input Validation
      ↓
Encryption
      ↓
Secure Storage
```

---

## Durability

Use:

- Replication
- Backups
- Multi-region storage where required
- Durable object storage
- Recovery mechanisms

---

## Observability

Monitor:

```text
Logs
Metrics
Traces
Alerts
Dashboards
```

Important metrics:

- Request latency
- Error rate
- CPU / Memory
- Throughput
- Queue depth
- Database latency
- Cache hit ratio
- Availability

---

# 🎯 System Design Mindset

Do not start with:

> "Should I use MongoDB or PostgreSQL?"

Start with:

```text
What are the requirements?
        ↓
What is the scale?
        ↓
What are the constraints?
        ↓
What are the bottlenecks?
        ↓
What architecture solves them?
        ↓
What trade-offs are introduced?
```

### Core Formula

> **Requirements → Constraints → Bottlenecks → Solution → Trade-offs**

---

# ⭐ Golden Rules

### Rule 1 — Understand Before Designing

Don't jump directly to architecture.

### Rule 2 — Every System Is Unique

Don't blindly copy another system.

### Rule 3 — No Single Correct Architecture

Choose based on requirements and trade-offs.

### Rule 4 — Functional First, NFR Next

First understand **what the system does**, then determine **how well it must do it**.

### Rule 5 — Don't Over-Engineer

Design for realistic requirements and expected growth.

### Rule 6 — Every Decision Has a Trade-off

```text
Strong Consistency
      ↕
Performance / Availability

More Replicas
      ↕
Higher Cost

Microservices
      ↕
More Operational Complexity
```

---

# 🧩 Complete System Design Flow

```text
                 SYSTEM DESIGN
                      |
                      ↓
          ┌─────────────────────┐
          │  3 Core Principles  │
          └─────────────────────┘
             ↓       ↓       ↓
       Abstraction  Unique   No One
                    System   Correct Solution
                              |
                              ↓
                  Functional Requirements
                              ↓
               Non-Functional Requirements
                              ↓
                     Scale Estimation
                              ↓
                   API + Event Sequence
                              ↓
                  Functional Architecture
                              ↓
                Address NFR Requirements
                              ↓
                     Deep Dive
                              ↓
                    Bottlenecks
                              ↓
                     Trade-offs
                              ↓
                   Final Architecture
```

---

# 📌 Interview Checklist

When asked to design a system, walk through these questions:

- [ ] What are the functional requirements?
- [ ] What are the non-functional requirements?
- [ ] How many users?
- [ ] How much traffic?
- [ ] What is the read/write ratio?
- [ ] What latency is required?
- [ ] What availability is required?
- [ ] What consistency model is required?
- [ ] What data needs to be stored?
- [ ] What APIs are required?
- [ ] What is the request/response flow?
- [ ] Where will caching help?
- [ ] Where will a CDN help?
- [ ] Do we need a message queue?
- [ ] How will the system scale?
- [ ] What happens when a component fails?
- [ ] How will data be replicated?
- [ ] How will the system be secured?
- [ ] How will we monitor it?
- [ ] What are the major bottlenecks?
- [ ] What trade-offs are we making?
- [ ] What can be improved in the future?

---

# 🚀 Key Takeaway

> **Good System Design = Correct Requirements + Appropriate Architecture + Explicit Trade-offs**

System design is not about drawing the biggest architecture.

It is about choosing the **simplest architecture that satisfies the required functionality, scale, reliability, security, performance, and business constraints.**
