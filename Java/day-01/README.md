# Day 1 — Java Foundations and Development Setup

**Duration:** 2 hours  
**Status:** Completed (learner confirmed)  
**Goal:** Understand the Java execution model, prepare VS Code, run a Java program and practise basic variables and output.

## Learning objectives
1. Explain the roles of JDK, JRE and JVM.
2. Describe the Java source-to-bytecode execution flow.
3. Verify a JDK installation and run Java code in VS Code.
4. Write a class with a `main` method.
5. Declare basic Java variables and print their values.

## 1. What is Java?

Java is a strongly typed, class-based, object-oriented programming language. It is widely used for enterprise backends, APIs, financial systems, telecom platforms and distributed applications.

### Java compared with JavaScript / Node.js

| Area | JavaScript / Node.js | Java |
|---|---|---|
| Runtime | Node.js with V8 | JVM |
| Source execution | V8 parses, compiles and executes JavaScript | Java is commonly compiled to bytecode, then run by the JVM |
| Type system | Dynamic by default | Static and explicit |
| Dependency/build tools | npm, Yarn | Maven, Gradle |
| Common backend framework | Express.js, NestJS | Spring Boot |
| Typical entry point | Application-specific, often `index.js` | `main` method for a standalone application |

Both ecosystems have compilation/JIT optimizations and rich runtime tooling.

## 2. JDK, JRE and JVM

- **JDK:** Development tools and runtime components, including `javac`.
- **JRE:** Runtime components and libraries needed to run Java applications. A separate JRE installation is not always distributed with modern JDKs.
- **JVM:** Loads and executes Java bytecode, manages memory and provides runtime services such as garbage collection and JIT compilation.

Typical execution flow:

```text
HelloWorld.java
      |
      | javac HelloWorld.java
      v
HelloWorld.class (bytecode)
      |
      v
JVM loads and executes bytecode
      |
      v
Program output
```

## 3. macOS and VS Code setup

The learner confirmed an Apple Silicon Mac (`arm64`). The matching JDK installer is macOS AArch64 / ARM64, JDK package, PKG installer.

- [Eclipse Temurin JDK 25 downloads](https://adoptium.net/temurin/releases/?os=mac&arch=aarch64&package=jdk&version=25)
- [Visual Studio Code](https://code.visualstudio.com/download)
- Install Microsoft's **Extension Pack for Java** from VS Code Extensions.

Verification commands:

```bash
java -version
javac -version
/usr/libexec/java_home -V
```

The learner reports the Day 1 setup is complete. The command output was not pasted into the learning conversation.

## 4. First Java program

Create `HelloWorld.java`:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        System.out.println("My goal is to become a Java Tech Lead.");
    }
}
```

Compile and run:

```bash
javac HelloWorld.java
java HelloWorld
```

Key points:
- `public class HelloWorld` declares a public class.
- `public static void main(String[] args)` is the conventional entry point for launching the class.
- `System.out.println(...)` prints a line.
- Java is case-sensitive.
- In the standard source-file compilation workflow, the public top-level class name matches the filename.

## 5. Variables and types

| Type | Example | Use |
|---|---|---|
| `int` | `int customerId = 1001;` | 32-bit whole number |
| `long` | `long accountNumber = 123456789L;` | Larger whole number |
| `double` | `double planPrice = 299.0;` | Floating-point number |
| `boolean` | `boolean active = true;` | True/false |
| `char` | `char grade = 'A';` | Single UTF-16 code unit |
| `String` | `String name = "Amar";` | Text; reference type |

For production money calculations, prefer `BigDecimal` to binary floating-point types such as `double`.

## 6. Telecom customer profile example

```java
public class CustomerProfile {
    public static void main(String[] args) {
        String customerName = "Rahul";
        int customerId = 1001;
        String planName = "Prepaid 5G";
        double planPrice = 299.00;
        boolean active = true;

        System.out.println("Customer Details");
        System.out.println("----------------");
        System.out.println("Name: " + customerName);
        System.out.println("Customer ID: " + customerId);
        System.out.println("Plan: " + planName);
        System.out.println("Price: " + planPrice);
        System.out.println("Active: " + active);
    }
}
```

## 7. Exercises

### Exercise 1 — Employee Profile
Create `EmployeeProfile.java` with employee name, ID, department, years of experience, salary and team-lead status. Print all fields.

### Exercise 2 — Subscription Billing
Create `SubscriptionBilling.java` for Rahul with plan price 499 and add-on price 99. Print each component and the total. Use `double` for this introductory exercise; later we will use `BigDecimal` for production billing.

### Exercise 3 — Concept answers
Explain in your own words:
1. Difference between JDK and JVM.
2. Why Java source is compiled in the usual workflow.
3. Purpose of the `main` method.
4. What happens when a class is launched with `java`.
5. How Java explicit typing differs from typical JavaScript variable declarations.

## 8. Assessment results

| Attempt | Score | Result |
|---|---:|---|
| Day 1 fundamentals — Round 1 | 5/5 | 100% |
| Day 1 fundamentals — Round 2 | 5/5 | 100% |

Both five-question assessments were completed with all answers correct.

## 9. Completion record

- [x] Learner confirmed Day 1 complete.
- [x] macOS architecture identified as ARM64.
- [x] Setup completion reported by learner.
- [x] Two knowledge assessments completed (5/5 each).
- [ ] Source code and exercise answers submitted for independent review.

**Status:** Day 1 completed based on learner confirmation. Code review remains open until source files are shared.

## 10. Tech Lead reflection

- Why is a strongly typed model useful in a large team?
- What naming conventions make Java code easier to review?
- What should a repository README tell a new engineer?
- Why should monetary amounts not normally use `double` in production billing systems?

---
**Next:** Day 2 — Variables, data types, type casting and operators.
