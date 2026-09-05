# Communication Techniques — Overview

Communication techniques define **how two systems exchange data**, especially when the client needs fresh or real-time updates.

## Restaurant Mental Model

- **Short Polling** → You keep asking the kitchen: "Is my order ready?"
- **Long Polling** → You ask once: "Tell me when it is ready." Then wait.
- **WebSocket** → You have a phone/walkie-talkie connection with the kitchen.
- **SSE** → You watch a live display board; the kitchen pushes updates.
- **Webhook** → You give the kitchen your number: "Call me when it is ready."

## 1. Short Polling

Client sends requests at fixed intervals.

```text
Client -> Server: Any update?
Client -> Server: Any update?
Client -> Server: Any update?
```

Simple, but many responses may say nothing changed.

**Use:** simple apps, low-frequency status checks.

## 2. Long Polling

Client sends one request and the server keeps it open until data is available or timeout occurs. After the response, the client sends another request.

```text
Client -> Server: Any update?
             [wait]
Server -> Client: Here is the update
Client -> Server: Any update?
```

More efficient than short polling, but still request/response based.

## 3. WebSocket

Persistent **full-duplex** connection. Both client and server can send data at any time.

```text
Client <================> Server
          one connection
```

**Use:** chat, multiplayer games, live trading, highly interactive apps.

## 4. SSE (Server-Sent Events)

Persistent HTTP connection where the server continuously pushes text events to the browser.

```text
Client ----connect----> Server
Client <---event------- Server
Client <---event------- Server
```

**Use:** dashboards, notifications, news feeds, logs, AI streaming.

## 5. Webhook

An external system calls your endpoint when an event happens.

```text
Stripe -> POST /webhook -> Your Backend
```

**Use:** payments, GitHub events, email delivery updates, CI/CD triggers.

## Quick Comparison

| Technique | Connection | Direction | Real-time | Typical Use |
|---|---|---|---|---|
| Short Polling | Repeated | Client -> Server | No | Simple status checks |
| Long Polling | Held, then reconnect | Client -> Server | Almost | Legacy/basic real-time |
| WebSocket | Persistent | Both | Yes | Chat/games/trading |
| SSE | Persistent | Server -> Client | Yes | Feeds/dashboards |
| Webhook | No persistent connection | Server -> Server | Near real-time | External events |

## Interview Decision

**Browser needs updates from server only?** → SSE.

**Browser and server both need to communicate continuously?** → WebSocket.

**External service needs to notify your backend?** → Webhook.

**Simple periodic check is enough?** → Short polling.

**Need an HTTP-based wait-for-update mechanism?** → Long polling.

## Key Interview Point

WebSocket and SSE are for **client/server real-time communication**. Webhooks are mainly **server-to-server event notifications**. Polling is **client-driven**.
