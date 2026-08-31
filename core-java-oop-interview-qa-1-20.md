# Java Full-Stack Interview Q&A (Questions 1–20)

Core Java & OOPs

---

### 1. What is the difference between JDK, JRE, and JVM?

These three terms are related to running Java programs.

Think of it like this: **JDK → JRE → JVM**

**JVM — Java Virtual Machine**

JVM is the **machine/software that actually runs Java bytecode**.

When we write:

```java
System.out.println("Hello");
```

Java doesn't directly run this source code. First, it is converted into **bytecode**:

```text
.java → .class
```

The `.class` file contains bytecode. The JVM reads this bytecode and runs it on the computer.

**JRE — Java Runtime Environment**

JRE provides everything needed to **run** a Java program.

It contains:

```text
JRE
 └── JVM
     └── Java libraries
```

So: **JRE = JVM + required Java libraries**

If you only want to run a Java application, JRE is what you conceptually need.

**JDK — Java Development Kit**

JDK is used when you want to **develop Java programs**.

It contains:

```text
JDK
 ├── JRE
 │    └── JVM
 └── Development tools
      ├── javac
      ├── java
      └── other tools
```

For example, `javac` is the Java compiler. It converts:

```text
Program.java
     ↓
   javac
     ↓
Program.class
```

**Simple example**

Imagine you're cooking:

* **JDK** = complete kitchen + cooking equipment
* **JRE** = kitchen needed to prepare/eat the food
* **JVM** = the actual machine that processes/runs the food

**In short**

| JDK                            | JRE                        | JVM                         |
| ------------------------------- | --------------------------- | ----------------------------- |
| Used to develop Java programs   | Used to run Java programs   | Actually executes bytecode    |
| Contains JRE                    | Contains JVM                 | Part of JRE                   |
| Has compiler and tools          | Has libraries and runtime    | Converts/executes bytecode    |

**Interview answer**

> JDK is used for developing Java applications, JRE provides the environment to run them, and JVM is responsible for executing Java bytecode.

---

### 2. Why is Java platform-independent?

This is one of the most important features of Java.

Normally, programs written for one operating system may not work on another. For example:

```text
Windows program → Windows
Linux program   → Linux
```

But Java works differently.

**Step 1: Write Java code**

```java
class Hello {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

This is stored as `Hello.java`.

**Step 2: Compile it**

The Java compiler converts it into **bytecode**:

```text
Hello.java
    ↓
  javac
    ↓
Hello.class
```

The `.class` file contains bytecode.

**Step 3: JVM runs the bytecode**

Different operating systems have different JVM implementations.

```text
             Hello.class
                 ↓
        ┌────────┼────────┐
        ↓        ↓        ↓
    Windows JVM Linux JVM Mac JVM
        ↓        ↓        ↓
     Windows    Linux     macOS
```

The Java bytecode stays the same. Only the JVM is different.

That's why Java follows:

> **Write Once, Run Anywhere (WORA)**

**Important point**

Java is not completely independent of the operating system.

The **JVM is platform-dependent**, but the **Java bytecode is platform-independent**.

**Interview answer**

> Java is platform-independent because Java source code is compiled into platform-independent bytecode, which can run on any operating system that has a compatible JVM.

---

### 3. Why isn't Java 100% object-oriented?

Java is mostly object-oriented, but it is **not completely object-oriented**.

The main reason is that Java supports **primitive data types**.

Examples:

```java
int
char
double
float
boolean
byte
short
long
```

These are not objects. For example:

```java
int age = 20;
```

`age` is a primitive value, not an object.

In a purely object-oriented language, everything would be treated as an object.

Java also allows `static` members that can be accessed using the class rather than an object.

For example:

```java
Math.max(10, 20);
```

We don't need to create a `Math` object.

**But Java provides wrapper classes**

Java provides object versions of primitives:

```text
int     → Integer
double  → Double
char    → Character
boolean → Boolean
```

For example:

```java
int x = 10;

Integer y = 10;
```

`x` is primitive. `y` is an object.

**Interview answer**

> Java is not 100% object-oriented because it supports primitive data types such as int, char, boolean, and double, which are not objects.

---

### 4. What is the difference between `==` and `.equals()`?

Both are used for comparison, but they are generally used for **different purposes**.

**`==`**

For primitive values, `==` compares the actual values.

```java
int a = 10;
int b = 10;

System.out.println(a == b);
```

Output: `true`

For objects, `==` generally checks whether both references point to the **same object**.

Example:

```java
String a = new String("Hello");
String b = new String("Hello");

System.out.println(a == b);
```

Output: `false`

Because there are two different String objects.

**`.equals()`**

`.equals()` is generally used to compare the **content/value of objects**, depending on how the class implements it.

```java
String a = new String("Hello");
String b = new String("Hello");

System.out.println(a.equals(b));
```

Output: `true`

Because both Strings contain "Hello".

**Easy way to remember**

```text
==       → Are they the same reference?
.equals  → Do they have the same content?
```

**Important exception**

The exact behavior of `.equals()` depends on the class. For example, a class can override `.equals()` to define what "equal" means.

**Interview answer**

> `==` compares primitive values or object references, while `.equals()` is used to compare object contents or logical equality when the class implements it accordingly.

---

### 5. What is the difference between String, StringBuilder, and StringBuffer?

All three are used to work with text.

The major difference is whether the text can be changed and how they behave with multiple threads.

**String**

`String` is **immutable**. Immutable means once a String object is created, its content cannot be changed.

Example:

```java
String name = "Kiru";

name = name + " Kumar";
```

It looks like we changed the String. Actually, Java creates a **new String**. The original String remains unchanged.

Example:

```java
String s = "Hello";

s.concat(" World");

System.out.println(s);
```

Output: `Hello` — because `concat()` creates a new String.

**StringBuilder**

`StringBuilder` is **mutable**. That means we can modify the same object.

```java
StringBuilder sb = new StringBuilder("Hello");

sb.append(" World");

System.out.println(sb);
```

Output: `Hello World`

StringBuilder is generally faster when repeatedly modifying strings.

**StringBuffer**

`StringBuffer` is also mutable. But its methods are **synchronized**, which makes it safer for certain multithreaded situations.

The synchronization can make it slower than StringBuilder.

**Simple comparison**

| Feature                        | String       | StringBuilder            | StringBuffer                  |
| -------------------------------- | ------------- | --------------------------- | -------------------------------- |
| Mutable?                         | No            | Yes                          | Yes                               |
| Thread-safe?                     | Immutable     | No                           | Yes, generally                   |
| Performance for modifications    | Slower        | Faster                       | Usually slower than Builder      |
| Common use                       | Normal text   | Frequent modifications      | Multithreaded modifications      |

**Easy memory trick**

```text
String       → Can't change
StringBuilder → Can change, fast
StringBuffer → Can change, synchronized
```

---

### 6. What are the four main pillars of OOP?

OOP means: **Object-Oriented Programming**

There are four major concepts:

```text
1. Encapsulation
2. Inheritance
3. Polymorphism
4. Abstraction
```

**1. Encapsulation**

Encapsulation means **putting data and methods together inside a class and controlling access to the data**.

Example:

```java
class BankAccount {

    private double balance;

    public void deposit(double amount) {
        balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

`balance` is private. Other classes cannot directly modify it. They have to use methods. This protects the data.

**2. Inheritance**

Inheritance means one class can **reuse properties and methods of another class**.

Example:

```java
class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking");
    }
}
```

Dog gets `eat()` from Animal.

```text
Animal
  ↑
 Dog
```

**3. Polymorphism**

Polymorphism means: **One thing can have multiple forms.**

Two common types:

*Compile-time polymorphism* — method overloading.

```java
add(int a, int b)
add(int a, int b, int c)
```

*Runtime polymorphism* — method overriding.

```java
Animal a = new Dog();
a.sound();
```

The Dog's version can execute at runtime.

**4. Abstraction**

Abstraction means **hiding unnecessary implementation details and showing only what is necessary**.

For example, when you use:

```java
car.start();
```

You don't need to know every internal engine operation.

Java achieves abstraction using:

* abstract classes
* interfaces

**Easy memory trick**

```text
Encapsulation → Protect data
Inheritance   → Reuse code
Polymorphism  → Many forms
Abstraction   → Hide complexity
```

---

### 7. What is the difference between method overloading and overriding?

These are two important forms of polymorphism.

**Method Overloading**

Overloading means having **multiple methods with the same name but different parameters** in the same class.

Example:

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}
```

Both methods are called `add()`, but their parameters are different.

Overloading happens at compile time.

**Method Overriding**

Overriding happens when a child class provides its own implementation of a method inherited from the parent.

Example:

```java
class Animal {

    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Bark");
    }
}
```

Dog changes the behavior of `sound()`.

Overriding happens at runtime.

**Comparison**

| Overloading                  | Overriding                    |
| ------------------------------- | -------------------------------- |
| Same method name                | Same method signature            |
| Different parameters            | Same parameters                  |
| Usually same class              | Parent-child relationship        |
| Compile-time                    | Runtime                          |
| Provides multiple versions      | Changes inherited behavior       |

**Easy memory trick**

```text
Overloading  → Same name, different parameters
Overriding   → Child changes parent method
```

---

### 8. What is the purpose of the `static` keyword?

`static` means something belongs to the **class rather than individual objects**.

Suppose:

```java
class Student {

    static String college = "VIT";
    String name;
}
```

If we create:

```java
Student s1 = new Student();
Student s2 = new Student();
```

Both students share `college = VIT`. There is only one static `college` variable associated with the class.

Without `static`, every object would have its own copy.

**Static method**

Example:

```java
class Calculator {

    static int add(int a, int b) {
        return a + b;
    }
}
```

We can call it without creating an object:

```java
Calculator.add(10, 20);
```

**Static block**

Java also allows:

```java
static {
    System.out.println("Hello");
}
```

A static block is executed when the class is initialized.

**Common uses of static**

* Class variables
* Utility methods
* Constants
* Static initialization

**Interview answer**

> `static` makes a member belong to the class instead of individual objects, so it can generally be accessed without creating an object.

---

### 9. Can you override a static method?

**No, static methods cannot be overridden in the normal runtime-polymorphism sense.** They can be **hidden**.

Example:

```java
class Parent {

    static void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {

    static void show() {
        System.out.println("Child");
    }
}
```

This is not method overriding. It is called **method hiding**.

Why? Because static methods belong to the class, not to objects.

For example:

```java
Parent.show();
```

calls Parent's method.

```java
Child.show();
```

calls Child's method.

**Important**

The method selected depends on the **reference/class type**, not runtime object polymorphism.

**Interview answer**

> Static methods cannot be overridden because they belong to the class rather than an object. A static method in a child class with the same signature hides the parent method instead.

---

### 10. What is a constructor, and can constructors be overloaded?

A constructor is a special part of a class used to **initialize an object**.

Example:

```java
class Student {

    String name;

    Student() {
        name = "Unknown";
    }
}
```

When we write:

```java
Student s = new Student();
```

the constructor runs.

**Rules of constructors**

A constructor:

* has the same name as the class
* doesn't have a return type
* runs when an object is created
* is used to initialize an object

**Can constructors be overloaded?**

**Yes.**

Example:

```java
class Student {

    String name;
    int age;

    Student() {
        name = "Unknown";
    }

    Student(String name) {
        this.name = name;
    }

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

Now we have three constructors. This is called **constructor overloading**.

**Important**

Constructors are **not inherited** and cannot be overridden.

---

### 11. What is the difference between an abstract class and an interface?

Both are used to achieve **abstraction**, but they work differently.

**Abstract class**

An abstract class is a class that cannot normally be directly instantiated.

Example:

```java
abstract class Animal {

    abstract void sound();

    void eat() {
        System.out.println("Eating");
    }
}
```

It can contain:

* abstract methods
* normal methods
* variables
* constructors
* static methods, etc.

A child class can extend it:

```java
class Dog extends Animal {

    void sound() {
        System.out.println("Bark");
    }
}
```

**Interface**

An interface is mainly used to define a **contract**: what a class should provide.

Example:

```java
interface Vehicle {

    void start();
}
```

A class implements it:

```java
class Car implements Vehicle {

    public void start() {
        System.out.println("Car started");
    }
}
```

Modern Java interfaces can also contain `default` and `static` methods, among other features.

**Main difference**

| Abstract class                            | Interface                                                                    |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| Extended using `extends`                     | Implemented using `implements`                                                   |
| Can have constructors                        | Cannot be instantiated and doesn't have constructors like classes                |
| Can have instance variables                  | Fields are constants (`public static final`)                                     |
| Can contain abstract + concrete methods      | Can define abstract methods plus features such as default/static methods         |
| A class can extend one class                 | A class can implement multiple interfaces                                        |

**Simple way to remember**

Abstract class: "This is a general type of object."

Interface: "This is something the class promises to do."

---

### 12. What are access modifiers?

Access modifiers control **who can access a class, variable, method, or constructor**.

Java has four main access levels:

```text
public
protected
default
private
```

**1. public** — accessible from anywhere, subject to normal class/module rules.

```java
public int age;
```

**2. private** — accessible only inside the same class.

```java
private int salary;
```

This is commonly used to protect data.

**3. protected** — accessible within the same package and also by subclasses under Java's protected-access rules.

```java
protected int marks;
```

**4. default** — if you don't write an access modifier:

```java
int age;
```

it has **package-private/default access**. It can be accessed within the same package.

**Simple table**

| Modifier   | Same class | Same package | Subclass                | Other package                |
| ----------- | ----------- | ------------- | ------------------------- | ------------------------------- |
| private     | ✅          | ❌            | ❌                        | ❌                               |
| default     | ✅          | ✅            | Via package membership    | ❌                               |
| protected   | ✅          | ✅            | ✅                        | Limited through inheritance     |
| public      | ✅          | ✅            | ✅                        | ✅                               |

**Easy memory**

```text
private   → Only me
default   → My package
protected → Package + child classes
public    → Everyone
```

---

### 13. What are wrapper classes? Explain autoboxing/unboxing.

Java has primitive data types:

```java
int
double
char
boolean
```

But sometimes Java needs an **object** instead of a primitive. So Java provides wrapper classes.

**Examples**

| Primitive | Wrapper   |
| ----------- | ----------- |
| int         | Integer     |
| double      | Double      |
| char        | Character   |
| boolean     | Boolean     |
| float       | Float       |
| long        | Long        |
| byte        | Byte        |
| short       | Short       |

**Why do we need them?**

For example, collections work with objects. You cannot use:

```java
ArrayList<int>
```

Instead:

```java
ArrayList<Integer>
```

**Autoboxing**

Converting a primitive into its wrapper object automatically.

```java
int x = 10;

Integer y = x;
```

Java automatically converts `int → Integer`. This is **autoboxing**.

**Unboxing**

Converting a wrapper object back into a primitive.

```java
Integer x = 10;

int y = x;
```

Java converts `Integer → int`. This is **unboxing**.

**Easy memory**

```text
Autoboxing → primitive → object
Unboxing   → object → primitive
```

---

### 14. What is the difference between ArrayList and LinkedList?

Both are classes that implement the `List` interface. They store multiple elements.

**ArrayList**

ArrayList internally uses a **resizable array**.

Imagine:

```text
[10][20][30][40][50]
```

Accessing an element by index is very fast.

```java
list.get(3);
```

is efficient. But inserting/removing elements in the middle may require shifting elements.

**LinkedList**

LinkedList stores elements as linked nodes.

Conceptually:

```text
[10] → [20] → [30] → [40]
```

Each node is connected to another node.

Accessing an arbitrary index requires traversing the list. But insertion/removal can be efficient when you already have the appropriate node/iterator position.

**Comparison**

| ArrayList                                       | LinkedList                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------ |
| Resizable array                                     | Linked nodes                                                        |
| Fast random access                                  | Slower random access                                                |
| Middle insertion/removal can require shifting       | Node insertion/removal can be efficient at a known position        |
| Usually preferred for general list usage            | Useful for certain insertion/removal-heavy patterns                |

**Important practical point**

Many beginners hear: "LinkedList is faster for insertion." That's incomplete.

If you have to **find the position first**, LinkedList still has to traverse the list.

For most normal applications, **ArrayList is the better default choice**.

---

### 15. How does a HashMap work internally?

This is a very common interview question.

A `HashMap` stores data in **key-value pairs**.

Example:

```java
HashMap<Integer, String> students = new HashMap<>();

students.put(101, "Kiru");
students.put(102, "Rahul");
```

Conceptually:

```text
101 → Kiru
102 → Rahul
```

**How does it find the value?**

Suppose we do:

```java
students.get(101);
```

HashMap doesn't normally search every key one by one. Instead, it uses the key's **hash**.

Conceptually:

```text
Key
 ↓
hashCode()
 ↓
Hash calculation
 ↓
Bucket
 ↓
Find key
 ↓
Value
```

**What is a bucket?**

Think of HashMap as having multiple boxes:

```text
Bucket 0
Bucket 1
Bucket 2
Bucket 3
Bucket 4
...
```

The hash of the key helps determine which bucket should contain the entry.

**What if two keys go to the same bucket?**

That's called a **collision**.

Java's HashMap handles collisions by storing multiple entries in the same bucket structure.

In modern Java implementations, heavily populated buckets can be converted into a **balanced tree structure** to improve lookup performance.

**Why are `equals()` and `hashCode()` important?**

HashMap uses both.

Suppose `key1.hashCode()` and `key2.hashCode()` are the same. They may end up in the same bucket.

HashMap then uses `equals()` to determine whether they are actually the same key.

**Important rule**

If two objects are equal according to `equals()`, they **must have the same `hashCode()`**.

**Simple flow**

```text
put(key, value)

      ↓
hashCode()
      ↓
Find bucket
      ↓
Check existing keys
      ↓
equals()
      ↓
Store/update entry
```

**Interview answer**

> HashMap stores key-value pairs and uses the key's hash code to determine a bucket. It then uses equality checks to identify the correct key. Collisions are handled within the bucket, and modern Java can use tree structures for heavily populated buckets.

---

### 16. What is the difference between checked and unchecked exceptions?

An exception is a problem that occurs while a program is running or being compiled/handled.

Java broadly divides exceptions into **checked** and **unchecked** categories.

**Checked exceptions**

Checked exceptions are checked by the compiler.

The programmer generally must either handle them using `try-catch`, or declare them using `throws`.

Example:

```java
FileReader file = new FileReader("test.txt");
```

This can cause `FileNotFoundException`. So Java forces you to deal with the possibility.

Example:

```java
try {
    FileReader file = new FileReader("test.txt");
}
catch (FileNotFoundException e) {
    System.out.println("File not found");
}
```

**Unchecked exceptions**

Unchecked exceptions are generally subclasses of `RuntimeException`.

The compiler does not force you to catch or declare them.

Example:

```java
int a = 10 / 0;
```

This causes `ArithmeticException`.

Another example:

```java
String name = null;

name.length();
```

This can cause `NullPointerException`.

**Comparison**

| Checked                                  | Unchecked                        |
| ------------------------------------------- | ------------------------------------ |
| Checked by compiler                         | Not forced by compiler               |
| Must generally be handled/declared          | Handling is optional                 |
| Often external/recoverable conditions       | Often programming errors             |
| Example: IOException                        | Example: NullPointerException        |

**Easy memory**

```text
Checked   → Compiler checks
Unchecked → Compiler doesn't force handling
```

---

### 17. What is the difference between `final`, `finally`, and `finalize()`?

These three names look similar but are completely different.

**`final`**

`final` is a keyword. It can be used with variables, methods, and classes.

*Final variable*

```java
final int age = 20;
```

You cannot assign another value to `age`.

```java
age = 25;  // Error
```

*Final method*

```java
final void display() {
}
```

A child class cannot override that method.

*Final class*

```java
final class Student {
}
```

Another class cannot extend it.

**`finally`**

`finally` is a block used with exception handling.

Example:

```java
try {
    System.out.println("Try");
}
catch (Exception e) {
    System.out.println("Error");
}
finally {
    System.out.println("Finally");
}
```

The `finally` block is generally used for cleanup work and is designed to run when control leaves the try/catch structure, subject to exceptional situations such as JVM termination.

For example:

```java
finally {
    // close resources
}
```

**`finalize()`**

`finalize()` was an old mechanism associated with garbage collection for cleanup before an object was reclaimed.

It is **deprecated and should not be used in modern Java**.

Modern Java applications should use mechanisms such as `try-with-resources` for resource cleanup.

**Easy memory trick**

```text
final     → Restriction
finally   → Exception cleanup block
finalize  → Old/deprecated GC-related mechanism
```

---

### 18. What is a functional interface?

A functional interface is an interface that has **exactly one abstract method**.

Example:

```java
@FunctionalInterface
interface Calculator {
    int add(int a, int b);
}
```

It has only one abstract method, `add()`. Therefore, it is a functional interface.

**Why is it useful?**

Functional interfaces are commonly used with **lambda expressions**.

For example:

```java
Calculator c = (a, b) -> a + b;
```

Now:

```java
c.add(10, 20);
```

returns `30`.

**Common built-in functional interfaces**

Java provides many:

```text
Predicate
Function
Consumer
Supplier
```

For example, `Predicate<Integer>` can represent something that takes an integer and returns `true` or `false`.

**Important**

A functional interface can still have:

* one abstract method
* multiple default methods
* multiple static methods

The requirement is specifically **one abstract method**.

`@FunctionalInterface` is an annotation that tells the compiler to check that rule.

---

### 19. What are Lambda expressions?

Lambda expressions were introduced to make it easier to write **small pieces of behavior/functions**, especially when working with functional interfaces.

Instead of writing a complete class or anonymous implementation:

```java
Calculator c = new Calculator() {

    public int add(int a, int b) {
        return a + b;
    }
};
```

we can write:

```java
Calculator c = (a, b) -> a + b;
```

Much shorter.

**Lambda syntax**

Generally:

```text
(parameters) -> expression
```

Example:

```java
(a, b) -> a + b
```

Another example:

```java
name -> System.out.println(name)
```

Multiple statements can use `{}`:

```java
(a, b) -> {
    int result = a + b;
    return result;
}
```

**Where are lambdas used?**

They are heavily used with:

* Collections
* Streams
* Functional interfaces
* Event handling
* Filtering
* Sorting

Example:

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

numbers.forEach(n -> System.out.println(n));
```

The lambda `n -> System.out.println(n)` tells Java what to do with each number.

**Easy definition**

> A lambda expression is a short way of representing behavior that can be passed around, usually as an implementation of a functional interface.

---

### 20. What is the role of Garbage Collection?

Garbage Collection, usually called **GC**, is Java's automatic memory management system.

When we create objects:

```java
Student s = new Student();
```

memory is allocated for that object.

Eventually, the object may no longer be needed. For example:

```java
Student s = new Student();

s = null;
```

The original Student object may now be **unreachable**.

Java's Garbage Collector can identify objects that are no longer reachable and reclaim their memory.

Conceptually:

```text
Create object
     ↓
Object uses memory
     ↓
Object becomes unreachable
     ↓
Garbage Collector identifies it
     ↓
Memory can be reclaimed
```

**Why is GC useful?**

In languages where memory is manually managed, programmers may need to explicitly free memory.

Java handles much of this automatically. This reduces problems such as:

* forgetting to free memory
* many common forms of memory leaks
* dangling pointers from manual memory management

**Important point**

Garbage Collection does **not** mean: "Java can never have memory leaks."

Java applications can still retain references to objects they no longer need, preventing those objects from being garbage collected.

**Can we force GC?**

You may see:

```java
System.gc();
```

But this is only a **request/hint** to the JVM. It does not guarantee that garbage collection will immediately happen.

**Interview answer**

> Garbage Collection automatically identifies objects that are no longer reachable and reclaims the memory they occupy, reducing the need for manual memory management.
