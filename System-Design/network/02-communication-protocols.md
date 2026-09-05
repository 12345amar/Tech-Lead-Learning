# Communication Protocols

> **Mental model:** Application protocols define how applications communicate; transport protocols define how data is delivered between devices. The course groups HTTP/HTTPS/WebSocket/SMTP/FTP at the application layer and TCP/UDP at the transport layer. fileciteturn2file3L1214-L1231

## 1. HTTP

HTTP is the web's request → response protocol. The client initiates; the server responds. It is stateless, and state can be maintained with cookies, sessions, or tokens. Default port: **80**. fileciteturn2file3L1235-L1259

```text
Client ── HTTP Request ──> Server
Client <─ HTTP Response ── Server
```

**Example:** Browser requests `/users/10`; server returns JSON.

## 2. HTTPS

HTTPS = HTTP + TLS security. A TLS handshake establishes an encrypted connection, protecting data such as credentials and payment information from interception/modification. Default port: **443**. fileciteturn2file3L1286-L1302

**Interview line:** “Use HTTPS for HTTP communication that needs confidentiality and integrity in transit.”

## 3. HTTP/3 + QUIC

HTTP/1.1 and HTTP/2 use TCP; HTTP/3 uses **QUIC over UDP**. The course highlights faster connection setup, lower latency, and independent streams that reduce delays from packet loss. fileciteturn2file3L1265-L1281

```text
HTTP/1.1, HTTP/2 → TCP
HTTP/3           → QUIC → UDP
```

## 4. WebSocket

WebSocket provides **persistent, bidirectional, low-latency** communication. It begins as an HTTP request and upgrades via the HTTP Upgrade mechanism; after that, both sides can send data at any time. fileciteturn2file3L1303-L1314

**Good for:** chat, live notifications, multiplayer games, real-time dashboards, stock updates. fileciteturn2file3L1317-L1322

### WebSocket vs normal HTTP

```text
HTTP:       Request → Response → done
WebSocket:  Connect → connection stays open ↔ messages
```

## 5. SMTP

SMTP is used to **send/forward email**. It does not retrieve email; the course notes IMAP/POP3 for receiving. Common SMTP ports: **25, 465, 587**. fileciteturn2file3L1323-L1337

```text
Email Client → SMTP Server → Recipient Mail Server
```

## 6. FTP

FTP transfers files between client and server. It uses separate **control** and **data** channels and traditionally runs on port **21**. Plain FTP is not encrypted; the course points to FTPS/SFTP as more secure alternatives. fileciteturn2file3L1338-L1352

## 7. TCP

TCP is **connection-oriented and reliable**. It provides ordered delivery, error detection, and retransmission of lost packets. The course lists HTTP, HTTPS, SMTP and FTP as protocols relying on TCP. fileciteturn2file3L1364-L1378

### Three-way handshake

```text
Client                  Server
  | ---- SYN ----------> |
  | <--- SYN + ACK ----- |
  | ---- ACK ----------> |
  |   Connection ready   |
```

fileciteturn2file3L1379-L1393

## 8. UDP

UDP is **connectionless**, has low overhead, and does not guarantee delivery, ordering, or retransmission. This makes it useful where low latency matters more than perfect delivery. fileciteturn2file3L1394-L1403

**Examples from the course:** video streaming, online gaming, DNS queries, VoIP, live broadcasts. fileciteturn2file3L1413-L1423

## 9. TCP vs UDP — Interview Table

| Feature | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented | Connectionless |
| Reliability | Reliable | No delivery guarantee |
| Ordering | Guaranteed | Not guaranteed |
| Speed | Slower | Faster |
| Retransmission | Yes | No |
| Typical examples | Web, email, file transfer | Streaming, gaming, DNS |

fileciteturn2file3L1424-L1431

## 10. How to choose

```text
Need normal web/API request?    → HTTP/HTTPS
Need real-time two-way updates? → WebSocket
Need email sending?             → SMTP
Need file transfer?             → FTP/SFTP/FTPS
Need reliable transport?        → TCP
Need very low latency?          → UDP
Need modern HTTP transport?     → HTTP/3 + QUIC
```

## 11. Common Interview Questions

**Q: Why does TCP use a handshake?**  
A: To establish the connection before reliable data transfer. fileciteturn2file3L1369-L1393

**Q: Why use UDP when it can lose packets?**  
A: When latency matters more than perfect delivery; the course uses gaming/streaming/VoIP as examples. fileciteturn2file3L1402-L1423

**Q: WebSocket or HTTP?**  
A: Use HTTP for request/response APIs; WebSocket for continuous bidirectional real-time communication. fileciteturn2file3L1303-L1314

**Q: HTTP/2 vs HTTP/3 transport?**  
A: The course describes HTTP/2 over TCP and HTTP/3 over QUIC/UDP. fileciteturn2file3L1265-L1267
