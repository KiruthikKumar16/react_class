# Java Full-Stack Interview Q&A (Questions 81–140)

Advanced Core Java, JPA/Hibernate, Spring Security, and React

---

## Part 5: Advanced Core Java

### 81. What is the difference between List, Set, and Map in Java?

* **List** → ordered collection, duplicates allowed.
* **Set** → duplicates not allowed.
* **Map** → stores data as key-value pairs.

Example:

```java
List<String> names = new ArrayList<>();
names.add("Kiru");
names.add("Kiru");
```

Result:

```text
Kiru
Kiru
```

A Set:

```java
Set<String> names = new HashSet<>();
names.add("Kiru");
names.add("Kiru");
```

Result:

```text
Kiru
```

A Map:

```java
Map<Integer, String> students = new HashMap<>();

students.put(1, "Kiru");
students.put(2, "Rahul");
```

Here:

```text
1 → Kiru
2 → Rahul
```

**Easy memory**

> List = ordered items
> Set = unique items
> Map = key → value

---

### 82. ArrayList vs HashSet vs HashMap?

|            | ArrayList | HashSet       | HashMap     |
| ---------- | --------- | ------------- | ----------- |
| Stores     | Values    | Unique values | Key-value   |
| Duplicates | Yes       | No            | Keys no     |
| Access     | Index     | No index      | Key         |
| Example    | `[A,B,A]` | `[A,B]`       | `{1:A,2:B}` |

Use `ArrayList` when you need an ordered collection.

Use `HashSet` when uniqueness matters.

Use `HashMap` when you want to find a value using a key.

---

### 83. Comparable vs Comparator?

Both are used to **sort objects**.

**Comparable**

Used when the class itself defines its natural ordering.

```java
class Employee implements Comparable<Employee> {

    int salary;

    public int compareTo(Employee e) {
        return this.salary - e.salary;
    }
}
```

Now employees can naturally be sorted by salary.

**Comparator**

Used when you want to define sorting separately.

```java
Comparator<Employee> bySalary =
    (a, b) -> Double.compare(a.salary, b.salary);
```

You can create different comparators:

```text
By salary
By name
By age
By joining date
```

**Easy memory**

> Comparable = **I know how I should be sorted.**
> Comparator = **Someone else tells me how to sort.**

---

### 84. What is the String Pool in Java?

Java maintains a special area called the **String Pool** for string literals.

```java
String a = "Hello";
String b = "Hello";
```

Java can reuse the same pooled string object.

But:

```java
String c = new String("Hello");
```

explicitly creates a new String object.

That's why:

```java
a == b
```

can be `true`, while:

```java
a == c
```

is generally `false`.

For comparing string content, use:

```java
a.equals(c)
```

**Why?**

Because Strings are immutable and Java can safely reuse pooled string literals.

---

### 85. What is the difference between Heap and Stack memory?

Java uses different memory areas for different purposes.

**Stack**

Generally contains:

* method call information
* local variables
* references to objects

Example:

```java
void test() {
    int x = 10;
}
```

`x` is associated with the method's stack frame.

**Heap**

Objects are generally created in heap memory:

```java
Employee e = new Employee();
```

The object is stored in the heap.

Conceptually:

```text
Stack
  |
  | e ───────────→ Heap
                     Employee object
```

**Easy memory**

> Stack → method execution
> Heap → objects

---

### 86. What is an immutable class?

An immutable object **cannot be changed after it is created**.

The classic example is:

```java
String
```

For example:

```java
String name = "Kiru";
name = name + " Kumar";
```

The original `"Kiru"` String isn't modified. A new String is created.

**How can you make a class immutable?**

Common practices:

* make the class `final`
* make fields `private final`
* initialize fields through the constructor
* don't provide setters
* don't expose mutable internal objects directly

Example:

```java
public final class Student {

    private final String name;

    public Student(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

---

### 87. What is the difference between `throw` and `throws`?

**`throw`**

Actually throws an exception.

```java
throw new IllegalArgumentException("Invalid age");
```

**`throws`**

Declares that a method may throw an exception.

```java
void readFile() throws IOException {
    // ...
}
```

**Easy memory**

> `throw` = actually throw
> `throws` = warning/declaration

---

### 88. What are Java Streams?

Streams provide a way to **process collections in a clean, functional style**.

Example:

```java
List<Integer> numbers =
    Arrays.asList(1, 2, 3, 4, 5);
```

We can find even numbers:

```java
numbers.stream()
       .filter(n -> n % 2 == 0)
       .forEach(System.out::println);
```

Output:

```text
2
4
```

The Stream doesn't usually store the data itself. It processes data from a source such as a collection.

---

### 89. What are `map()`, `filter()`, and `reduce()` in Streams?

**filter()**

Keeps elements that satisfy a condition.

```java
numbers.stream()
       .filter(n -> n > 10);
```

**map()**

Transforms each element.

```java
numbers.stream()
       .map(n -> n * 2);
```

`5` becomes `10`.

**reduce()**

Combines multiple values into one result.

```java
int sum = numbers.stream()
                 .reduce(0, Integer::sum);
```

**Easy memory**

```text
filter → remove unwanted
map    → transform
reduce → combine
```

---

### 90. What is Optional in Java?

`Optional` is a container that can represent:

> A value exists OR a value doesn't exist.

Instead of directly returning `null`:

```java
Employee findEmployee(int id)
```

you might have:

```java
Optional<Employee> findEmployee(int id)
```

Then:

```java
Optional<Employee> employee =
    repository.findById(1L);
```

You can check:

```java
if (employee.isPresent()) {
    // employee exists
}
```

Or:

```java
employee.ifPresent(e -> System.out.println(e.getName()));
```

It helps make absence explicit, although it isn't a magic replacement for every use of `null`.

---

### 91. What is multithreading?

Multithreading means running multiple threads within a program so different tasks can make progress concurrently.

For example:

```text
Thread 1 → Download file
Thread 2 → Process data
Thread 3 → Handle user request
```

A thread is a path of execution within a process.

**Why use it?**

* improve responsiveness
* handle multiple tasks
* use multiple CPU cores where appropriate
* handle concurrent server requests

But concurrency also introduces challenges such as race conditions and synchronization.

---

### 92. What is the difference between a process and a thread?

**Process**

A process is a running program with its own operating-system resources and memory space.

**Thread**

A thread is an execution unit inside a process.

Conceptually:

```text
Process
 ├── Thread 1
 ├── Thread 2
 └── Thread 3
```

Threads in the same process generally share memory/resources, which makes communication easier but also creates synchronization problems.

**Easy memory**

> Process = running program
> Thread = worker inside the program

---

### 93. What is `synchronized` in Java?

`synchronized` helps control access to shared data when multiple threads are involved.

Example:

```java
public synchronized void increment() {
    count++;
}
```

It ensures that the synchronized method is not simultaneously executed by multiple threads on the same object monitor.

Without appropriate synchronization, two threads could update shared data incorrectly.

---

### 94. What is a race condition?

A race condition occurs when multiple threads access shared data concurrently and the result depends on **the timing/order of execution**.

Example:

```text
count = 10

Thread A reads 10
Thread B reads 10

Thread A writes 11
Thread B writes 11
```

You might expect:

```text
12
```

but get:

```text
11
```

because both threads used the same old value.

Synchronization and other concurrency mechanisms can help prevent such problems.

---

### 95. What is `ExecutorService`?

`ExecutorService` provides a higher-level way to manage threads and execute tasks.

Instead of manually creating lots of threads:

```java
new Thread(...).start();
```

you can use a thread pool:

```java
ExecutorService executor =
    Executors.newFixedThreadPool(5);

executor.submit(() -> {
    System.out.println("Task running");
});
```

The executor manages worker threads and tasks.

**Why useful?**

It can:

* reuse threads
* manage task execution
* limit concurrency
* return results using `Future`

---

### 96. What are Java 8+ important features?

Some major features introduced around Java 8 include:

* Lambda expressions
* Functional interfaces
* Stream API
* Default interface methods
* `Optional`
* Method references
* New Date/Time API

Modern Java versions added many more features, including:

* records
* pattern matching improvements
* switch expressions
* text blocks
* sealed classes
* virtual threads

For interviews, Java 8 concepts remain particularly important because they are heavily used in enterprise code.

---

### 97. What are default and static methods in interfaces?

An interface can contain a `default` method with an implementation.

```java
interface Vehicle {

    default void start() {
        System.out.println("Starting...");
    }
}
```

A class implementing the interface can use or override it.

An interface can also contain static methods:

```java
interface MathUtil {

    static int add(int a, int b) {
        return a + b;
    }
}
```

Call it using:

```java
MathUtil.add(2, 3);
```

---

### 98. What is garbage collection?

Garbage Collection automatically identifies objects that are no longer reachable and can reclaim their memory.

Example:

```java
Employee e = new Employee();
e = null;
```

The original Employee object may become eligible for garbage collection if nothing else references it.

You don't normally manually free Java objects like in C/C++.

**Important**

Garbage Collection:

> **helps manage memory automatically**

It does **not** mean you can ignore memory leaks or resource management. Things like database connections, files, and sockets still need proper handling.

---

### 99. What is the difference between a checked and unchecked exception?

**Checked exception**

Compiler requires you to handle or declare it.

Examples:

```text
IOException
SQLException
```

**Unchecked exception**

Usually subclasses of `RuntimeException`.

Examples:

```text
NullPointerException
IllegalArgumentException
ArithmeticException
```

The compiler doesn't force you to catch them.

**Easy memory**

> Checked → compiler checks handling
> Unchecked → compiler doesn't force handling

---

### 100. What is the difference between `final`, `finally`, and `finalize()`?

**final**

Used to prevent/change something.

```java
final int x = 10;
```

`x` cannot be reassigned.

Can also apply to:

* classes
* methods
* variables

**finally**

A block associated with exception handling:

```java
try {
    // code
} finally {
    // cleanup
}
```

**finalize()**

An old Java mechanism associated with object finalization.

It has been **deprecated for removal** and should not be used for normal resource management.

**Easy memory**

```text
final    → restriction
finally  → cleanup block
finalize → obsolete/deprecated mechanism
```

---

## Part 6: JPA, Hibernate & Spring Security

### 101. What is JPA vs Hibernate?

**JPA** is a Java specification/API for object-relational persistence.

**Hibernate** is a popular implementation of JPA.

Think:

```text
JPA
 ↓
Rules/API
 ↓
Hibernate
 ↓
Database
```

JPA defines concepts such as:

```java
@Entity
@Id
@OneToMany
```

Hibernate provides the implementation that actually performs the ORM work.

**Easy memory**

> JPA = specification
> Hibernate = implementation

---

### 102. What is an Entity in JPA?

An entity is a Java class that is mapped to a database table.

Example:

```java
@Entity
public class Employee {

    @Id
    private Long id;

    private String name;

    private double salary;
}
```

Conceptually:

```text
Employee Java class
        ↓
Employee database table
```

Each object generally represents a row.

---

### 103. What are `@OneToOne`, `@OneToMany`, `@ManyToOne`, and `@ManyToMany`?

They represent relationships between entities.

**One-to-One**

One person → one passport.

```text
Person 1 ─── 1 Passport
```

**One-to-Many**

One department → many employees.

```text
Department 1 ─── * Employees
```

**Many-to-One**

Many employees → one department.

```text
Employees * ─── 1 Department
```

**Many-to-Many**

Students can take many courses and courses can have many students.

```text
Students * ─── * Courses
```

---

### 104. What is lazy vs eager loading?

Suppose an Employee has a Department.

**Eager**

Related data is loaded immediately.

```text
Load Employee
     ↓
Immediately load Department
```

**Lazy**

Related data is loaded when it is actually accessed.

```text
Load Employee
     ↓
Department not loaded yet
     ↓
Access employee.getDepartment()
     ↓
Load Department
```

Lazy loading can reduce unnecessary database work, but careless use can contribute to N+1 queries.

---

### 105. What is `@JoinColumn`?

`@JoinColumn` tells JPA which database column is used to connect entities.

Example:

```java
@ManyToOne
@JoinColumn(name = "department_id")
private Department department;
```

This typically corresponds to:

```text
Employee
----------------
employee_id
department_id  ← foreign key
```

---

### 106. What is `mappedBy`?

`mappedBy` indicates that the relationship is managed by the **other side** of a bidirectional relationship.

Example:

```java
@OneToMany(mappedBy = "department")
private List<Employee> employees;
```

Here:

```text
Employee.department
```

is the owning side.

`mappedBy = "department"` tells JPA that the Department side doesn't own the database relationship.

---

### 107. What are Cascade types in JPA?

Cascade tells JPA whether certain operations should propagate from one entity to related entities.

Examples:

```text
PERSIST
MERGE
REMOVE
REFRESH
DETACH
ALL
```

For example:

```java
@OneToMany(cascade = CascadeType.ALL)
private List<Order> orders;
```

Certain operations on the parent can propagate to its orders.

**Important**

Be careful with:

```text
CascadeType.REMOVE
```

because deleting a parent could also delete related children.

---

### 108. What is JPQL?

JPQL stands for:

> Java Persistence Query Language

It looks like SQL, but it operates on **entities and their fields**, not directly on database tables/columns.

Example:

```java
@Query("SELECT e FROM Employee e WHERE e.salary > :salary")
List<Employee> findEmployees(@Param("salary") double salary);
```

Notice:

```text
Employee
salary
```

are entity concepts.

SQL:

```sql
SELECT * FROM employee
WHERE salary > 50000;
```

JPQL:

```text
SELECT e FROM Employee e WHERE e.salary > 50000
```

---

### 109. What is pagination?

Pagination means retrieving data in smaller chunks rather than loading everything at once.

Suppose you have:

```text
1,000,000 employees
```

You don't want your API to return all one million records.

Instead:

```text
Page 1 → 20 employees
Page 2 → 20 employees
Page 3 → 20 employees
```

Spring Data supports pagination using concepts such as:

```java
Pageable
Page<T>
```

This is important for large datasets.

---

### 110. What is the N+1 problem and how can you solve it?

Suppose you fetch:

```text
100 employees
```

and then access each employee's department.

You might accidentally produce:

```text
1 query → get employees
100 queries → get departments
```

Total:

```text
101 queries
```

That's the N+1 problem.

Possible solutions include:

* fetch joins
* entity graphs
* carefully designed queries
* batch fetching
* projections

Example JPQL:

```java
SELECT e
FROM Employee e
JOIN FETCH e.department
```

This can fetch the required related data in a more efficient way.

---

### 111. What is Spring Security?

Spring Security is a framework used to secure Spring applications.

It can handle:

* authentication
* authorization
* password encoding
* access control
* security filters
* session security
* OAuth2/resource-server scenarios
* JWT-based API security

Conceptually:

```text
Request
   ↓
Security
   ↓
Is user authenticated?
   ↓
Is user authorized?
   ↓
Controller
```

---

### 112. Authentication vs Authorization?

These are commonly confused.

**Authentication**

Answers:

> **Who are you?**

Example:

```text
Username + Password
```

**Authorization**

Answers:

> **What are you allowed to do?**

Example:

```text
Admin → Can delete users
User  → Cannot delete users
```

**Easy memory**

> Authentication = identity
> Authorization = permission

---

### 113. What is JWT?

JWT stands for:

> JSON Web Token

It is commonly used for stateless authentication.

A simplified flow:

```text
User
 ↓
Login
 ↓
Server verifies credentials
 ↓
Server creates JWT
 ↓
Client stores token
 ↓
Client sends token with future requests
 ↓
Server validates token
```

Typically:

```http
Authorization: Bearer <token>
```

A JWT contains encoded claims and a cryptographic signature. It should **not** be treated as encrypted secret storage by default.

---

### 114. What is password hashing?

Passwords should **not be stored as plain text**.

Bad:

```text
password = "hello123"
```

Instead, store a secure password hash using an appropriate password hashing algorithm.

In Spring Security, BCrypt is a commonly encountered option:

```java
BCryptPasswordEncoder
```

Conceptually:

```text
Password
   ↓
Hashing algorithm
   ↓
Stored hash
```

When the user logs in, the supplied password is checked against the stored hash.

---

### 115. What is a DTO?

DTO stands for:

> Data Transfer Object

It is an object used to transfer data between application layers or across an API.

Instead of directly returning your database entity:

```java
Employee
```

you might return:

```java
EmployeeResponse
```

Example:

```java
public class EmployeeResponse {
    private Long id;
    private String name;
}
```

**Why?**

It can:

* hide internal fields
* control API responses
* avoid exposing sensitive data
* separate API design from database structure

---

### 116. Why shouldn't we always return Entity directly from REST APIs?

Suppose Employee contains:

```text
id
name
salary
passwordHash
internalNotes
```

If you return the entity directly, you might accidentally expose fields that shouldn't be public.

Using a DTO:

```text
Employee Entity
      ↓
EmployeeResponse DTO
      ↓
JSON
```

lets you decide exactly what the frontend receives.

DTOs can also help avoid serialization problems with bidirectional relationships.

---

### 117. What is `@Valid` in Spring Boot?

`@Valid` triggers validation of an object using Jakarta Bean Validation annotations.

Example:

```java
public class EmployeeRequest {

    @NotBlank
    private String name;

    @Min(18)
    private int age;
}
```

Controller:

```java
@PostMapping("/employees")
public Employee create(
        @Valid @RequestBody EmployeeRequest request) {
    ...
}
```

If invalid data is sent, validation errors can be handled centrally.

---

### 118. What is unit testing?

Unit testing tests a **small isolated part** of an application.

For example:

```text
EmployeeService
```

You test whether:

```text
calculateSalary()
```

works correctly.

A common Java testing stack is:

```text
JUnit
+
Mockito
```

Mockito can create mock dependencies so the unit can be tested independently.

---

### 119. What is integration testing?

Integration testing checks whether multiple components work correctly together.

For example:

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```

A unit test might test only the Service.

An integration test may test several components together.

**Easy memory**

> Unit test = one small part
> Integration test = parts working together

---

### 120. What is the difference between Maven and Gradle?

Both are build and dependency-management tools commonly used in Java.

Maven uses:

```text
pom.xml
```

Gradle commonly uses:

```text
build.gradle
```

They can manage:

* dependencies
* compilation
* testing
* packaging
* plugins
* builds

Since you're working with Spring Boot, **Maven + `pom.xml`** is especially important to understand.

---

## Part 7: React

### 121. What is a React component?

A component is a reusable piece of UI.

Example:

```jsx
function Welcome() {
    return <h1>Hello Kiru</h1>;
}
```

You can use:

```jsx
<Welcome />
```

A large application can be built by combining many components:

```text
App
├── Navbar
├── Sidebar
├── ProductList
│   ├── ProductCard
│   ├── ProductCard
│   └── ProductCard
└── Footer
```

---

### 122. What is the difference between State and Props?

This is one of the **most important React questions**.

**Props**

Props are data passed from a parent component to a child.

```jsx
<User name="Kiru" />
```

Inside:

```jsx
function User(props) {
    return <h1>{props.name}</h1>;
}
```

Props are read-only from the child's perspective.

**State**

State is data managed by a component.

```jsx
const [count, setCount] = useState(0);
```

When state changes, React can re-render the component.

**Easy memory**

> Props → comes from parent
> State → managed by component

---

### 123. What is `useState()`?

`useState()` is a React Hook used to add state to a functional component.

```jsx
const [count, setCount] = useState(0);
```

Here:

```text
count    → current value
setCount → function to update it
0        → initial value
```

Example:

```jsx
<button onClick={() => setCount(count + 1)}>
    {count}
</button>
```

When `setCount()` is called, React schedules an update and re-renders as needed.

---

### 124. What is `useEffect()`?

`useEffect()` is used for **side effects** in a component.

Examples:

* API requests
* subscriptions
* timers
* interacting with external systems

Example:

```jsx
useEffect(() => {
    fetchUsers();
}, []);
```

The empty dependency array means the effect is intended to run after the component's initial mount (subject to React's development behavior such as Strict Mode).

---

### 125. What is `useRef()`?

`useRef()` gives you a mutable reference that persists between renders without itself causing a re-render when changed.

Example:

```jsx
const inputRef = useRef();

<input ref={inputRef} />
```

You can then access the DOM element:

```jsx
inputRef.current.focus();
```

It can also store mutable values that should persist across renders without triggering rendering.

---

### 126. What is `useMemo()`?

`useMemo()` can memoize a calculated value.

Example:

```jsx
const total = useMemo(() => {
    return calculateTotal(products);
}, [products]);
```

React can reuse the previous calculation until dependencies change.

**Important**

Don't use `useMemo()` everywhere.

It is a performance optimization, not something required for normal React code.

---

### 127. What is `useCallback()`?

`useCallback()` memoizes a function reference.

Example:

```jsx
const handleClick = useCallback(() => {
    console.log("Clicked");
}, []);
```

This can be useful when passing callbacks to memoized child components or when a stable function reference matters.

Again:

> It's a performance optimization, not something you should automatically use for every function.

---

### 128. What is the Virtual DOM?

The Virtual DOM is a conceptual in-memory representation of UI used by React.

When state or props change, React determines what the UI should look like and calculates an efficient update to the actual DOM.

Conceptually:

```text
State changes
     ↓
React creates new UI representation
     ↓
Compare with previous representation
     ↓
Determine required changes
     ↓
Update browser DOM
```

This helps React manage UI updates efficiently.

---

### 129. What is conditional rendering?

Conditional rendering means showing different UI depending on a condition.

Example:

```jsx
{isLoggedIn ? (
    <Dashboard />
) : (
    <Login />
)}
```

Or:

```jsx
{isAdmin && <AdminPanel />}
```

It is simply using JavaScript conditions to decide what React renders.

---

### 130. Why are keys important in React lists?

Suppose:

```jsx
users.map(user => (
    <User key={user.id} user={user} />
))
```

The `key` helps React identify which list item corresponds to which item between renders.

Use a stable unique identifier when possible:

```text
user.id
```

Avoid using array indexes as keys when the list can be reordered, inserted into, or deleted from.

---

### 131. What is React Context API?

Context allows data to be shared with components without manually passing props through every intermediate component.

Without Context:

```text
App
 ↓ props
A
 ↓ props
B
 ↓ props
C
```

With Context:

```text
       Context
       ↓ ↓ ↓
      A B C
```

Common uses:

* theme
* authenticated user
* locale
* shared application settings

It shouldn't automatically replace every form of state management.

---

### 132. What is prop drilling?

Prop drilling occurs when data is passed through multiple components just to reach a deeply nested component.

Example:

```text
App
 ↓ user
Component A
 ↓ user
Component B
 ↓ user
Component C
```

Even if A and B don't use `user`, they have to pass it down.

Solutions can include:

* Context
* restructuring components
* state management libraries when appropriate

---

### 133. What is React Router?

React Router is commonly used for client-side routing in React applications.

For example:

```text
/login
/dashboard
/products
/profile
```

Instead of requesting a completely new HTML page from the server for every route, the frontend can render the appropriate component.

Conceptually:

```text
URL
 ↓
React Router
 ↓
Matching Component
 ↓
UI
```

---

### 134. How does API integration work in React?

React can make HTTP requests using:

* `fetch`
* Axios
* other HTTP clients

Example:

```jsx
useEffect(() => {
    fetch("/api/employees")
        .then(response => response.json())
        .then(data => setEmployees(data));
}, []);
```

Typical flow:

```text
React
 ↓
HTTP request
 ↓
Spring Boot REST API
 ↓
Database
 ↓
JSON response
 ↓
React state
 ↓
UI
```

This is the key connection between your **React + Spring Boot** skills.

---

### 135. What are controlled components in React?

A controlled form element gets its value from React state.

Example:

```jsx
const [name, setName] = useState("");

<input
    value={name}
    onChange={e => setName(e.target.value)}
/>
```

React controls the value.

This makes form data easy to validate and manage.

---

### 136. What is component re-rendering?

A component may re-render when relevant state or props change, or when its parent renders under React's rendering model.

Example:

```jsx
setCount(count + 1);
```

The updated state causes React to render the component again.

A re-render does **not** necessarily mean the entire browser DOM is recreated.

React determines what actual DOM changes are needed.

---

### 137. What is the difference between `map()`, `filter()`, and `reduce()` in JavaScript?

**map**

Transforms every element:

```js
[1, 2, 3].map(x => x * 2)
```

Result:

```text
[2, 4, 6]
```

**filter**

Keeps matching elements:

```js
[1, 2, 3, 4].filter(x => x % 2 === 0)
```

Result:

```text
[2, 4]
```

**reduce**

Combines values:

```js
[1, 2, 3].reduce((sum, x) => sum + x, 0)
```

Result:

```text
6
```

**Easy memory**

```text
map    → transform
filter → select
reduce → combine
```

---

### 138. What is event bubbling in JavaScript/React?

Suppose:

```text
Parent
  ↓
Child
```

An event occurring on the child can propagate upward through its ancestors.

This is called **event bubbling**.

Example:

```jsx
<div onClick={parentClick}>
    <button onClick={childClick}>
        Click
    </button>
</div>
```

Clicking the button can trigger the child's handler and then the parent's handler through event propagation.

You can stop propagation when appropriate.

---

### 139. What is localStorage vs sessionStorage?

Both are browser storage mechanisms.

**localStorage**

Data generally remains after the browser is closed.

```js
localStorage.setItem("name", "Kiru");
```

**sessionStorage**

Data generally lasts for the current browser tab/session.

```js
sessionStorage.setItem("name", "Kiru");
```

Both store strings and should not be treated as secure storage for sensitive secrets.

---

### 140. What is the difference between React and Angular?

Since you're focusing on React, know this clearly.

**React**

React is primarily a **UI library**.

It focuses on building user interfaces and relies on additional libraries/tools for things such as routing and other application concerns.

**Angular**

Angular is a more complete **frontend framework** with many built-in features.

Conceptually:

```text
React
→ UI library
→ flexible ecosystem

Angular
→ full framework
→ more built-in structure
```

For your Java Full-Stack path:

```text
React
   ↓
REST API
   ↓
Spring Boot
   ↓
JPA/Hibernate
   ↓
PostgreSQL/MySQL
```

is a very solid combination to learn.
