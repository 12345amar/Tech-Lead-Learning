# WebSockets

## What is it?

WebSocket provides a **persistent, full-duplex (two-way) connection** between client and server. Once connected, both sides can send data at any time without creating new HTTP requests.

### Easy Analogy

**Phone call:** connect once, then both people can talk whenever they want.

```text
Client <====================> Server
             open connection
```

## How Connection Starts

WebSocket starts with an HTTP request and asks the server to upgrade the connection. The server responds with `101 Switching Protocols`.

```text
Client -- HTTP Upgrade --> Server
Client <-- 101 Switching Protocols -- Server

Client <==== WebSocket ====> Server
```

After the upgrade, it becomes a persistent WebSocket connection.

## Why WebSocket?

Normal HTTP:

```text
Request -> Response -> Done
Request -> Response -> Done
```

WebSocket:

```text
Connect once
   |
   +---- Client -> Server
   +---- Server -> Client
   +---- Client -> Server
   +---- Server -> Client
```

No repeated HTTP requests are required.

## Key Properties

- Persistent connection.
- Full-duplex / bidirectional.
- Low latency.
- Real-time communication.
- Both sides can send messages independently.

## Example: Chat

```text
User A --message--> Server --message--> User B
User B --message--> Server --message--> User A
```

Typical use cases:

- Chat applications.
- Multiplayer games.
- Live trading.
- Highly interactive dashboards.
- Real-time notifications.

## Simple Node.js Idea

```javascript
io.on('connection', (socket) => {
  socket.on('chat-message', (msg) => {
    io.emit('chat-message', msg);
  });
});
```

## Challenges at Scale

WebSockets are powerful, but production systems need to handle:

- Reconnection.
- Authentication.
- Message ordering/reliability.
- Connection limits.
- Horizontal scaling across multiple servers.
- Sticky sessions or shared state/pub-sub when needed.
- Disconnect cleanup and memory leaks.

## WebSocket vs Polling

| | Short Polling | Long Polling | WebSocket |
|---|---|---|---|
| Connection | Repeated | Held then reconnect | Persistent |
| Direction | Client -> Server | Client -> Server | Both |
| Real-time | No | Almost | Yes |
| Requests | Many | Fewer | No repeated requests |
| Complexity | Low | Medium | Higher |

## Interview Answer

> **WebSocket is a persistent, bidirectional communication protocol. It starts with an HTTP upgrade handshake and then maintains an open connection, allowing client and server to exchange messages at any time. I would use it for applications such as chat, multiplayer gaming, or live trading where low-latency two-way communication is required.**

## Remember

**WebSocket = One connection + both sides can talk anytime.**
