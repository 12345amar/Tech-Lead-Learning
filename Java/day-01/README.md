# Day 1 — Java Foundations: Detailed Notes and Interview Guide

**Study time:** 2 hours (foundational lesson; use this document as a deeper reference)  
**Status:** Completed (learner confirmed)  
**Level:** Beginner foundations with interview-level explanations  
**Goal:** Understand not only what Java code does, but how the Java platform launches and executes it.

---

## Learning map

By the end of this lesson, you should be able to explain:

1. Java language, platform, bytecode and "write once, run anywhere".
2. JDK vs JRE vs JVM, including what each contains and does.
3. Compilation, class loading, bytecode verification, execution, JIT and garbage collection.
4. Why the standard Java entry point is `public static void main(String[] args)`.
5. What `System.out.println()` means, how it works, and how it differs from `print()` and `printf()`.
6. What a class declaration such as `public class CustomerProfile` represents.
7. How source files, classes, objects, methods and statements relate to one another.
8. How to answer common interview questions with precise, technically sound explanations.

# 1. Java: language and platform

Java is a statically typed, class-based, general-purpose programming language. It is also commonly used to refer to the platform made up of Java APIs, the JVM and supporting tools.

A Java source file is human-readable text, usually ending in `.java`. In the traditional compilation workflow, the Java compiler translates source code into platform-neutral bytecode stored in a `.class` file. A compatible JVM executes that bytecode on a particular operating system and CPU.

### What does "Write Once, Run Anywhere" mean?

It means a compiled Java class file can generally run on different operating systems and processor architectures **provided a compatible JVM and required libraries are available**. It does not mean every application is automatically portable: native libraries, operating-system paths, environment variables and platform-specific integrations can introduce dependencies.

### Java compared with JavaScript / Node.js

| Topic | JavaScript / Node.js | Java |
|---|---|---|
| Runtime engine | Node.js uses the V8 JavaScript engine | Java applications commonly run on a JVM |
| Typing | JavaScript is dynamically typed | Java is statically typed |
| Build | npm/Yarn scripts and tools | Commonly Maven or Gradle |
| Backend frameworks | Express, NestJS | Spring Boot, Jakarta EE |
| Execution | V8 parses and executes JavaScript, using internal compilation/JIT optimizations | `javac` normally compiles source into bytecode; JVM executes it and may JIT-compile hot code |
| Entry point | Defined by the Node.js invocation/application structure | Conventional launcher entry point is a `main` method |

Do not say "Java is compiled and JavaScript is interpreted" as an absolute rule. Modern runtimes use multiple parsing, compilation and optimization strategies.

# 2. JDK, JRE and JVM — detailed explanation

Think of these as three different layers of responsibility.

## 2.1 JVM — Java Virtual Machine

The JVM is an abstract machine defined by a specification and implemented by runtime vendors. It provides the execution environment for Java bytecode.

Core responsibilities include:

- **Class loading:** Locate and load class definitions when needed.
- **Bytecode verification:** Check class-file structure and bytecode safety constraints before execution.
- **Runtime memory areas:** Manage areas such as heap, Java stacks, method area/runtime constant pools, and program counters.
- **Execution:** Interpret bytecode and use a Just-In-Time (JIT) compiler to compile frequently executed code into native machine code where beneficial.
- **Garbage collection:** Reclaim heap memory occupied by objects that are no longer reachable.
- **Runtime services:** Support threads, exceptions, synchronization and other language/platform features.

The JVM does not normally compile your `.java` source file directly. In the standard workflow, `javac` does that first.

## 2.2 JRE — Java Runtime Environment

Conceptually, the JRE is the runtime package: a JVM plus the Java class libraries and supporting files needed to run applications.

Important modern nuance: many current JDK distributions do not provide a separate, independently installed JRE package in the old way. A JDK includes the runtime components required to run Java applications. Custom runtime images can also be created with tools such as `jlink`.

## 2.3 JDK — Java Development Kit

The JDK is the software development kit. It includes the runtime plus developer tools. The most familiar tool is:

- `javac` — Java compiler.
- `java` — application launcher.
- `jar` — create and inspect JAR archives.
- `javadoc` — generate API documentation.
- `jshell` — interactive Java shell.
- Diagnostic and monitoring tools, depending on the JDK distribution.

### A useful mental model

- JVM = engine that runs bytecode.
- JRE = runtime environment around that engine.
- JDK = development kit used to build, diagnose and run Java software.

These are conceptual roles, not a promise that every vendor ships three separate installers.

## Visual: relationship between JDK, JRE and JVM

```text
+------------------------------------------------------+
|                        JDK                           |
|  Development tools: javac, jar, javadoc, jshell, etc. |
|                                                      |
|  +-----------------------------------------------+   |
|  |              Runtime components               |   |
|  |  Java standard libraries + supporting files   |   |
|  |                                               |   |
|  |  +-----------------------------------------+  |   |
|  |  |                  JVM                    |  |   |
|  |  | Class loading, verification, execution, |  |   |
|  |  | JIT compilation, memory, garbage collect |  |   |
|  |  +-----------------------------------------+  |   |
|  +-----------------------------------------------+   |
+------------------------------------------------------+
```

**Interview precision:** Say "A JDK includes the tools needed to develop Java applications and runtime components. The JVM executes bytecode. The JRE is the conceptual runtime bundle of the JVM and libraries; separate JRE packaging varies across modern distributions."

# 3. What happens when a Java program runs?

Consider this source file:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

## Step-by-step lifecycle

1. **Write source:** You create `HelloWorld.java`.
2. **Compile:** Run `javac HelloWorld.java`. The compiler checks syntax and types, then produces `HelloWorld.class` bytecode if compilation succeeds.
3. **Launch:** Run `java HelloWorld`. The Java launcher starts a JVM process and asks it to launch the named class.
4. **Load:** The class loader loads the class definition when required.
5. **Link:** The JVM verifies bytecode, prepares class-level structures and resolves symbolic references as required.
6. **Initialize:** Class initialization runs static field initializers and static initializer blocks in the required order.
7. **Find entry point:** For the conventional launcher flow, the JVM invokes the supported `main` method.
8. **Execute:** Bytecode is interpreted and/or compiled by the JIT into native machine instructions.
9. **Finish:** When the application has no non-daemon threads left (or it explicitly terminates), the JVM process can exit.

## Diagram: source code to output

```text
 Developer
    |
    v
HelloWorld.java  (source code)
    |
    |  javac HelloWorld.java
    v
HelloWorld.class (JVM bytecode)
    |
    |  java HelloWorld
    v
Java launcher starts JVM
    |
    v
Class loading -> Linking -> Initialization
    |
    v
JVM invokes main(...)
    |
    v
Bytecode execution (interpreter / JIT-compiled code)
    |
    v
Console output: Hello, Java!
```

### Important distinction: bytecode vs machine code

- **Bytecode** is the instruction format in a Java class file. It is designed for the JVM, not a specific CPU.
- **Machine code** is native instruction code executed by a processor.
- The JVM can interpret bytecode and JIT-compile frequently used code to native machine code at runtime.

### What is JIT?

JIT means Just-In-Time compilation. During execution, the JVM can identify frequently executed methods or code paths and compile them into native machine code. This can improve performance without requiring every method to be compiled before the program starts.

**Interview answer:** "Java source is normally compiled by javac into platform-independent bytecode. The JVM loads and verifies classes, then executes bytecode using interpretation and JIT compilation. The JVM also provides runtime services such as memory management and garbage collection."

# 4. Understand `public class CustomerProfile`

Example:

```java
public class CustomerProfile {
    // Fields, constructors and methods belong inside the class.
}
```

Break it down:

- `public`: Access modifier. The class is accessible from other code, subject to package/module accessibility rules.
- `class`: Keyword that declares a class.
- `CustomerProfile`: Class name. Java convention is PascalCase for class names.

A class is a type and a blueprint describing the state (fields) and behaviour (methods) that its instances can have. A class declaration does not, by itself, create a customer object.

### Class vs object

```java
public class CustomerProfile {
    String customerName;
    int customerId;

    void printProfile() {
        System.out.println(customerName + " - " + customerId);
    }

    public static void main(String[] args) {
        CustomerProfile customer = new CustomerProfile();
        customer.customerName = "Rahul";
        customer.customerId = 1001;
        customer.printProfile();
    }
}
```

- `CustomerProfile` is the class/type.
- `customer` is a local variable holding a reference.
- `new CustomerProfile()` creates an instance (object).
- `customerName` and `customerId` are instance fields.
- `printProfile()` is an instance method.

Visual:

```text
CustomerProfile (class / blueprint)
   | defines
   +-- customerName : String
   +-- customerId   : int
   +-- printProfile() : behaviour
   |
   | new CustomerProfile()
   v
customer (reference variable) --------+
                                       |
                                       v
                            CustomerProfile object
                            customerName = "Rahul"
                            customerId   = 1001
```

### Why does the filename match?

In the usual file-based compilation workflow, a public top-level class named `CustomerProfile` is stored in `CustomerProfile.java`. This is the convention enforced by the Java compiler for public top-level types in ordinary source files.

A source file can contain multiple top-level classes, but only one public top-level class is allowed in the normal file-based model, and its name must match the filename. Special source-file launch modes and newer Java features have additional rules; learn the normal project convention first.

# 5. Understand `public static void main(String[] args)`

This is one of the most frequently asked Java interview questions. Learn each token individually.

```java
public static void main(String[] args) {
    // Application startup statements
}
```

| Part | Meaning | Why it matters |
|---|---|---|
| `public` | Access modifier | The launcher must be able to access the entry point under the supported launch contract |
| `static` | Belongs to the class, not an instance | The launcher can invoke it without first creating an object of the class |
| `void` | Return type | The method does not return a value to the launcher |
| `main` | Method name | Conventional application entry-point name |
| `String[]` | Array of strings | Holds command-line arguments |
| `args` | Parameter name | A variable name chosen by the programmer; it could be called something else |

## Why is main static?

Imagine the launcher had to create an instance before it could call the startup method. It would need to know how to construct that instance, which could itself require application startup decisions.

A static entry point avoids that circular dependency. The launcher can invoke the method through the class without creating an instance first.

Compare:

```java
public class StartupDemo {
    public static void main(String[] args) {
        System.out.println("Program starts here");

        StartupDemo demo = new StartupDemo();
        demo.showMessage();
    }

    void showMessage() {
        System.out.println("This is an instance method");
    }
}
```

The static `main` can run without an object. The instance method `showMessage` is called only after the object is created.

## Why is the return type void?

The method is designed as a launch entry point, not as a function whose result is returned to the caller. Use `System.exit(status)` only when an explicit process exit status is required; it terminates the JVM process and should be used carefully.

## What is String[] args?

It is an array of strings passed by the launcher from command-line arguments.

Run:

```bash
java CustomerProfile Rahul 1001 prepaid
```

Code:

```java
public class CustomerProfile {
    public static void main(String[] args) {
        System.out.println("Name: " + args[0]);
        System.out.println("ID: " + args[1]);
        System.out.println("Plan: " + args[2]);
    }
}
```

Output:

```text
Name: Rahul
ID: 1001
Plan: prepaid
```

Caution: this example expects three arguments. If fewer are supplied, accessing a missing index throws `ArrayIndexOutOfBoundsException`. Validate argument count before reading array positions.

Safer version:

```java
public class CustomerProfile {
    public static void main(String[] args) {
        if (args.length < 3) {
            System.out.println("Usage: java CustomerProfile <name> <id> <plan>");
            return;
        }

        System.out.println("Name: " + args[0]);
        System.out.println("ID: " + args[1]);
        System.out.println("Plan: " + args[2]);
    }
}
```

## Is main always the only possible entry point?

For the conventional Java launcher, the familiar entry point is a supported `main` method. Modern Java releases have evolved the exact set of accepted main-method forms, so use the classic `public static void main(String[] args)` form for broad compatibility and interviews unless the interviewer asks about newer launch features.

# 6. Understand `System.out.println()`

```java
System.out.println("Hello, Java!");
```

Break it down:

- `System`: A class in the `java.lang` package. This package is automatically available in ordinary Java source files.
- `out`: A static field on `System` that refers to the standard output stream, typically connected to the console.
- `println(...)`: A method on `PrintStream` that writes the supplied value and then writes a line terminator.

Think of it like a path: class `System` → static field `out` → method `println`.

## println vs print vs printf

```java
System.out.print("Hello");
System.out.print(" Java");
System.out.println("!");
System.out.printf("Plan price: %.2f%n", 499.0);
```

Typical output:

```text
Hello Java!
Plan price: 499.00
```

- `print()`: writes without automatically ending the line.
- `println()`: writes and ends the line.
- `printf()`: formats output using format specifiers, such as `%.2f` for two digits after the decimal point and `%n` for a platform-appropriate line separator.

### Is System.out.println the same as logging?

No. It is standard console output, useful for learning and simple command-line programs. Production services should normally use a logging framework (commonly SLF4J with Logback or another implementation) so logs can have levels, timestamps, structured fields, routing and configurable output.

### Where does System.out go?

Usually to the process's standard output stream (stdout), which the terminal displays. In a server, container or managed runtime, stdout may be captured by the process manager or platform logging system. It is not inherently a browser console.

# 7. Put it all together: CustomerProfile walkthrough

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

Line-by-line reading:

1. `public class CustomerProfile` declares the class.
2. The opening brace begins the class body.
3. `public static void main(String[] args)` declares the launch method.
4. The next brace begins the method body.
5. Each variable declaration creates a typed local variable and initializes it.
6. Each `System.out.println` writes a line to standard output.
7. The closing braces end the method and then the class.

Expected output:

```text
Customer Details
----------------
Name: Rahul
Customer ID: 1001
Plan: Prepaid 5G
Price: 299.0
Active: true
```

**Production note:** Do not use `double` for actual currency calculations in a billing system. Binary floating-point cannot represent many decimal fractions exactly. Use `BigDecimal` with an explicit scale and rounding policy.

Example:

```java
import java.math.BigDecimal;

public class BillingExample {
    public static void main(String[] args) {
        BigDecimal planPrice = new BigDecimal("499.00");
        BigDecimal addOnPrice = new BigDecimal("99.00");

        BigDecimal total = planPrice.add(addOnPrice);
        System.out.println("Total: " + total);
    }
}
```

Use a string or `BigDecimal.valueOf(...)` where appropriate; avoid constructing monetary values from a `double` literal.

# 8. Setup and run on macOS (Apple Silicon)

The learner reported an Apple Silicon architecture of `arm64`. Choose the macOS AArch64/ARM64 JDK package.

- JDK 25 downloads: https://adoptium.net/temurin/releases/?os=mac&arch=aarch64&package=jdk&version=25
- VS Code: https://code.visualstudio.com/download
- VS Code extension: Microsoft's **Extension Pack for Java**.

Verify from Terminal:

```bash
uname -m
java -version
javac -version
/usr/libexec/java_home -V
```

Expected architecture from `uname -m`: `arm64`. The exact JDK version output depends on the installed distribution/version.

Compile and run:

```bash
mkdir -p ~/java-learning/day-01
cd ~/java-learning/day-01
# Create HelloWorld.java in this directory, then:
javac HelloWorld.java
java HelloWorld
```

If `javac` is not found, check that a JDK (not only a runtime) is installed and that your PATH/JAVA_HOME configuration points to it.

# 9. Interview questions and model answers

## Q1. What is Java?

Java is a statically typed, class-based programming language and part of a platform whose bytecode is executed by a JVM implementation. Its managed runtime provides portability and services such as memory management and garbage collection.

## Q2. Explain JDK, JRE and JVM.

The JVM loads and executes bytecode. The JRE is the conceptual runtime bundle of the JVM and supporting class libraries. The JDK includes development tools such as the compiler and launcher plus runtime components. Modern distributions may not ship a separate JRE installer.

## Q3. Does javac generate machine code?

In the normal Java workflow, `javac` generates JVM bytecode in class files, not CPU-specific native machine code. The JVM interprets bytecode and may JIT-compile frequently executed code into native machine code at runtime.

## Q4. What is bytecode?

Bytecode is the JVM instruction format stored in a Java class file. It is designed to be executed by a compatible JVM rather than a specific processor directly.

## Q5. Explain the Java execution flow.

The developer writes source, `javac` compiles it to class-file bytecode, the Java launcher starts a JVM, classes are loaded and linked, and the JVM invokes the entry point. The JVM executes bytecode with interpretation and/or JIT compilation.

## Q6. Why is main static?

The conventional launcher must invoke the entry point without first creating an instance of the application's class. Static methods belong to the class, so an object is not required.

## Q7. What does String[] args represent?

It is an array of strings that receives the command-line arguments passed to the application. Each argument is accessed by index, and `args.length` gives the number of supplied arguments.

## Q8. Can we overload main?

Yes, Java allows other methods named `main` with different parameter lists. However, only a method form recognized by the selected Java launcher is used as the application entry point. An overloaded `main(int value)` is just an ordinary method unless called explicitly.

## Q9. What is the difference between print and println?

`print` writes without adding a line terminator. `println` writes the value and then adds a line terminator. `printf` supports formatted output.

## Q10. Why must the public class name match the file name?

The standard file-based Java compiler requires the source filename to match the public top-level class name, which makes source types discoverable and keeps project structure predictable.

## Q11. Is Java fully object-oriented?

Java is strongly object-oriented, but it is not purely object-oriented in the strict sense because it includes primitive types such as `int`, `boolean` and `double`, which are not objects.

## Q12. Is Java pass-by-reference?

No. Java is always pass-by-value. For object variables, the value being copied is the reference. A method can use that copied reference to mutate the same object, but reassigning the parameter does not reassign the caller's variable.

## Q13. What is garbage collection?

Garbage collection is JVM-managed reclamation of heap memory from objects that are no longer reachable. It does not guarantee immediate cleanup, and it does not replace closing external resources such as files, sockets or database connections.

## Q14. What is the difference between JDK and IDE?

The JDK provides the compiler, runtime and developer tools. An IDE such as VS Code or IntelliJ provides an editing and development interface and can invoke the JDK tools. Installing an IDE does not necessarily install a JDK.

## Q15. What would you improve in this beginner CustomerProfile program for production?

Separate domain model from application entry point; use constructors and encapsulation; validate inputs; use `BigDecimal` for money; avoid hard-coded test data; use tests and structured logging; define error handling; and keep presentation/API concerns separate from domain logic.

# 10. Exercises

## Exercise A — Explain without looking

Record a 2-minute explanation of:
- JDK vs JRE vs JVM.
- Source code → bytecode → JVM execution.
- What each token in `public static void main(String[] args)` means.
- What `System.out.println` does.

## Exercise B — EmployeeProfile

Create `EmployeeProfile.java` with:
- employee name
- employee ID
- department
- years of experience
- salary
- whether the employee is a team lead

Print each field with a label.

## Exercise C — SubscriptionBilling

Create `SubscriptionBilling.java` for Rahul:
- Plan price = 499
- Add-on price = 99
- Calculate and print the total.
- First use `double` to practise arithmetic; then rewrite using `BigDecimal`.

## Exercise D — Command-line arguments

Extend `CustomerProfile` so it accepts name, ID and plan from command-line arguments. Validate argument count and print a usage message when arguments are missing.

## Exercise E — Class and object

Create a `CustomerProfile` object using `new`, assign its fields and invoke an instance method. Explain the difference between the class and the object.

# 11. Assessment checklist

Before considering these concepts mastered, you should be able to:

- [ ] Explain JDK, JRE and JVM accurately without saying they are always three separate installations.
- [ ] Draw the compilation and runtime flow.
- [ ] Explain bytecode vs native machine code.
- [ ] Explain class loading, verification, interpretation and JIT at a high level.
- [ ] Explain each token in `public static void main(String[] args)`.
- [ ] Explain why static avoids needing an object for the conventional entry point.
- [ ] Explain `System.out.println` as class → field → method.
- [ ] Explain class vs object using `CustomerProfile`.
- [ ] Compile and run a Java file from Terminal.
- [ ] Complete the exercises and explain the code.

## Progress record

- Day 1 marked complete based on learner confirmation.
- Two Day 1 quiz attempts: 5/5 (100%) each.
- Learner reports setup complete; terminal version output was not shared in the conversation.
- Exercise source code has not yet been submitted for independent review.

---

## Quick revision card

| Term | Remember |
|---|---|
| JDK | Development tools + runtime components |
| JRE | Conceptual runtime: JVM + libraries |
| JVM | Loads and executes bytecode; manages runtime |
| javac | Compiles `.java` to `.class` bytecode |
| java | Launches a Java application |
| bytecode | JVM instruction format |
| JIT | Compiles frequently executed code to native code at runtime |
| class | Type/blueprint for state and behaviour |
| object | Runtime instance of a class |
| main | Conventional Java application entry point |
| System.out | Standard output stream |
| println | Write value followed by line terminator |

**Next lesson:** Day 2 — Variables, data types, type casting and operators.


## Detailed learning guide and visuals

- [Detailed Day 1 explanations and interview Q&A](README.md) — JDK/JRE/JVM, bytecode, class loading, `main`, `System.out.println`, classes and objects, exercises and interview answers.
- [Visual diagrams](DIAGRAMS.md) — platform layers, compile/run flow, `main` breakdown, class/object model and standard output path.
