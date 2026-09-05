# Short Polling

## What is it?

Short polling means the **client repeatedly asks the server for new data at a fixed interval**.

```text
Client -> Server: Any update?
Server -> Client: No

(wait 5 sec)

Client -> Server: Any update?
Server -> Client: Yes
```

The course describes intervals such as 2, 5 or 10 seconds. fileciteturn10file5L140-L148

## Easy Example

Imagine checking an order every 5 seconds:

```text
GET /orders/123/status
GET /orders/123/status
GET /orders/123/status
```

Even when the order has not changed, the request still happens.

## Flow

1. Client sends request.
2. Server immediately returns current data.
3. Client waits for a fixed interval.
4. Client sends another request.
5. Repeat.

This is the flow shown in the course. fileciteturn10file4L97-L102

## Advantages

- Very simple.
- Easy to implement with normal HTTP/fetch/axios.
- Works almost everywhere.
- Good for small applications where real-time speed is not critical. fileciteturn10file4L110-L119

## Disadvantages

- **Wasted requests:** many requests may return unchanged data.
- **Higher server load:** frequent polling creates unnecessary traffic.
- **Not truly real-time:** update waits until the next poll.
- Poor choice when many users poll frequently. fileciteturn10file4L120-L128

## Example

```javascript
setInterval(async () => {
  const response = await fetch('/api/order/123/status');
  const data = await response.json();
  updateUI(data);
}, 5000);
```

## When to Use

Use short polling when:

- Updates are not frequent.
- A few seconds of delay is acceptable.
- Simplicity matters more than efficiency.

Examples: simple dashboards, periodic status checks, low-frequency notifications.

## When NOT to Use

Avoid it for high-scale real-time systems such as chat or live trading. Repeated requests can create significant unnecessary load.

## Interview Answer

> **Short polling is a client-driven technique where the client repeatedly sends HTTP requests at fixed intervals to check for updates. It is simple and widely compatible, but it wastes requests and increases server load when updates are infrequent.**

## Remember

**Short Polling = Client keeps asking.**
