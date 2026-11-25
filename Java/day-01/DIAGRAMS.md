# Day 1 — Visual Diagrams

This page collects the most important Day 1 visuals for quick revision.

## 1. JDK, JRE and JVM relationship

```text
+---------------------------------------------------------+
|                           JDK                           |
|                                                         |
|   Development tools                                     |
|   javac | java | jar | javadoc | jshell | diagnostics   |
|                                                         |
|   +-----------------------------------------------+     |
|   |              Java runtime components          |     |
|   |                                               |     |
|   |   Java libraries + runtime support            |     |
|   |                                               |     |
|   |   +---------------------------------------+   |     |
|   |   |                 JVM                   |   |     |
|   |   |                                       |   |     |
|   |   | Class loading and verification       |   |     |
|   |   | Bytecode execution and JIT            |   |     |
|   |   | Runtime memory and garbage collection |   |     |
|   |   +---------------------------------------+   |     |
|   +-----------------------------------------------+     |
+---------------------------------------------------------+
```

**Keep in mind:** This is a conceptual model. Modern JDK distributions include runtime components but may not offer a separate JRE installer.

## 2. Java compile and run flow

```text
       Developer writes source
                 |
                 v
          HelloWorld.java
                 |
                 | javac HelloWorld.java
                 v
         HelloWorld.class
          (JVM bytecode)
                 |
                 | java HelloWorld
                 v
          Java application launcher
                 |
                 v
              JVM starts
                 |
                 v
       Load -> Link -> Initialize
                 |
                 v
          Invoke main method
                 |
                 v
      Interpret / JIT compile bytecode
                 |
                 v
         CPU executes native code
                 |
                 v
             Program output
```

## 3. What does main mean?

```java
public static void main(String[] args)
```

```text
 public   static   void    main   (String[] args)
   |        |        |       |          |
   |        |        |       |          +-- command-line values
   |        |        |       +------------- conventional entry name
   |        |        +--------------------- no return value
   |        +------------------------------ callable without an object
   +--------------------------------------- accessible to launcher
```

Visual reminder: because the entry method is static, the launcher does not need to do this first:

```java
CustomerProfile profile = new CustomerProfile();
```

It can launch the entry method through the class.

## 4. Class versus object

```text
             CustomerProfile
             (class / type)
                    |
          describes state/behaviour
                    |
          +---------+----------+
          |                    |
      customerName         customerId
          |                    |
          +---------+----------+
                    |
                 methods
                    |
              printProfile()
                    |
             new CustomerProfile()
                    |
                    v
          +------------------------+
          | Customer object        |
          | name = "Rahul"         |
          | id   = 1001            |
          +------------------------+
```

## 5. System.out.println — read it as a path

```text
 System
 (java.lang class)
       |
       | static field access
       v
     out
 (PrintStream object; standard output)
       |
       | invoke method
       v
   println("Hello")
       |
       v
 writes text + line terminator
       |
       v
 terminal / captured stdout
```

## 6. JVM runtime responsibilities

```text
                 JVM
                  |
      +-----------+-----------+
      |           |           |
      v           v           v
 Class loading  Execution   Runtime memory
 & verification interpreter / heap / stacks /
                + JIT        GC
      |           |           |
      +-----------+-----------+
                  |
                  v
      managed Java application runtime
```

## 7. How to remember the layers

| Layer | Analogy | Java responsibility |
|---|---|---|
| JDK | Workshop with tools | Develop, compile, inspect, run |
| JRE | Complete operating environment | Supply runtime and libraries |
| JVM | Engine | Execute bytecode and manage runtime |

These analogies help memory, but use the technical definitions in interviews.
