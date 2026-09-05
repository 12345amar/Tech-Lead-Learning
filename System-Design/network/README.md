# 🌐 Network — System Design Interview Notes

Short, practical notes extracted from the completed course PDFs. Each topic is kept as a separate note so it can be reviewed independently.

## Notes

1. [How the Web Works](./01-how-web-works.md)
2. [Communication Protocols](./02-communication-protocols.md)
3. [REST APIs](./03-rest-apis.md)
4. [GraphQL](./04-graphql.md)
5. [gRPC](./05-grpc.md)

## Core Interview Mental Model

```text
Browser / Client
      ↓
DNS
      ↓
HTTP / HTTPS
      ↓
Router / ISP / Internet
      ↓
Server / API
      ↓
REST / GraphQL / gRPC
      ↓
Data / Services
```

### Choose the communication style

```text
Browser / Public API      → REST / GraphQL
Internal microservices    → gRPC
Real-time bidirectional   → WebSocket
Reliable transport        → TCP
Low-latency transport     → UDP
Web security              → HTTPS
```

> **Interview rule:** don't choose a protocol because it is “faster”. Choose it from the communication pattern, client constraints, data shape, reliability needs, latency requirements, and operational complexity.
