# gRPC

> **Interview mental model:** gRPC lets a client call a remote function through a generated stub, using a `.proto` contract and Protocol Buffers, typically over HTTP/2. It is especially strong for internal service-to-service communication. fileciteturn2file1L463-L490

## 1. What is gRPC?

gRPC (Google Remote Procedure Call) makes a remote server function feel like a local function to the caller. The course emphasizes binary serialization, strong `.proto` contracts, and service-to-service communication. fileciteturn2file1L463-L469

```text
Client code
   ↓
Client Stub
   ↓
RPC Runtime
   ↓  HTTP/2
Server Stub
   ↓
Server Function
```

## 2. How a gRPC Call Works

1. Client calls something like `getUser(id)`.
2. Client stub acts like a proxy and serializes the request with Protocol Buffers.
3. RPC runtime sends it over HTTP/2.
4. Server stub deserializes it.
5. Server function executes business logic.
6. Response travels back through the same layers. fileciteturn2file1L470-L490

### Easy example

```text
Order Service
    │
    │ gRPC: GetCustomer(101)
    ↓
Customer Service
    │
    └── DB lookup
```

The key idea is **internal service-to-service RPC**, not “replace every REST API”.

## 3. Protocol Buffers (`.proto`)

ProtoBuf is both a data format and contract system. A `.proto` file defines RPC methods and message structures and acts as the client/server contract. fileciteturn2file1L491-L512

```protobuf
syntax = "proto3";

service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}

message UserRequest {
  int32 id = 1;
}

message UserResponse {
  string name = 1;
}
```

**Interview point:** `.proto` gives both sides the same strongly typed contract.

## 4. Serialization

```text
Object
  ↓ serialize
ProtoBuf binary
  ↓ network
ProtoBuf binary
  ↓ deserialize
Object
```

Binary encoding generally gives smaller payloads and efficient transfer; the course also highlights strong typing. fileciteturn2file1L513-L536

## 5. Why gRPC?

- **Performance:** compact binary messages.
- **Strong typing:** `.proto` contract.
- **Code generation:** clients/servers can be generated from the contract.
- **HTTP/2:** multiplexing and header compression.
- **Streaming:** client, server, and bidirectional streaming.
- **Cross-language:** Java, Node.js, Go, Python, etc.
- **Microservices:** efficient internal service communication. fileciteturn2file1L537-L559

## 6. gRPC Communication Styles

```text
1. Unary
   Request → Response

2. Client Streaming
   Many requests → one response

3. Server Streaming
   One request → many responses

4. Bidirectional Streaming
   Many requests ↔ many responses
```

The course explicitly covers client, server and bidirectional streaming. fileciteturn2file1L552-L555

## 7. Node.js Example Architecture

The course demonstrates:

```text
HTTP Client
   ↓
Express Server :3005
   ↓
gRPC Client
   ↓
gRPC Server :50051
   ↓
In-memory data
```

The Express layer exposes HTTP routes such as `/customers` and the gRPC client forwards operations to the gRPC server. fileciteturn2file1L562-L589 fileciteturn2file1L690-L720 fileciteturn2file1L722-L763

## 8. REST vs gRPC

| Feature | REST | gRPC |
|---|---|---|
| Transport | HTTP/1.1 or HTTP/HTTPS | HTTP/2 |
| Data | JSON/XML | ProtoBuf binary |
| Contract | Usually OpenAPI/Swagger style | `.proto` strict contract |
| Serialization | Text | Binary |
| Performance | Moderate | High |
| Streaming | Limited/workarounds | Native streaming |
| Typical use | Public APIs, web apps | Microservices, real-time systems |
| Browser | Friendly | Needs gRPC-Web for browser use |
| Debugging | Easy/readable | Harder due to binary payloads |

fileciteturn2file1L766-L797

## 9. Advantages vs Disadvantages

**Advantages**
- High performance.
- Small payloads.
- Strong contracts.
- Streaming.
- Efficient microservice communication.
- Code generation.

**Disadvantages**
- Not as browser-friendly.
- Binary traffic is harder to inspect manually.
- Learning curve around IDL/tooling.
- Requires schema management. fileciteturn2file1L798-L805

## 10. Practical Architecture: Express + gRPC + Stripe

A strong architecture is:

```text
Frontend
   │ REST/HTTP
   ↓
Express / API Gateway
   │ gRPC
   ↓
Payment Service
   │ HTTPS / Stripe SDK
   ↓
Stripe
```

**Why?** Use gRPC for communication between your own backend services. Communicate with an external provider using the provider's supported HTTPS/SDK interface.

**Important:** If the whole application is one Express server, adding gRPC just for Stripe usually adds complexity without a clear benefit.

## 11. When to Choose gRPC

```text
Internal microservice-to-microservice → gRPC
High-volume internal traffic         → gRPC
Strong typed contract needed          → gRPC
Streaming needed                      → gRPC
Browser/public API simplicity         → REST is often easier
External REST provider                → REST/SDK
```

## 12. Interview Questions

**Q: Why is gRPC fast?**  
A: Compact ProtoBuf messages plus HTTP/2 features such as multiplexing. fileciteturn2file1L537-L549

**Q: Why `.proto`?**  
A: It defines the service and message contract so client and server agree on method signatures and data structures. fileciteturn2file1L491-L512

**Q: Why not expose gRPC directly to the browser?**  
A: The course notes browser limitations and the need for gRPC-Web. fileciteturn2file1L798-L805

**Q: gRPC or REST?**  
A: “I would generally use REST for browser-facing/public APIs where simplicity and compatibility matter, and gRPC for internal microservices where strong contracts, performance and streaming are valuable.”

## 13. 30-Second Interview Answer

“gRPC is an RPC framework that lets services call remote methods using a strongly typed `.proto` contract. The client stub serializes messages with Protocol Buffers and the call typically travels over HTTP/2 to the server. gRPC gives efficient binary serialization, generated clients, multiplexing and native streaming, so it is a strong fit for internal microservice communication. For simple public or browser-facing APIs, REST is usually easier.”
