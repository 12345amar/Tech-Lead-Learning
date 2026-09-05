# Communication Techniques

Short, practical and interview-focused notes for real-time communication patterns.

## Notes

1. [Communication Overview](./01-communication-overview.md)
2. [Short Polling](./02-short-polling.md)
3. [Long Polling](./03-long-polling.md)
4. [WebSockets](./04-websockets.md)
5. [SSE](./05-sse.md)
6. [Webhooks](./06-webhooks.md)

## Quick Decision Guide

```text
Need to get updates?
        |
        +-- Simple / low frequency -> Short Polling
        |
        +-- Need HTTP + wait for update -> Long Polling
        |
        +-- Server -> Browser only -> SSE
        |
        +-- Browser <-> Server, real-time -> WebSocket
        |
        +-- External system -> Your backend -> Webhook
```

## One-Line Mental Model

| Technique | Think of it as |
|---|---|
| Short Polling | "Are we there yet?" |
| Long Polling | "Tell me when you're ready." |
| WebSocket | Phone call always ON |
| SSE | Live TV/news feed |
| Webhook | "Call me when it happens." |

## Interview Rule

Don't choose a communication technique just because it is "real-time". Choose based on **direction, latency, connection lifetime, scale, browser support, and whether the event is client-facing or server-to-server**.
