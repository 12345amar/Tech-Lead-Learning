# 🟡 Medium System Design — Interview Practice

These designs combine multiple distributed-system concepts. Focus on **data flow, asynchronous processing, consistency, scaling, and failure handling**.

---

## 1. WhatsApp / Chat System

### Architecture
```text
User
 ↓
Load Balancer
 ↓
Chat Gateway
 ↓
Chat Service ──→ Message Database
 ↓
Connection Manager
 ↓
WebSocket Connections

Chat Service → Message Queue → Notification Service
```

### Flow
1. User establishes a persistent WebSocket connection.
2. Message goes to the chat service.
3. Message is stored durably.
4. If the receiver is online, deliver immediately.
5. If offline, keep the message and trigger a push notification.
6. Delivery and read states are updated asynchronously.

### Hard Problems
- Maintaining millions of connections
- Ordering messages per conversation
- Duplicate delivery
- Offline users
- Message synchronization after reconnect
- Presence status

### Interview Point
Do not make message delivery depend only on memory. **Persist first, then deliver**, when durability is important.

---

## 2. Twitter/X Feed

### Architecture
```text
User → API → Post Service → Database
                  ↓
              Event Stream
                  ↓
        Feed Generation Service
             ↙          ↘
      User Timeline    Cache

Read Feed → Feed Service → Cache → Database
```

### Two Main Strategies
**Fan-out on write:** when a user posts, distribute the post to followers' feeds. Fast reads, but expensive for users with millions of followers.

**Fan-out on read:** create the feed when a user opens it. Cheaper writes, but potentially slower reads.

A large system commonly uses a **hybrid approach**: normal users use fan-out on write, while celebrity accounts are merged during reads.

### Interview Follow-ups
- How do you handle a user with 50 million followers?
- How do you rank posts?
- How do you invalidate feed cache?
- How do you handle duplicate events?

---

## 3. Instagram

### Architecture
```text
Client
 ↓
API Gateway
 ├── User Service
 ├── Post Service
 ├── Feed Service
 └── Social Graph Service
        ↓
   Message Queue
        ↓
 Image Processing Workers
        ↓
 Object Storage → Content Delivery Network

Metadata → Database
Hot Data → Cache
```

### Upload Flow
Client uploads image directly to object storage using a temporary signed URL. A background worker creates thumbnails and different resolutions. Metadata is stored separately.

### Feed Flow
Feed service retrieves post identifiers, user information, and cached metadata. Content Delivery Network serves images close to the user.

### Interview Point
Separate **large media storage** from **metadata storage**.

---

## 4. YouTube

### Architecture
```text
Uploader
  ↓
Upload Service
  ↓
Object Storage
  ↓
Message Queue
  ↓
Video Processing Workers
  ├── Transcoding
  ├── Thumbnail Generation
  └── Metadata Extraction
  ↓
Multiple Video Qualities
  ↓
Content Delivery Network
  ↓
Viewer
```

### Key Idea
Never process large videos synchronously inside the request. Upload quickly, then process asynchronously.

### Important Problems
- Large file uploads
- Resumable uploads
- Video transcoding
- Storage cost
- Global delivery
- Popular video traffic spikes

---

## 5. Netflix

### Architecture
```text
User
 ↓
DNS / Content Delivery Network
 ↓
API Gateway
 ↓
Application Services
 ├── Catalog
 ├── User Profile
 ├── Recommendation
 └── Playback

Video Files → Object Storage → Content Delivery Network

Events → Message Queue → Analytics / Recommendation
```

### Key Idea
Separate **control plane** from **media delivery**.

Control plane handles login, catalog, recommendations, and playback authorization. Content Delivery Network handles the heavy video traffic.

### Interview Point
Video traffic should not flow through normal application servers.

---

## 6. Notification System

### Architecture
```text
Application Services
        ↓
 Notification API
        ↓
   Message Queue
     /    |    \
 Email   SMS   Push
 Worker  Worker  Worker
     \     |     /
       Providers
```

### Why Queue?
Sending notifications can be slow and external providers can fail. The user request should not wait for every notification.

### Important Concepts
- Retry with exponential backoff
- Dead-letter queue
- User preferences
- Rate limits
- Deduplication
- Delivery status

---

## 7. Search Autocomplete

### Architecture
```text
User types
   ↓
API Gateway
   ↓
Autocomplete Service
   ↓
Cache
   ↓
Prefix Index / Search Engine
```

### Key Idea
Autocomplete is latency-sensitive. Frequently requested prefixes should be cached.

Example:

```text
"ama" → amazon, amazing, amaranth...
```

### Data Structure
A **Trie (prefix tree)** is useful when prefix lookup is the main requirement. A search engine can be better when ranking, fuzzy matching, and large-scale text search are needed.

---

## 8. Web Crawler

### Architecture
```text
Seed URLs
   ↓
URL Frontier / Queue
   ↓
Crawler Workers
   ↓
Fetch Web Pages
   ↓
Parser
   ├── Extract Content
   └── Extract Links
          ↓
      Deduplication
          ↓
     URL Frontier
```

### Important Problems
- Avoid crawling the same URL repeatedly
- Respect robots exclusion rules
- Control crawling rate per domain
- Handle failures and retries
- Store fetched content efficiently
- Prioritize important URLs

### Interview Point
The URL frontier and deduplication mechanism are usually more interesting than the HTTP request itself.

---

## 9. Ride Sharing

### Architecture
```text
Rider App ──→ Ride Service
                 ↓
          Location Service
                 ↓
         Geo-Spatial Index
                 ↓
          Driver Matching
                 ↓
       Driver App / WebSocket

Ride Events → Message Queue → Pricing / Analytics / Notifications
```

### Critical Requirement
Location data changes frequently. Use a specialized geo-spatial indexing approach rather than repeatedly scanning every driver.

### Flow
1. Rider requests a ride.
2. Find nearby available drivers.
3. Rank drivers by distance and other constraints.
4. Reserve one driver atomically.
5. Track the ride through real-time location updates.

### Hard Problem
Two riders must not successfully reserve the same driver.

---

## 10. Food Delivery

### Architecture
```text
Customer
   ↓
Order Service
   ├── Restaurant Service
   ├── Payment Service
   └── Delivery Service
          ↓
     Driver Matching
          ↓
      Driver App

Order Events → Message Queue → Notifications / Analytics
```

### Important State Machine
```text
Created
  ↓
Payment Confirmed
  ↓
Restaurant Accepted
  ↓
Preparing
  ↓
Picked Up
  ↓
Out for Delivery
  ↓
Delivered
```

Use a clear state transition model and idempotent operations so retries do not create duplicate orders or payments.

---

# 🧠 Medium-Level Memory Map

```text
Chat       → WebSocket + Message Store + Offline Delivery
Feed       → Fan-out + Ranking + Cache
Instagram  → Media Storage + Processing + Content Delivery Network
YouTube    → Upload + Transcoding + Content Delivery Network
Netflix    → Media Delivery + Recommendation + Global Caching
Notify     → Queue + Workers + Retry
Search     → Prefix Index + Cache
Crawler    → Queue + Workers + Deduplication
Ride       → Geo Index + Real-Time Location + Matching
Food       → Order State Machine + Events + Delivery Matching
```

> **Interview goal:** identify the most difficult requirement first, then design around that bottleneck.