# GraphQL

> **Interview mental model:** One GraphQL endpoint + strongly typed schema + client-selected fields + resolvers that fetch/change the data. The main value is controlling the response shape, especially for connected/nested data. fileciteturn7file0L9-L17

## 1. REST vs GraphQL

### REST
```text
GET /countries
GET /continents
GET /languages
```
You may need multiple requests for related data.

### GraphQL
```text
POST /graphql
```
One query can ask for the connected data and only the fields needed by the UI. fileciteturn7file0L16-L42

### Core problem GraphQL solves

**Over-fetching:** server sends fields the client does not need.  
**Under-fetching:** client needs multiple endpoints/requests to build one screen.  
GraphQL reduces both by letting the client select fields and nested relationships. fileciteturn7file0L45-L67

## 2. Why GraphQL?

- Exact fields → smaller responses.
- Related data → can be requested together.
- Usually one endpoint.
- Strongly typed schema.
- Good tooling: validation, autocomplete, introspection/playground.
- API can evolve by adding fields without breaking existing queries. fileciteturn7file0L45-L67

## 3. Core Components

### Schema / Types
The schema is the **blueprint/contract**. It defines available data, fields, relationships and operations. fileciteturn7file0L163-L174

```graphql
type User {
  id: ID!
  name: String!
  age: Int
}

type Query {
  users: [User]
}
```

### Query
Used to **read/fetch** data. It resembles GET conceptually, but the client chooses fields. fileciteturn7file0L175-L184

```graphql
query {
  users {
    id
    name
  }
}
```

Response is shaped around the requested fields.

### Mutation
Used to **create/update/delete** data. The course compares mutations with REST POST/PUT/PATCH/DELETE. fileciteturn7file0L185-L201

```graphql
mutation {
  addUser(name: "Aman", age: 21) {
    id
    name
    age
  }
}
```

### Resolver
Resolver = function containing the actual logic for a query or mutation: fetch data, create data, update data, etc. fileciteturn7file0L202-L229

```js
const resolvers = {
  Query: {
    users: () => users
  },
  Mutation: {
    addUser: (_, args) => createUser(args)
  }
};
```

## 4. Nested Data — the Big Interview Example

Suppose a screen needs:

```text
Country
 ├── Continent
 └── Languages
```

With REST, the course illustrates separate endpoint calls. With GraphQL, the client can request the relationship in one query. fileciteturn7file0L28-L39

```graphql
query {
  country(id: "IN") {
    name
    continent { name }
    languages { name }
  }
}
```

**Interview line:** “GraphQL is especially useful when UI screens need different shapes of the same connected data.”

## 5. GraphQL vs REST

| Feature | REST | GraphQL |
|---|---|---|
| Endpoints | Multiple resource endpoints | Usually one `/graphql` |
| Response shape | Server-defined | Client-defined |
| Over-fetching | More common | Reduced |
| Under-fetching | More common | Reduced |
| Nested data | More endpoint calls | Natural nested query |
| Versioning | Often `/v1`, `/v2` | Often evolves by adding fields |
| Caching | Easier with normal HTTP caching | More complex |
| Errors | HTTP status codes are central | Errors can be in response body, including with 200 |
| Learning | Easier initially | Slightly harder |

fileciteturn7file0L89-L150

## 6. When NOT to choose GraphQL

The course positions REST as a better fit for **simple CRUD/public/predictable resource APIs**, while GraphQL fits **complex apps with connected data and dynamic UI needs**. fileciteturn7file0L152-L158

Also note the course's cautions:

- HTTP caching is more complex.
- All requests hit one endpoint, which can make rate limiting/monitoring trickier.
- Deep queries need query-cost/security controls.
- File upload is less direct than normal HTTP forms. fileciteturn7file0L133-L150

## 7. GraphQL + Node.js Architecture

The course uses Apollo Server:

```text
Client
  ↓
/graphql
  ↓
Apollo Server
  ├── Schema (typeDefs)
  └── Resolvers
        ↓
     Data sources
```

Its example uses `@apollo/server` and `graphql`, with schema in `typeDef.js` and resolver logic in `resolvers.js`. fileciteturn7file0L230-L275

## 8. Important Interview Risks

### N+1 query problem
Nested resolvers can accidentally cause one DB call per parent item. For example, 100 books → 100 author queries.

**Interview response:** batch related loads with a DataLoader-style approach and measure resolver/database latency.

### Query depth / cost
A client can ask for very deep/expensive nested data. The course specifically calls out security/query-cost control. fileciteturn7file0L148-L150

## 9. 30-Second Interview Answer

“GraphQL is a query language for APIs and a runtime where clients request exactly the fields they need, usually through one endpoint. A strongly typed schema defines the contract, queries read data, mutations change data, and resolvers implement the actual data access logic. I prefer GraphQL when the application has complex connected data and different UI screens need different response shapes. For simple, predictable CRUD or public APIs, REST is often simpler.”
