# SSE (Server-Sent Events)

## What is SSE?

SSE is a **one-way, server-to-client streaming mechanism** where the server pushes real-time updates over a single long-lived HTTP connection. fileciteturn11file0L10-L20

```text
Client ---- connect ----> Server
Client <--- event ------- Server
Client <--- event ------- Server
Client <--- event ------- Server
```

### Easy Analogy

Imagine a live TV/news screen. You watch; the broadcaster keeps sending updates.

## How It Works

1. Browser creates an `EventSource` connection.
2. Server responds with `Content-Type: text/event-stream`.
3. Connection stays open.
4. Server continuously writes events.
5. Browser receives events automatically. fileciteturn11file5L258-L278

## Client

```javascript
const source = new EventSource('/sse');

source.onmessage = (event) => {
  console.log(event.data);
};
```

## Server

```javascript
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write(`data: Connected\n\n`);
});
```

The SSE message format must end with a blank line (`\n\n`) so the browser emits the event. fileciteturn11file5L269-L278

## Important Event Fields

```text
id: 1
 event: update
data: Hello

```

- `data` → payload.
- `event` → custom event name.
- `id` → event ID for reconnection/resume.
- `retry` → reconnection delay. fileciteturn11file5L308-L321

## Key Advantage

SSE uses standard HTTP and has built-in browser reconnection behavior, making it simpler than WebSocket when communication is only **server → client**. fileciteturn11file5L322-L326

## Use Cases

- Live dashboards.
- Notifications.
- News feeds.
- Logs streaming.
- AI streaming responses.
- Low-frequency stock updates. fileciteturn11file5L352-L361

## Limitations

- One-way only.
- Text-based data.
- Not ideal for high-frequency real-time systems.
- Long-lived connections complicate scaling/load balancing.
- Browser connection limits can matter. fileciteturn11file5L327-L345

## SSE vs WebSocket

| | SSE | WebSocket |
|---|---|---|
| Direction | Server -> Client | Both ways |
| Transport | HTTP | WebSocket |
| Connection | Long-lived | Long-lived |
| Complexity | Lower | Higher |
| Great for | Feeds/notifications | Chat/games |

## Interview Answer

> **SSE is a server-to-client streaming technique over a long-lived HTTP connection. I would choose it when the browser mainly needs continuous updates from the server, such as dashboards, notifications, logs or AI response streaming. If both sides need real-time communication, I would prefer WebSocket.**

## Remember

**SSE = Server continuously sends events to the client.**
