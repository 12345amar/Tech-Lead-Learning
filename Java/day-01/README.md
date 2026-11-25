# Day 1 — Java Foundations and Development Setup

**Duration:** 2 hours  
**Status:** In progress  
**Goal:** Understand the Java execution model, prepare VS Code, run a Java program and practise basic variables and output.

## Learning objectives

By the end of this session, you should be able to:
1. Explain the roles of JDK, JRE and JVM.
2. Describe the Java source-to-bytecode execution flow.
3. Verify a JDK installation and run Java code in VS Code.
4. Write a class with a `main` method.
5. Declare basic Java variables and print their values.

## 1. What is Java?

Java is a strongly typed, class-based, object-oriented programming language. It is widely used for enterprise backends, APIs, financial systems, telecom platforms and distributed applications.

### Java compared with your JavaScript/Node.js experience

| Area | JavaScript / Node.js | Java |
|---|---|---|
| Runtime | Node.js with V8 | JVM |
| Source execution | V8 parses, compiles and executes JavaScript | Java is commonly compiled to bytecode, then run by the JVM |
| Type system | Dynamic by default | Static and explicit |
| Dependency/build tools | npm, Yarn | Maven, Gradle |
| Common backend framework | Express.js, NestJS | Spring Boot |
| Typical entry point | Application-specific, often `index.js` | `main` method for a standalone application |

Both ecosystems have compilation/JIT optimizations and rich runtime tooling. Avoid assuming that Java is simply interpreted or that JavaScript never compiles.

## 2. JDK, JRE and JVM

- **JDK (Java Development Kit):** Development tools and runtime components, including the Java compiler (`javac`).
- **JRE (Java Runtime Environment):** Runtime components and libraries required to run Java applications. Modern JDK distributions commonly package the runtime directly; a separate JRE installation is not always provided.
- **JVM (Java Virtual Machine):** Loads and executes Java bytecode, manages memory and performs runtime services such as garbage collection and JIT compilation.

### Typical execution flow

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

Java bytecode and JVM implementations help the same compiled application run on supported operating systems, subject to compatible runtime versions and platform dependencies.

## 3. Install and verify the development environment

Use a currently supported JDK LTS distribution. For this learning track, JDK 25 LTS is the selected baseline, unless your project or workplace requires a different supported version.

Download options:
- [Microsoft Build of OpenJDK](https://learn.microsoft.com/en-us/java/openjdk/download)
- [Oracle Java downloads](https://www.oracle.com/java/technologies/downloads/)

Install the JDK that matches your operating system.

### Configure VS Code

1. Install [Visual Studio Code](https://code.visualstudio.com/).
2. Open Extensions.
3. Install **Extension Pack for Java** published by Microsoft.
4. Create and open a folder named `java-tech-lead-journey`.
5. Open VS Code's integrated terminal.

### Verify Java

Run:

```bash
java -version
javac -version
```

Both commands should report the installed JDK version. If `java` works but `javac` is not found, check that a JDK (not only a runtime) is installed and that PATH/JAVA_HOME are configured.

## 4. First Java program

Create a file named `HelloWorld.java`.

```java
public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        System.out.println("My goal is to become a Java Tech Lead.");
    }
}
```

Run in the terminal:

```bash
javac HelloWorld.java
java HelloWorld
```

Expected output:

```text
Hello, Java!
My goal is to become a Java Tech Lead.
```

### Understand the code

- `public class HelloWorld`: declares a public class named `HelloWorld`.
- `public static void main(String[] args)`: conventional entry point when launching this class.
- `System.out.println(...)`: writes text followed by a new line.
- Braces `{}`: delimit a class or method body.
- Semicolon `;`: terminates a Java statement.

Important rules:
- Java is case-sensitive.
- In the standard source-file compilation workflow, the public top-level class name must match the filename.
- Most statements end with a semicolon.
- Java code is organized into classes, records, interfaces and other declared types.

## 5. Variables and primitive/reference types

Java requires a declared type for each variable.

| Type | Example | Use |
|---|---|---|
| `int` | `int customerId = 1001;` | 32-bit whole number |
| `long` | `long accountNumber = 123456789L;` | Larger whole number |
| `double` | `double planPrice = 299.0;` | Floating-point number |
| `boolean` | `boolean active = true;` | True/false |
| `char` | `char grade = 'A';` | Single UTF-16 code unit |
| `String` | `String name = "Amar";` | Text; a reference type |

For money in real applications, prefer `BigDecimal` rather than binary floating-point types such as `double`. We will cover this in a later lesson.

## 6. Practical example — Telecom customer profile

Create `CustomerProfile.java`.

```java
public class CustomerProfile {

    public static void main(String[] args) {

        String customerName = "Amar";
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

Expected output:

```text
Customer Details
----------------
Name: Amar
Customer ID: 1001
Plan: Prepaid 5G
Price: 299.0
Active: true
```

The `+` operator concatenates strings in these print statements. A later lesson covers operators in detail.

## 7. Exercises

Do these without copying the example line by line. Add your source files under `day-01/exercises/`.

### Exercise 1 — Employee Profile

Create `EmployeeProfile.java` with:
- Employee name
- Employee ID
- Department
- Years of experience
- Salary
- Is team lead?

Print all details with meaningful labels.

### Exercise 2 — Subscription Billing

Create `SubscriptionBilling.java`:
- Customer name: Rahul
- Plan price: 499
- Add-on price: 99
- Calculate and print the total.
- Print each component separately.

Use `double` for this introductory exercise. We will discuss why production financial calculations should use `BigDecimal`.

### Exercise 3 — Explain in your own words

Write answers in `day-01/exercises/answers.md`:
1. What is the difference between JDK and JVM?
2. Why does the usual Java workflow compile source code?
3. What is the purpose of the `main` method?
4. What happens when a Java program is run using the `java` command?
5. How does Java's explicit type declaration differ from a typical JavaScript variable declaration?

## 8. Completion criteria

Mark Day 1 completed only after:
- [ ] JDK installed.
- [ ] `java -version` works.
- [ ] `javac -version` works.
- [ ] `HelloWorld.java` runs successfully.
- [ ] `CustomerProfile.java` runs successfully.
- [ ] Employee Profile exercise completed.
- [ ] Subscription Billing exercise completed.
- [ ] Written concept answers submitted.
- [ ] Day 1 assessment attempted and reviewed.

## 9. Assessment record

Complete the five-question Day 1 assessment in the learning conversation. Record the score here after it has been reviewed.

| Item | Result |
|---|---|
| Assessment score | Pending |
| Code review | Pending |
| Setup verification | Pending |
| Final status | In progress |

## 10. Tech Lead reflection

Think beyond syntax:
- Why is a strongly typed model useful in a large team?
- What naming conventions make Java code easier to review?
- What should a repository README tell a new engineer?
- Why should monetary amounts not normally use `double` in production billing systems?

---
**Next:** Day 2 — Variables, data types, type casting and operators.
