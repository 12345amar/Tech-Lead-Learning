# Webhooks

## What is a Webhook?

A webhook is an **event-driven HTTP callback** where one system automatically sends data to another system when an event occurs. fileciteturn11file6L373-L386

### Easy Analogy

You give the restaurant your phone number:

> "Don't make me keep asking. Call me when my order is ready."

That is a webhook.

## Flow

```text
External System
      |
      | POST /webhook
      v
Your Backend
      |
      v
Process Event
```

Typical flow:

1. Receiver exposes a callback URL.
2. Sender stores the URL.
3. An event occurs.
4. Sender sends an HTTP POST.
5. Receiver processes the event. fileciteturn11file6L379-L384

## Real Example: Payment

```text
Customer pays
     |
     v
Stripe
     |
     | POST /webhook
     v
Payment Service
     |
     v
Mark order as PAID
```

Instead of repeatedly asking Stripe whether payment succeeded, Stripe can notify your backend when the event happens.

## Typical Payload

```json
{
  "event": "payment.success",
  "data": {
    "amount": 1000,
    "orderId": "ORD-123"
  }
}
```

Webhooks are commonly JSON + HTTP POST. fileciteturn11file6L398-L418

## Key Characteristics

- Event-driven.
- Usually HTTP POST.
- Near real-time.
- No persistent connection required.
- Decouples systems. fileciteturn11file6L419-L434

## Webhook vs Polling

| | Webhook | Polling |
|---|---|---|
| Model | Push | Pull |
| Trigger | Event | Timer |
| Latency | Low | Higher |
| Unnecessary requests | No | Yes |
| Connection | Short-lived | Repeated |

## Webhook vs SSE

| | Webhook | SSE |
|---|---|---|
| Direction | Server -> Server | Server -> Browser |
| Connection | Short-lived | Long-lived |
| Main use | Backend events | UI updates |

The course makes this distinction explicitly. fileciteturn11file6L424-L434

## Security — VERY IMPORTANT

### 1. Verify Signature

Sender signs the payload with a secret; receiver verifies the signature before processing it.

```text
Payload + Secret
       |
       v
   Signature
       |
       v
Receiver verifies
```

### 2. HTTPS

Always expose webhook endpoints over HTTPS.

### 3. Optional IP Allowlisting

For providers that support stable source IPs, restrict requests to trusted ranges when appropriate.

The course highlights signature verification, HTTPS and optional IP whitelisting. fileciteturn9file4L86-L99

## Retry + Idempotency — Interview Critical

Webhook delivery can fail. A sender may retry when it does not receive a successful response, commonly using exponential backoff. fileciteturn9file4L100-L107

**Important:** the same event can be delivered more than once.

So make the handler **idempotent**:

```javascript
if (await alreadyProcessed(event.id)) {
  return res.sendStatus(200);
}

await processEvent(event);
await markProcessed(event.id);
res.sendStatus(200);
```

## Production Challenges

- Duplicate events.
- Retries and failures.
- Signature validation.
- No guaranteed delivery order.
- Network downtime.
- Public endpoint exposure.
- Payload versioning. fileciteturn9file4L112-L120

## Common Use Cases

- Payment notifications.
- GitHub push/PR events.
- CI/CD triggers.
- Email delivery updates.
- Slack events. fileciteturn9file4L122-L127

## Interview Answer

> **A webhook is an event-driven server-to-server callback. Instead of polling an external system, we expose an endpoint and let the external system POST to it when an event occurs. In production, I would validate the signature, use HTTPS, handle retries, and make the event processing idempotent because duplicate delivery is possible.**

## Remember

**Webhook = Don't ask repeatedly; the other system calls you when something happens.**
