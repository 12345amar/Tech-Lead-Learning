# WebSockets

## What is it?

WebSocket provides a **persistent, full-duplex (two-way) connection** between client and server. Once connected, both sides can send data at any time without creating new HTTP requests. fileciteturn10file8L309-L318

### Easy Analogy

**Phone call:** connect once, then both people can talk whenever they want.

```text
Client <====================> Server
             open connection
```

## How Connection Starts

WebSocket starts with an HTTP request and asks the server to upgrade the connection. The server responds with `101 Switching Protocols`. fileciteturn11file4L194-L207

```text
Client -- HTTP Upgrade --> Server
Client <-- 101 Switching Protocols -- Server

Client <==== WebSocket ====> Server
```

After the upgrade, it becomes a persistent WebSocket connection. fileciteturn11file4L208-L216

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
- Both sides can send messages independently. fileciteturn10file6L190-L194

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
- Real-time notifications. fileciteturn13file1L204-L208

## Simple Node.js Idea

```javascript
io.on('connection', (socket) => {
  socket.on('chat-message', (msg) => {
    io.emit('chat-message', msg);
  });
});
```

The course uses Socket.IO to demonstrate connection, message events and disconnect handling. fileciteturn10file7L271-L297

## Challenges at Scale

WebSockets are powerful, but production systems need to handle:

- Reconnection.
- Authentication.
- Message ordering/reliability.
- Connection limits.
- Horizontal scaling across multiple servers.
- Sticky sessions or shared state/pub-sub when needed.
- Disconnect cleanup and memory leaks. fileciteturn11file4L227-L238

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
