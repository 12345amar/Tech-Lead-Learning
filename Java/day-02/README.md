# Day 2 — Variables, Data Types, Type Casting and Operators

**Status:** In progress  
**Duration:** 2 hours  
**Prerequisite:** Day 1 — Java foundations, JDK/JRE/JVM, class and main method  
**Practical domain:** Telecom customer subscriptions and billing

## Learning objectives

By the end of Day 2, you should be able to:

1. Declare, initialize, update and read Java variables.
2. Explain primitive types vs reference types.
3. Choose appropriate numeric types and understand their ranges/precision.
4. Explain local variables, fields, `final`, constants and `var`.
5. Perform widening and narrowing conversions safely.
6. Explain numeric promotion, integer division and overflow.
7. Use arithmetic, assignment, comparison, logical, unary, ternary and bitwise operators.
8. Explain Java's short-circuit evaluation and operator precedence.
9. Identify common bugs in subscription and billing code.
10. Answer the interview questions at the end of this document.

---

# 1. What is a variable?

A variable is a named storage location that has a declared type. The type determines which values can be stored and which operations are allowed.

Example:

```java
int customerId = 1001;
String customerName = "Rahul";
double planPrice = 499.0;
boolean active = true;
```

Read the first line as:
- `int`: the variable's type.
- `customerId`: the variable's name.
- `=`: assignment operator.
- `1001`: initial value.
- `; `: statement terminator.

## Declaration, initialization and reassignment

```java
int age;          // declaration
age = 35;         // initialization / first assignment
age = 36;         // reassignment
```

You cannot read a local variable before it has definitely been assigned:

```java
int total;
// System.out.println(total); // compile-time error
total = 100;
System.out.println(total);    // valid
```

## Visual: variable lifecycle

```text
Declare variable
      |
      v
 int customerId
      |
      v
Assign initial value
      |
      v
 customerId = 1001
      |
      v
Read / use value
      |
      v
 System.out.println(customerId)
      |
      v
Reassign when required
      |
      v
 customerId = 1002
```

## Naming conventions

Use meaningful lower camelCase for variables:

```java
String customerName;
int accountNumber;
boolean subscriptionActive;
double monthlyPlanPrice;
```

Avoid unclear names such as `x`, `a1`, `data`, or misleading names such as `isActive` for a price.

Rules:
- Names are case-sensitive: `customerId` and `customerID` are different.
- A name cannot begin with a digit.
- A name cannot be a Java keyword such as `class`, `int` or `public`.
- Names may contain letters, digits, underscore and dollar sign, but use ordinary descriptive camelCase in application code.
- Boolean names often read like questions: `isActive`, `hasAddon`, `canRenew`.

---

# 2. Primitive data types

Java has eight primitive types.

| Type | Size | Approximate range / values | Example |
|---|---:|---|---|
| `byte` | 8-bit | -128 to 127 | `byte retryCount = 3;` |
| `short` | 16-bit | -32,768 to 32,767 | `short age = 35;` |
| `int` | 32-bit | -2^31 to 2^31 - 1 | `int customerId = 1001;` |
| `long` | 64-bit | -2^63 to 2^63 - 1 | `long accountId = 9000000000L;` |
| `float` | 32-bit | Approx. 6–7 decimal digits precision | `float ratio = 0.75f;` |
| `double` | 64-bit | Approx. 15–16 decimal digits precision | `double usage = 12.5;` |
| `char` | 16-bit | One UTF-16 code unit | `char grade = 'A';` |
| `boolean` | JVM-dependent representation | `true` or `false` | `boolean active = true;` |

Notes:
- Use `int` for ordinary whole-number calculations unless a larger range is needed.
- Use `long` for values that may exceed the `int` range. Add `L` to a long literal when needed: `9000000000L`.
- A decimal literal such as `12.5` is a `double` by default. Add `f` for a float literal: `12.5f`.
- Do not assume a fixed in-memory size for Java `boolean`; the Java language does not define its storage size.
- `char` stores a UTF-16 code unit, not necessarily a complete Unicode character in every case.

## Why do types matter?

Java is statically typed. The compiler checks type compatibility before the program runs.

```java
int quantity = 5;
// quantity = "five"; // compile-time error
```

This is useful in large applications because many incompatible assignments and method calls are caught during compilation rather than waiting for a production request to trigger them.

### Java vs JavaScript

JavaScript:

```javascript
let planPrice = 499;
planPrice = "five hundred"; // allowed by JavaScript
```

Java:

```java
int planPrice = 499;
// planPrice = "five hundred"; // compile-time error
```

A Java variable's declared type does not change at runtime. JavaScript is dynamically typed; TypeScript adds static type checking at development/build time but still runs as JavaScript.

---

# 3. Reference types

Apart from primitives, Java variables can hold references to objects. Examples include:
- `String`
- Arrays
- Classes you create, such as `CustomerProfile`
- Interfaces and enum types

```java
String customerName = "Rahul";
int[] planPrices = {299, 499, 799};
CustomerProfile customer = new CustomerProfile();
```

A reference variable holds a reference to an object; it is not the object itself.

## Visual: primitive vs reference

```text
Primitive variable                     Reference variable
+----------------------+               +----------------------+
| int customerId       |               | String customerName  |
| value: 1001          |               | reference ----------+----+
+----------------------+               +----------------------+    |
                                                                    v
                                                        +-------------------+
                                                        | String object     |
                                                        | content: "Rahul"  |
                                                        +-------------------+
```

A reference can be `null`, meaning it does not currently refer to an object:

```java
String middleName = null;
```

Calling an instance method through a null reference causes a `NullPointerException`.

## Important: String is not a primitive

`String` is a class and therefore a reference type. It is special and heavily used, but it is not one of Java's eight primitive types.

---

# 4. Default values vs local variables

Fields (instance variables and static fields) receive default values if not explicitly initialized.

| Field type | Default |
|---|---|
| Numeric primitives | zero (for example, `0`, `0.0`) |
| `boolean` | `false` |
| `char` | `'\\u0000'` |
| Reference type | `null` |

Example:

```java
public class DefaultValues {
    int count;                 // 0
    boolean enabled;           // false
    String name;               // null

    public static void main(String[] args) {
        DefaultValues example = new DefaultValues();
        System.out.println(example.count);
        System.out.println(example.enabled);
        System.out.println(example.name);
    }
}
```

**Interview trap:** Local variables inside methods do not receive usable default values. They must be definitely assigned before being read.

---

# 5. final, constants and var

## final

Use `final` when a variable should be assigned only once.

```java
final int MAX_RETRY_COUNT = 3;
// MAX_RETRY_COUNT = 5; // compile-time error
```

For a reference variable, `final` prevents reassignment of the reference, but it does not automatically make the referenced object immutable.

```java
final StringBuilder message = new StringBuilder("Hello");
message.append(" Java"); // allowed: object is mutated
// message = new StringBuilder("Hi"); // not allowed: reference reassignment
```

## Constants: static final

A common convention for class-level constants is uppercase with underscores:

```java
public class PlanRules {
    public static final int MAX_ADDONS = 5;
}
```

- `static`: belongs to the class.
- `final`: cannot be reassigned after initialization.
- `public`: accessible from other code, subject to access rules.

## var (Java 10+)

Local variable type inference allows:

```java
var customerName = "Rahul"; // inferred as String
var customerId = 1001;      // inferred as int
```

Important:
- `var` is not dynamic typing. The compiler infers a fixed type.
- It is only for local variables (including loop variables and certain resource variables), not fields or method parameters.
- It must have an initializer so the compiler can infer the type.
- Avoid it when it makes code less readable.

```java
// var price;       // invalid: no initializer
// var value = null; // invalid: type cannot be inferred
```

---

# 6. Type casting and conversion

Type conversion changes a value from one type to another.

## 6.1 Widening conversion (usually automatic)

A value is converted to a type that can represent a wider range or precision.

```java
int planCount = 10;
long totalPlans = planCount;
double amount = totalPlans;
System.out.println(amount); // 10.0
```

Common numeric widening path:

```text
byte -> short -> int -> long -> float -> double
          char -> int
```

This diagram is a simplified numeric widening map. Not every conversion preserves every integer exactly: converting a very large `long` to `float` or `double` can lose precision.

## 6.2 Narrowing conversion (explicit cast)

A conversion to a narrower type requires an explicit cast and may lose information.

```java
double planPrice = 499.99;
int roundedDown = (int) planPrice;
System.out.println(roundedDown); // 499
```

The fractional part is discarded; this is truncation toward zero, not mathematical rounding.

Other example:

```java
int largeValue = 130;
byte smallValue = (byte) largeValue;
System.out.println(smallValue); // -126 (overflow / wraparound)
```

A cast does not validate that the value fits. Validate ranges before narrowing when data correctness matters.

## 6.3 String conversion

Convert a number to text:

```java
int customerId = 1001;
String idText = String.valueOf(customerId);
```

Parse text into a number:

```java
String input = "499";
int planPrice = Integer.parseInt(input);
```

Invalid numeric text causes `NumberFormatException`:

```java
// Integer.parseInt("four hundred"); // throws NumberFormatException
```

## 6.4 Numeric promotion

In arithmetic, `byte`, `short` and `char` operands are generally promoted to `int`.

```java
byte first = 10;
byte second = 20;
// byte total = first + second; // compile-time error
int total = first + second;     // valid: operands promoted to int
byte smallTotal = (byte) (first + second); // explicit cast
```

If an expression includes different numeric types, Java applies binary numeric promotion to determine the operation's result type.

## 6.5 Integer division

```java
System.out.println(5 / 2);     // 2
System.out.println(5.0 / 2);   // 2.5
System.out.println((double) 5 / 2); // 2.5
```

When both operands are integers, the fractional part is discarded.

## 6.6 Overflow

An integer type has a fixed range. Arithmetic outside that range can overflow.

```java
int max = Integer.MAX_VALUE;
System.out.println(max);       // 2147483647
System.out.println(max + 1);   // -2147483648
```

For calculations where overflow is unacceptable, consider range checks and methods such as `Math.addExact(a, b)`, which throws `ArithmeticException` on overflow.

---

# 7. Operators

An operator performs an operation on one or more operands.

## 7.1 Arithmetic operators

| Operator | Meaning | Example |
|---|---|---|
| `+` | Addition | `499 + 99` |
| `-` | Subtraction | `499 - 99` |
| `*` | Multiplication | `499 * 2` |
| `/` | Division | `500 / 2` |
| `%` | Remainder | `10 % 3` |

```java
int planPrice = 499;
int addonPrice = 99;
int total = planPrice + addonPrice;
System.out.println(total); // 598
```

## 7.2 Assignment operators

```java
int total = 500;
total += 99; // total = total + 99
total -= 10; // total = total - 10
total *= 2;  // total = total * 2
total /= 2;  // total = total / 2
total %= 10; // total = total % 10
```

## 7.3 Unary operators

```java
int retryCount = 0;
retryCount++; // increment by one
retryCount--; // decrement by one
int positive = +5;
int negative = -5;
boolean enabled = true;
boolean disabled = !enabled;
```

Prefix vs postfix:

```java
int a = 5;
int before = ++a; // a becomes 6, before is 6

int b = 5;
int after = b++;  // after is 5, then b becomes 6
```

Prefer standalone increment statements over complex expressions containing multiple increments; they are easier to read and review.

## 7.4 Relational and equality operators

`==`, `!=`, `>`, `<`, `>=`, `<=` produce a boolean result.

```java
int planPrice = 499;
boolean premiumPlan = planPrice >= 499;
boolean freePlan = planPrice == 0;
```

Important:
- For primitive values, `==` compares values.
- For object references, `==` checks whether both references refer to the same object, not whether their contents are equal.
- For String content comparisons, use `.equals()` (covered more deeply in the Strings lesson).

```java
String first = new String("Prepaid");
String second = new String("Prepaid");

System.out.println(first == second);      // false: different objects
System.out.println(first.equals(second)); // true: same text content
```

## 7.5 Logical operators

| Operator | Meaning | Behaviour |
|---|---|---|
| `&&` | Logical AND | True only if both are true; short-circuits |
| `||` | Logical OR | True if either is true; short-circuits |
| `!` | Logical NOT | Reverses boolean |

Telecom eligibility example:

```java
boolean accountActive = true;
boolean paymentCleared = true;
boolean eligibleForRenewal = accountActive && paymentCleared;
System.out.println(eligibleForRenewal); // true
```

## 7.6 Short-circuit evaluation

With `&&`, if the left side is false, Java does not evaluate the right side. With `||`, if the left side is true, Java does not evaluate the right side.

```java
String customerName = null;

if (customerName != null && customerName.length() > 0) {
    System.out.println(customerName);
}
```

The null check protects the second expression. If the first condition is false, the second is skipped.

Compare `&&` and `&`:
- `&&` is short-circuit logical AND for booleans.
- `&` can be boolean logical AND without short-circuiting, and is also a bitwise AND operator for integral values.

Likewise, `||` short-circuits, while boolean `|` evaluates both sides.

## 7.7 Ternary operator

A compact conditional expression:

```java
int planPrice = 499;
String planCategory = planPrice >= 499 ? "Premium" : "Basic";
System.out.println(planCategory);
```

Pattern:

```text
condition ? value-if-true : value-if-false
```

Use it for simple value selection. Use `if/else` when the logic is complex or multiple statements are required.

## 7.8 Bitwise operators (introductory awareness)

For integral types:
- `&` bitwise AND
- `|` bitwise OR
- `^` bitwise XOR
- `~` bitwise complement
- `<<` left shift
- `>>` signed right shift
- `>>>` unsigned right shift

Example:

```java
int flags = 5; // binary 0101
int mask = 1;  // binary 0001
System.out.println(flags & mask); // 1
```

Bitwise operations are used in flags, masks, protocols and low-level code. They are not a substitute for ordinary boolean logic.

---

# 8. Operator precedence

Java evaluates operators according to precedence and associativity. Parentheses make intent explicit and improve readability.

A simplified high-to-low order:

1. Postfix: `expr++`, `expr--`
2. Unary: `++expr`, `--expr`, `!`, unary `+`, unary `-`, `~`
3. Multiplicative: `*`, `/`, `%`
4. Additive: `+`, `-`
5. Shift: `<<`, `>>`, `>>>`
6. Relational: `<`, `<=`, `>`, `>=`, `instanceof`
7. Equality: `==`, `!=`
8. Bitwise AND: `&`
9. Bitwise XOR: `^`
10. Bitwise OR: `|`
11. Logical AND: `&&`
12. Logical OR: `||`
13. Ternary: `? :`
14. Assignment: `=`, `+=`, `-=`, etc.

Example:

```java
int result = 10 + 5 * 2;     // 20
int clearer = 10 + (5 * 2); // 20
```

Do not try to memorise every precedence rule on day one. Use parentheses whenever the expression is not immediately obvious.

---

# 9. Practical: Telecom subscription calculation

Create `SubscriptionCalculator.java`:

```java
import java.math.BigDecimal;

public class SubscriptionCalculator {
    public static void main(String[] args) {
        String customerName = "Rahul";
        int customerId = 1001;
        BigDecimal basePlan = new BigDecimal("499.00");
        BigDecimal addon = new BigDecimal("99.00");
        boolean accountActive = true;
        boolean paymentCleared = true;

        BigDecimal total = basePlan.add(addon);
        boolean renewalEligible = accountActive && paymentCleared;
        String planType = total.compareTo(new BigDecimal("500.00")) >= 0
                ? "Premium" : "Standard";

        System.out.println("Customer: " + customerName);
        System.out.println("Customer ID: " + customerId);
        System.out.println("Base plan: " + basePlan);
        System.out.println("Add-on: " + addon);
        System.out.println("Total: " + total);
        System.out.println("Renewal eligible: " + renewalEligible);
        System.out.println("Plan type: " + planType);
    }
}
```

Expected output:

```text
Customer: Rahul
Customer ID: 1001
Base plan: 499.00
Add-on: 99.00
Total: 598.00
Renewal eligible: true
Plan type: Premium
```

Why `BigDecimal` here?
- Currency values should not normally be represented using binary floating-point.
- Construct from a decimal string (or use `BigDecimal.valueOf`) to avoid importing an already-rounded double value.
- Use `.add()` for addition; `BigDecimal` is immutable, so the result is returned as a new object.
- In real billing, define scale, currency, tax rules and rounding policy explicitly.

---

# 10. Common mistakes and how to avoid them

| Mistake | Why it is wrong | Better approach |
|---|---|---|
| `float price = 99.99;` | Decimal literal is double by default | `float price = 99.99f;` (but not for money) |
| `long id = 9000000000;` | Literal may be treated as int and exceed int range | `long id = 9000000000L;` |
| `int total = 5 / 2;` | Integer division gives 2 | Use a floating operand if a fraction is required |
| `byte sum = a + b;` | Small integral operands are promoted to int | Store in int or cast after range checking |
| `(int) 499.99` | Truncates; does not round | Use an explicit rounding policy |
| `name == "Rahul"` | Reference comparison may not compare String content | Use `name.equals("Rahul")` after null handling |
| `local variable` read before assignment | Compile-time definite-assignment error | Initialize before reading |
| `double` for billing | Binary floating-point precision issues | Use `BigDecimal` |

---

# 11. Technical interview questions and answers

## Q1. What is a variable in Java?
A named, typed storage location. Its declared type determines the values it can hold and the operations permitted by the compiler.

## Q2. What is the difference between primitive and reference types?
Primitive variables directly hold primitive values such as an integer or boolean. Reference variables hold references to objects, such as Strings, arrays or instances of classes. A reference can be null.

## Q3. Name all eight primitive types.
`byte`, `short`, `int`, `long`, `float`, `double`, `char` and `boolean`.

## Q4. What is the difference between int and Integer?
`int` is a primitive. `Integer` is a wrapper class object for an int value. Wrapper classes are useful in generics and collections, which cannot use primitive type arguments directly. Java supports boxing and unboxing between them.

## Q5. What is the default value of a local variable?
There is no usable default value for a local variable. It must be definitely assigned before use. Fields do receive default values.

## Q6. What is final?
It prevents a variable from being assigned again after initialization. For a reference, it prevents reassignment of the reference, not mutation of the referenced object.

## Q7. What is the difference between final and static final?
`final` means assigned once. `static final` is commonly used for a class-level constant shared by the class rather than stored per object.

## Q8. What is var?
Local variable type inference, introduced in Java 10. The compiler infers a fixed static type from the initializer. It is not dynamic typing.

## Q9. What is widening and narrowing?
Widening converts to a type with a broader range/precision and is often implicit. Narrowing converts to a type with a smaller range and requires an explicit cast; it can lose information.

## Q10. What is the result of 5 / 2?
2, because both operands are integers and Java performs integer division.

## Q11. What is numeric promotion?
Java promotes smaller integral operands such as byte, short and char to int in many arithmetic expressions. Mixed numeric expressions are converted according to binary numeric promotion rules.

## Q12. What is overflow?
A calculation produces a value outside the representable range of a fixed-width numeric type. For ordinary integer arithmetic, the result wraps according to the type's bit representation. Use checks such as `Math.addExact` when overflow must be detected.

## Q13. Difference between == and equals()?
For primitives, `==` compares values. For references, `==` compares object identity (whether references point to the same object). `equals()` can compare logical content when a class implements it appropriately; String implements content equality.

## Q14. Difference between && and &?
`&&` is short-circuit boolean AND. If the left side is false, the right side is not evaluated. Boolean `&` evaluates both sides; for integral operands it is bitwise AND.

## Q15. Difference between || and |?
`||` is short-circuit boolean OR. If the left side is true, the right side is skipped. Boolean `|` evaluates both sides; for integral operands it is bitwise OR.

## Q16. What is the ternary operator?
A conditional expression of the form `condition ? expression1 : expression2`. It selects one of two values based on a boolean condition.

## Q17. Why is double not recommended for money?
Most decimal fractions cannot be represented exactly in binary floating-point. Repeated calculations can produce rounding surprises. Use BigDecimal with explicit scale and rounding rules for monetary calculations.

## Q18. Is String primitive?
No. String is a reference type and a class in `java.lang`.

## Q19. Is Java statically typed?
Yes. Variable types are checked by the compiler and do not change at runtime. Runtime casts and dynamic dispatch do not make Java dynamically typed.

## Q20. What is the difference between declaration and initialization?
Declaration introduces the variable and its type. Initialization assigns its first value. They can happen in the same statement or separately.

## Q21. Can a final object be changed?
The reference cannot be reassigned, but the object may still be mutable. For example, a final StringBuilder reference can append text.

## Q22. What happens when a String reference is null and you call length()?
A NullPointerException is thrown. Check for null or use a suitable null-safe design.

## Q23. What is the output of this code?
```java
int a = 5;
int b = 2;
System.out.println(a / b);
System.out.println((double) a / b);
```
Output:
```text
2
2.5
```

## Q24. What should a Tech Lead look for in code using types and operators?
Correct domain types, clear naming, null safety, overflow/range handling, explicit rounding for money, readable expressions, safe conversions, tests for boundaries and avoidance of unnecessary cleverness.

---

# 12. Hands-on exercises

Create a folder called `day-02` and create these Java files. Compile each class from Terminal or run it using VS Code.

## Exercise 1 — EmployeeProfile

Declare and print:
- employee name (`String`)
- employee ID (`long`)
- age (`int`)
- experience in years (`double`)
- active status (`boolean`)
- grade (`char`)

Explain why each type was selected.

## Exercise 2 — TypeCastingDemo

Write code that:
1. Assigns an int to a long (widening).
2. Assigns a double to an int using an explicit cast (narrowing).
3. Prints `5 / 2` and `5.0 / 2`.
4. Shows what happens when 130 is cast to byte.
5. Parses the String `"2026"` into an int.

Write the output as comments before running it, then verify.

## Exercise 3 — SubscriptionBilling

Use:
- Base plan = 499
- Add-on = 99
- Discount = 50
- Tax rate = 18% (for this exercise only; define whether tax applies before or after discount)
- Account active = true
- Payment cleared = false

Calculate subtotal, discounted amount, tax and final total. Print whether renewal is eligible using `accountActive && paymentCleared`.

First use primitive arithmetic to practise operators. Then implement currency calculations using BigDecimal and explain the difference.

## Exercise 4 — OperatorChallenge

Predict and then run:

```java
int a = 10;
int b = 3;
System.out.println(a + b * 2);
System.out.println(a / b);
System.out.println(a % b);
System.out.println(a > b && b > 0);
System.out.println(a < b || b == 3);
```

Explain each output and the precedence used.

## Exercise 5 — SafeCustomerInput

Create variables for a customer name and plan price. Demonstrate:
- a null reference check using `&&`
- a ternary expression for a plan category
- a range check before narrowing a long to int
- a clear message when the input value is invalid

## Exercise 6 — Tech Lead refactor

Review this deliberately weak code and list at least five improvements:

```java
public class Billing {
    public static void main(String[] args) {
        double p = 499.99;
        double a = 99.99;
        boolean x = true;
        System.out.println(p + a);
        if (x == true) {
            System.out.println("yes");
        }
    }
}
```

Think about naming, currency precision, constants, encapsulation, input validation, testability and readable conditions.

---

# 13. Day 2 quiz — do not look up answers

Reply with your answers in this format: `1-B, 2-C, 3-A...`. I will evaluate your responses and explain every incorrect answer.

1. Which of these is a primitive type?
   - A. String
   - B. Integer
   - C. int
   - D. ArrayList

2. What is the result of `5 / 2` when both operands are int?
   - A. 2.5
   - B. 2
   - C. 3
   - D. Compile-time error

3. Which declaration is valid for a long literal larger than the int range?
   - A. `long id = 9000000000L;`
   - B. `long id = 9000000000;`
   - C. `int id = 9000000000L;`
   - D. `long id = "9000000000";`

4. What does `final` prevent?
   - A. Reading a variable
   - B. Assigning a variable more than once
   - C. Creating an object
   - D. Calling a method

5. What is the type of `byte + byte` in an arithmetic expression?
   - A. byte
   - B. short
   - C. int
   - D. long

6. What does `(int) 499.99` produce?
   - A. 500
   - B. 499
   - C. 499.99
   - D. Compile-time error

7. Which operator short-circuits when its left operand is false?
   - A. &
   - B. |
   - C. &&
   - D. ^

8. Which is the correct way to compare String content?
   - A. `first == second`
   - B. `first.equals(second)`
   - C. `first = second`
   - D. `first != second`

9. Which is true about `var`?
   - A. It makes Java dynamically typed
   - B. It can be used for class fields
   - C. The compiler infers a fixed local variable type from the initializer
   - D. It can be declared without an initializer

10. What is the recommended Java type for precise decimal money arithmetic?
    - A. double
    - B. float
    - C. BigDecimal
    - D. char

---

# 14. Completion checklist

- [ ] I can declare, initialize and reassign variables.
- [ ] I can name all eight primitive types.
- [ ] I can distinguish primitive and reference variables.
- [ ] I understand field defaults vs local variable definite assignment.
- [ ] I can explain final, static final and var.
- [ ] I can demonstrate widening and narrowing conversions.
- [ ] I understand integer division, numeric promotion and overflow.
- [ ] I can use arithmetic, assignment, comparison and logical operators.
- [ ] I can explain short-circuit evaluation and ternary expressions.
- [ ] I completed the six exercises.
- [ ] I attempted the 10-question quiz.

## Progress record

- Day 2 lesson started.
- Assessment: pending.
- Exercise code: pending review.
- Do not mark Day 2 complete until the learner has attempted the exercises/assessment and confirms the study session is complete.

**Next:** Day 3 — Conditional statements and loops (`if/else`, `switch`, `for`, `while`, `do-while`, `break` and `continue`).


---

# 15. Deeper technical concepts for interviews

This section goes beyond syntax. Interviewers often use these topics to check whether you understand Java's type system and runtime behaviour rather than only memorising definitions.

## 15.1 Scope and lifetime: local, instance and static variables

| Kind | Declared where? | Belongs to | Typical lifetime |
|---|---|---|---|
| Local variable | Inside a method/block | That method/block execution | Until the block/method execution ends |
| Instance field | Inside a class, outside methods, without `static` | An object instance | While the object remains reachable |
| Static field | Inside a class with `static` | The class/runtime class state | While the class is loaded, subject to class-loader lifecycle |

Example:

```java
public class Subscription {
    static int totalSubscriptions; // shared class field
    String customerName;            // per-object field

    void activate() {
        int activationCount = 1;     // local variable
        totalSubscriptions++;
        System.out.println(activationCount);
    }
}
```

Two Subscription objects have separate `customerName` fields, but they share the static `totalSubscriptions` field.

**Interview point:** Static does not mean "one global variable for the entire JVM in every situation." Static state belongs to a class as defined by its class loader. Different class loaders can load separate copies of the same class.

## 15.2 Primitive values and object references: what is stored?

A primitive variable stores a primitive value. A reference variable stores a reference value that identifies an object. The Java language specification does not require a simple physical memory layout for every variable; do not claim that every local variable must live on the stack or every reference must be a raw memory address.

Example:

```java
int original = 10;
int copied = original;
copied = 20;
System.out.println(original); // 10

StringBuilder first = new StringBuilder("Plan");
StringBuilder second = first;
second.append(" A");
System.out.println(first); // Plan A
```

Why does the second example change what is observed through `first`? Both reference variables refer to the same mutable object.

## 15.3 Java is always pass-by-value

This is a classic interview topic.

```java
public class PassByValueDemo {
    static void changeNumber(int value) {
        value = 99;
    }

    static void appendText(StringBuilder value) {
        value.append(" Plus");
    }

    static void reassign(StringBuilder value) {
        value = new StringBuilder("Different");
    }

    public static void main(String[] args) {
        int number = 10;
        changeNumber(number);
        System.out.println(number); // 10

        StringBuilder plan = new StringBuilder("Prepaid");
        appendText(plan);
        System.out.println(plan); // Prepaid Plus

        reassign(plan);
        System.out.println(plan); // Prepaid Plus
    }
}
```

The method receives a copy of the argument value. For an object argument, that copied value is the reference. The method can mutate the shared object, but reassigning its local parameter does not change the caller's variable.

**Strong interview answer:** "Java is always pass-by-value. For object arguments, the value copied is the object reference; therefore, the method can mutate the referenced object, but it cannot replace the caller's reference by reassigning its parameter."

## 15.4 Wrapper classes, boxing and unboxing

Each primitive has a corresponding wrapper class:

| Primitive | Wrapper |
|---|---|
| byte | Byte |
| short | Short |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |
| char | Character |
| boolean | Boolean |

Autoboxing converts a primitive to its wrapper; unboxing converts a wrapper to its primitive.

```java
int primitiveId = 1001;
Integer wrapperId = primitiveId; // autoboxing
int anotherId = wrapperId;       // unboxing
```

Wrappers are needed in generic collections:

```java
// List<int> is invalid because generic type arguments must be reference types
// List<Integer> is valid
```

**Null trap:** Unboxing a null wrapper throws `NullPointerException`.

```java
Integer optionalCount = null;
// int count = optionalCount; // NullPointerException at runtime
```

Use wrappers when nullability or generic APIs require them; use primitives for ordinary non-null numeric/boolean values when suitable.

## 15.5 Floating-point precision

Binary floating-point types represent values using a finite binary format. Many decimal fractions cannot be represented exactly.

```java
double result = 0.1 + 0.2;
System.out.println(result); // commonly prints 0.30000000000000004
```

This is not a Java bug; it is a property of binary floating-point representation.

For approximate scientific/measurement calculations, float or double can be appropriate. For currency, use `BigDecimal` and define scale and rounding explicitly.

## 15.6 BigDecimal: scale, rounding and comparison

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

BigDecimal amount = new BigDecimal("10.125");
BigDecimal rounded = amount.setScale(2, RoundingMode.HALF_UP);
System.out.println(rounded); // 10.13
```

Important details:
- Prefer `new BigDecimal("10.25")` or `BigDecimal.valueOf(10.25)`; avoid `new BigDecimal(10.25)` because it imports the exact binary floating-point approximation.
- `BigDecimal` is immutable: operations return a new value.
- `compareTo()` compares numerical magnitude while ignoring scale differences for equality of magnitude.
- `equals()` considers both value and scale.

```java
BigDecimal x = new BigDecimal("10.0");
BigDecimal y = new BigDecimal("10.00");

System.out.println(x.equals(y));    // false
System.out.println(x.compareTo(y)); // 0
```

For billing, agree on currency, rounding mode, tax calculation order, scale and when rounding occurs. These are business rules, not merely Java syntax choices.

## 15.7 Compound assignment and implicit narrowing

This often surprises candidates:

```java
byte value = 10;
// value = value + 1; // compile-time error: expression is int
value += 1;           // valid: compound assignment includes an implicit cast
System.out.println(value); // 11
```

The compound assignment operator includes an implicit conversion back to the left-hand variable's type. This can hide narrowing and overflow. Do not rely on it blindly for critical numeric logic.

## 15.8 Character arithmetic

A `char` is an unsigned 16-bit UTF-16 code unit. It can participate in numeric operations and is promoted to int in arithmetic expressions.

```java
char letter = 'A';
int codeUnit = letter;
System.out.println(codeUnit); // 65
System.out.println((char) (letter + 1)); // B
```

For supplementary Unicode characters, a single visible character can require two UTF-16 code units (a surrogate pair). For general Unicode text processing, be careful not to assume one `char` always equals one user-perceived character.

## 15.9 Evaluation order and side effects

Java evaluates operands from left to right. However, code that changes a variable multiple times inside one expression can be difficult to understand.

Avoid code like:

```java
int count = 1;
int result = count++ + ++count; // legal but unnecessarily confusing
```

Prefer:

```java
int count = 1;
count++;
count++;
int result = count + count;
```

Readable code is easier to debug, review and maintain.

## 15.10 Bit masks and flags — practical use

Bitwise operators are useful when multiple independent boolean flags must be packed into an integer.

```java
final int CAN_RENEW = 1;    // binary 0001
final int CAN_UPGRADE = 2;  // binary 0010
final int HAS_ESIM = 4;     // binary 0100

int permissions = CAN_RENEW | HAS_ESIM;

boolean canRenew = (permissions & CAN_RENEW) != 0;
boolean hasEsim = (permissions & HAS_ESIM) != 0;

System.out.println(canRenew); // true
System.out.println(hasEsim);  // true
```

Use named constants and parentheses. Do not use bit masks when a clearer enum or domain model is more appropriate.

---

# 16. Technical interview output challenges

Try to predict the output before running each snippet. Interviewers often ask "What will this print, and why?"

## Challenge 1 — Integer division and casting

```java
int a = 7;
int b = 2;
System.out.println(a / b);
System.out.println((double) (a / b));
System.out.println((double) a / b);
```

Expected output:

```text
3
3.0
3.5
```

Explanation: In the second line, integer division happens before the cast. In the third line, one operand becomes double before division.

## Challenge 2 — Overflow

```java
byte value = 127;
value++;
System.out.println(value);
```

Expected output:

```text
-128
```

Explanation: The byte range is -128 through 127. Incrementing 127 wraps to -128.

## Challenge 3 — Short circuit

```java
int calls = 0;
boolean result = false && (++calls > 0);
System.out.println(result);
System.out.println(calls);
```

Expected output:

```text
false
0
```

Explanation: The right side of `&&` is skipped when the left side is false.

## Challenge 4 — Reference equality

```java
String a = new String("TELUS");
String b = new String("TELUS");
System.out.println(a == b);
System.out.println(a.equals(b));
```

Expected output:

```text
false
true
```

Explanation: `==` checks reference identity; `equals()` checks String content.

## Challenge 5 — final reference

```java
final StringBuilder builder = new StringBuilder("Java");
builder.append(" Tech Lead");
System.out.println(builder);
```

Expected output:

```text
Java Tech Lead
```

Explanation: The reference cannot be reassigned, but the referenced StringBuilder object remains mutable.

## Challenge 6 — Compound assignment

```java
byte number = 10;
number += 5;
System.out.println(number);
```

Expected output:

```text
15
```

Explanation: Compound assignment includes an implicit cast to the left-hand type. Be alert to overflow when the result exceeds the type's range.

---

# 17. Additional interview questions — intermediate and senior level

## Q25. Where are local variables and objects stored in memory?

Do not give an oversimplified absolute answer. The JVM specification defines runtime data areas, but implementation optimizations can change physical placement. Conceptually, each thread has a JVM stack containing frames for method invocations, while objects are generally allocated in the heap. Escape analysis and JIT optimizations may eliminate allocations or scalar-replace objects. Explain the conceptual model first, then mention implementation optimizations.

## Q26. Why do Java collections use Integer instead of int?

Generics require reference types as type arguments. Wrapper classes such as Integer allow primitive values to be represented as objects in generic collections, with autoboxing/unboxing making usage convenient.

## Q27. What is autoboxing and what performance issue can it cause?

Autoboxing automatically converts a primitive to its wrapper object. In hot loops or large data processing, repeated boxing can create extra allocations or unboxing work. Prefer primitive-specialized APIs or primitive arrays where profiling shows it matters.

## Q28. What happens when you unbox null?

A NullPointerException occurs because Java cannot extract a primitive value from a null wrapper reference.

## Q29. Why can double not exactly represent 0.1?

A finite binary floating-point representation cannot exactly encode many decimal fractions. The stored value is the nearest representable binary value.

## Q30. What is the difference between BigDecimal equals and compareTo?

`equals` compares numerical value and scale; `compareTo` compares numerical magnitude. For example, 10.0 and 10.00 are unequal by equals but compare as zero.

## Q31. What is the difference between ++i and i++?

Both increment i. Prefix increment returns the incremented value; postfix returns the previous value and then increments. Prefer using increment as a separate statement for readability.

## Q32. Does a cast guarantee that the value fits?

No. Narrowing casts can discard fractional parts or overflow/wrap integral values. Validate bounds before conversion.

## Q33. Why is byte + byte an int?

Java's binary numeric promotion promotes byte, short and char operands to int for most arithmetic operations.

## Q34. What is the difference between && and & in Java?

For booleans, && short-circuits and & evaluates both operands. For integral values, & performs bitwise AND. && only accepts boolean operands.

## Q35. Is the right-hand side always evaluated in a logical expression?

No. && skips the right side if the left is false; || skips it if the left is true. This is short-circuit evaluation.

## Q36. What does static mean for a variable?

A static field belongs to the class rather than to an individual instance. It is shared by instances of that class loaded by the same class loader.

## Q37. Is final the same as immutable?

No. final prevents reassignment of a variable/reference. Immutability means an object's state cannot change after construction. An object referenced by a final variable can still be mutable.

## Q38. Can var be used for fields or method parameters?

No. Local variable type inference with var is not permitted for fields or method parameters. The compiler must infer the local variable's type from its initializer.

## Q39. Why should a Tech Lead avoid clever operator expressions?

They can obscure evaluation order and side effects, increasing the chance of defects and making reviews harder. Prefer explicit, readable statements and tests.

## Q40. How would you prevent numeric overflow in a billing or usage system?

Choose types with sufficient range, validate external input, use `Math.addExact`/related exact methods where suitable, define domain limits, and test boundary values. For currency, use BigDecimal with explicit rounding policy.

## Q41. How would you decide between int, long, BigInteger and BigDecimal?

Use int for ordinary bounded integer values; long for larger integral ranges; BigInteger for integers beyond long's range; BigDecimal for precise decimal arithmetic such as money. Choose based on domain semantics, not habit.

## Q42. What is the difference between a primitive and its wrapper in null handling?

A primitive cannot be null and always has a primitive value when definitely assigned. A wrapper is an object reference and may be null. This distinction matters when mapping optional database/API fields.

---

# 18. Code review: production-minded billing example

The following example illustrates several Day 2 principles together. It is still a learning example, not a complete tax or invoicing implementation.

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

public class SubscriptionInvoice {
    private static final BigDecimal TAX_RATE = new BigDecimal("0.18");

    public static void main(String[] args) {
        BigDecimal planPrice = new BigDecimal("499.00");
        BigDecimal addonPrice = new BigDecimal("99.00");
        BigDecimal discount = new BigDecimal("50.00");

        BigDecimal subtotal = planPrice.add(addonPrice);
        BigDecimal taxableAmount = subtotal.subtract(discount);

        if (taxableAmount.signum() < 0) {
            throw new IllegalArgumentException("Discount cannot exceed subtotal");
        }

        BigDecimal tax = taxableAmount
                .multiply(TAX_RATE)
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal grandTotal = taxableAmount.add(tax);

        System.out.println("Subtotal: " + subtotal);
        System.out.println("Discount: " + discount);
        System.out.println("Tax: " + tax);
        System.out.println("Grand total: " + grandTotal);
    }
}
```

Review points:
1. Meaningful names make the business calculation understandable.
2. `static final` is used for the fixed tax rate in this example.
3. BigDecimal is constructed from strings.
4. BigDecimal operations return new objects, so each result is assigned.
5. Negative taxable amount is rejected.
6. Rounding mode and scale are explicit.
7. Real tax rules, jurisdiction, currency and rounding stage must come from business requirements.
8. Keep imports minimal; remove any import that the class does not use.

---

# 19. Boundary-value test ideas

A senior developer should not test only happy-path values. For these Day 2 topics, consider:

| Area | Test values / cases |
|---|---|
| int range | `Integer.MIN_VALUE`, `Integer.MAX_VALUE`, one step beyond via long |
| byte cast | 127, 128, -128, -129 |
| parsing | valid text, empty text, whitespace, alphabetic text, very large number |
| null references | null and non-null |
| division | zero divisor, integer division, decimal division |
| BigDecimal | 10.0 vs 10.00, rounding ties, negative amounts |
| eligibility | active + paid, active + unpaid, inactive + paid, inactive + unpaid |
| long to int | within range, exactly at limits, outside limits |

Remember: integer division by zero throws ArithmeticException; floating-point division by zero follows floating-point rules and can produce infinity or NaN.

---

# 20. Day 2 interview preparation checklist

You should be able to explain these without reading notes:

- [ ] Eight primitive types, sizes and practical choices.
- [ ] Primitive vs reference type and null.
- [ ] Field default values vs local definite assignment.
- [ ] Local vs instance vs static variable scope.
- [ ] final vs static final vs immutable object.
- [ ] var and why it is still statically typed.
- [ ] Wrapper classes, autoboxing, unboxing and null-unboxing risk.
- [ ] Widening vs narrowing and possible precision/range loss.
- [ ] Numeric promotion and compound assignment.
- [ ] Integer division, floating-point precision and overflow.
- [ ] BigDecimal construction, immutability, scale, rounding, equals vs compareTo.
- [ ] Arithmetic, assignment, unary, relational, logical, ternary and bitwise operators.
- [ ] Short-circuit evaluation and side effects.
- [ ] Java pass-by-value, including object references.
- [ ] Boundary-value test cases and production code review considerations.

**Senior/Tech Lead expectation:** Do not stop at "the compiler accepts it." Explain correctness, edge cases, readability, performance implications where relevant, test strategy and the business consequences of a wrong type or rounding rule.
