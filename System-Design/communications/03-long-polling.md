# Long Polling

## What is it?

Long polling is an HTTP technique where the **client sends a request and the server keeps it open until new data is available or a timeout occurs**. fileciteturn13file0L11-L18

```text
Client -> Server: Any update?
             [wait...]
             [wait...]
Server -> Client: Here is the update
Client -> Server: Any update?
```

## Easy Example

Think of asking a friend:

> "Reply when you have something to tell me."

You don't repeatedly ask. You wait for the reply.

## Flow

1. Client sends request.
2. Server does not immediately respond.
3. Server waits for new data or timeout.
4. Server sends response.
5. Client immediately opens a new request.
6. Cycle continues. fileciteturn13file0L28-L36

## Why Better Than Short Polling?

Short polling:

```text
Request -> No data -> Response
Request -> No data -> Response
Request -> No data -> Response
```

Long polling:

```text
Request -> WAIT -> Data available -> Response
Request -> WAIT -> Data available -> Response
```

So it reduces unnecessary responses and gets closer to real-time. fileciteturn13file0L44-L54

## Advantages

- More efficient than short polling.
- Near real-time delivery when data becomes available.
- Uses standard HTTP.
- No WebSocket-specific protocol is required. fileciteturn13file0L49-L54

## Disadvantages

- Open requests consume server resources.
- Harder to scale with many clients.
- Requires timeout handling.
- After each response, another request must be created. fileciteturn13file0L55-L64

## Example Implementation Idea

```javascript
app.get('/getData', (req, res) => {
  if (dataChanged(req.query.lastData)) {
    return res.json({ data });
  }

  // Keep request open until data changes.
  waitingClients.push(res);
});
```

The course demo keeps waiting client responses and completes them when data is updated. fileciteturn13file0L111-L129

## When to Use

Useful when:

- You need near-real-time updates.
- WebSockets are unavailable or unnecessary.
- Standard HTTP infrastructure is preferred.

Examples: older chat systems, notifications, basic collaborative sync.

## Interview Comparison

| | Short Polling | Long Polling |
|---|---|---|
| Request | Repeated at interval | Held open |
| Empty responses | Common | Reduced |
| Latency | Depends on interval | Lower |
| Server resources | Many requests | Open connections |
| Complexity | Low | Medium |

## Interview Answer

> **Long polling improves on short polling by keeping an HTTP request open until data is available or a timeout occurs. It reduces unnecessary requests, but open connections consume resources and it still requires a new request after every response.**

## Remember

**Long Polling = Client asks once, server waits, then responds.**
