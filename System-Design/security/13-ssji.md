# Server-Side JavaScript Injection (SSJI)

SSJI occurs when untrusted user input is treated as JavaScript code and evaluated by the **server**.

## Why It Is Dangerous

If attacker-controlled code executes on the server, the impact can include:
- arbitrary code execution
- filesystem access
- server compromise
- application/data compromise

## Dangerous Patterns

Avoid evaluating untrusted input with dynamic execution mechanisms such as:

```js
eval(userInput)
new Function(userInput)
```

Also be careful with dynamic code paths and unsafe deserialization.

## Example Concept

```text
User input
   ↓
Server accepts input
   ↓
Dynamic JS evaluation ❌
   ↓
Attacker-controlled code runs on server
```

## Defences

1. Never execute user-provided code.
2. Strictly validate and constrain input.
3. Avoid `eval`, `new Function` and similar dynamic execution.
4. Handle deserialization safely.
5. Apply least privilege to the application process.
6. Use robust error handling and monitoring.

## Interview Answer

> "SSJI is server-side code injection where attacker-controlled input is evaluated as JavaScript. My primary defence is to never dynamically execute untrusted input, especially through eval-like APIs, combined with strict validation, safe deserialization and least-privilege execution."
