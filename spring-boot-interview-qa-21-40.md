# Java Full-Stack Interview Q&A (Questions 21–40)

Spring Boot & Backend

---

### 21. What is Spring Boot vs. Traditional Spring?

First, understand what **Spring** is.

Spring is a Java framework that helps us build applications, especially backend and enterprise applications.

Traditional Spring required us to configure many things ourselves.

Spring Boot was created to make Spring development **much easier and faster**.

**Traditional Spring**

You may have needed:

* lots of configuration
* XML configuration in older projects
* manually configuring servers
* manually configuring dependencies
* more setup before writing business logic

For example, older Spring applications could have large XML configuration files.

**Spring Boot**

Spring Boot provides:

* automatic configuration
* embedded servers
* starter dependencies
* sensible defaults
* easier project setup
* easier deployment

For example, instead of manually installing/configuring Tomcat, Spring Boot can include an embedded Tomcat server.

Then you can run:

```bash
java -jar app.jar
```

and your application starts.

**Simple comparison**

| Traditional Spring             | Spring Boot               |
| ------------------------------- | -------------------------- |
| More configuration              | Less configuration         |
| More manual setup                | Automatic configuration     |
| Server may need separate setup  | Embedded server available  |
| More boilerplate                | Less boilerplate           |
| More difficult for beginners    | Easier                     |

**Simple definition**

> **Spring Boot is built on Spring and simplifies Spring application development by providing automatic configuration, starter dependencies, embedded servers, and sensible defaults.**

---

### 22. How does Spring Boot auto-configuration work?

This sounds complicated, but the basic idea is simple.

Spring Boot looks at:

1. What dependencies you have added
2. What configuration you have provided
3. What beans already exist

Then it tries to **automatically configure the application**.

**Example**

Suppose you add the Spring Web dependency.

Spring Boot understands:

> "This application probably needs web-related configuration."

So it automatically configures many things needed for a web application.

If you add:

```text
spring-boot-starter-data-jpa
```

Spring Boot can configure many JPA-related components based on your dependencies and database configuration.

**Behind the scenes**

Spring Boot uses auto-configuration classes.

These configurations are usually activated conditionally.

For example:

```text
If dependency exists
        ↓
If required class exists
        ↓
If user hasn't already configured it
        ↓
Apply default configuration
```

This is why Spring Boot is called **opinionated**. It gives you reasonable defaults.

**Important**

Auto-configuration doesn't mean:

> "Spring Boot magically configures everything."

It follows conditions and configuration rules. And you can override its defaults when needed.

**Simple example**

If you add:

```text
spring-boot-starter-web
```

Spring Boot can automatically configure things such as the web application infrastructure and embedded server.

**Interview answer**

> Spring Boot auto-configuration automatically configures application components based on the dependencies present in the project, existing beans, and configuration properties.

---

### 23. What does `@SpringBootApplication` do?

This is one of the most important annotations in Spring Boot.

You usually see:

```java
@SpringBootApplication
public class MyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

`@SpringBootApplication` is actually a combination of three important annotations:

```text
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
```

Let's understand them.

**1. `@SpringBootConfiguration`**

It tells Spring:

> "This class contains Spring Boot configuration."

It is essentially a specialized form of configuration.

**2. `@EnableAutoConfiguration`**

It tells Spring Boot:

> "Automatically configure things based on the project's dependencies and settings."

**3. `@ComponentScan`**

It tells Spring to search for Spring components such as:

```text
@Component
@Service
@Repository
@Controller
```

usually starting from the package containing the application class and its subpackages.

So:

```java
@SpringBootApplication
```

roughly means:

> "This is my main Spring Boot configuration, automatically configure what you can, and scan my application components."

**Interview answer**

> `@SpringBootApplication` combines `@SpringBootConfiguration`, `@EnableAutoConfiguration`, and `@ComponentScan`.

---

### 24. What is Inversion of Control (IoC)?

IoC is one of the **core ideas of Spring**.

Normally, we create objects ourselves.

For example:

```java
Car car = new Car();
```

We are responsible for creating the object.

With Spring, we can tell Spring about our classes, and **Spring manages their objects for us**.

For example:

```java
@Component
class Car {
}
```

Spring creates and manages a Car object called a **bean**.

Then another class can receive that object.

Without IoC:

```text
Developer
   ↓
Creates object
   ↓
Uses object
```

With IoC:

```text
Developer
   ↓
Defines classes/configuration
   ↓
Spring Container
   ↓
Creates & manages objects
   ↓
Provides objects when needed
```

That's the "inversion". Instead of your code controlling object creation, the **Spring container controls it**.

**Simple real-world example**

Imagine you have a restaurant.

Without IoC: you personally go to the kitchen, buy ingredients, cook everything, and serve it.

With IoC: you tell the restaurant what you need, and the restaurant handles getting it for you.

**Interview answer**

> Inversion of Control means that the responsibility of creating and managing objects is transferred from the application code to the Spring container.

---

### 25. What is Dependency Injection, and what are its types?

Dependency Injection, or **DI**, is how Spring provides required objects to other objects.

First, what's a dependency?

Suppose:

```java
class Car {
    Engine engine;
}
```

The Car needs an Engine. So:

```text
Car → depends on → Engine
```

Engine is a dependency of Car.

Instead of Car creating the Engine itself:

```java
Engine engine = new Engine();
```

Spring can provide it. That's **Dependency Injection**.

**Three common types**

*1. Constructor Injection*

The dependency is provided through the constructor.

```java
@Service
class CarService {

    private final Engine engine;

    CarService(Engine engine) {
        this.engine = engine;
    }
}
```

This is generally the **recommended approach** for required dependencies.

*2. Setter Injection*

Dependency is provided through a setter.

```java
class CarService {

    private Engine engine;

    @Autowired
    public void setEngine(Engine engine) {
        this.engine = engine;
    }
}
```

Useful when the dependency can be optional or changed after construction.

*3. Field Injection*

Dependency is directly injected into a field.

```java
@Autowired
private Engine engine;
```

It's simple, but constructor injection is generally preferred because it makes dependencies explicit and makes testing easier.

**Easy memory**

```text
Constructor → Dependency through constructor
Setter      → Dependency through setter
Field       → Dependency directly into field
```

**Interview answer**

> Dependency Injection is a technique where Spring provides the dependencies required by an object instead of the object creating them itself. The common forms are constructor, setter, and field injection.

---

### 26. What is the difference between `@Component`, `@Service`, and `@Repository`?

All three are **Spring stereotype annotations**.

They tell Spring:

> "Create/manage this class as a Spring bean."

But they communicate different purposes.

**`@Component`**

General-purpose Spring component.

```java
@Component
class EmailSender {
}
```

Use it when the class doesn't specifically belong to another stereotype.

**`@Service`**

Used for **business logic**.

```java
@Service
class UserService {
}
```

For example:

```text
Controller
    ↓
Service
    ↓
Repository
```

The Service layer typically contains business rules.

**`@Repository`**

Used for the **data access layer**.

```java
@Repository
class UserRepository {
}
```

It represents code that communicates with the database.

With Spring Data JPA, repository interfaces are often detected and implemented by Spring automatically, so you usually don't need to write `@Repository` yourself on every repository interface.

**Easy architecture**

```text
User
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
```

**Simple memory**

```text
@Component  → General component
@Service    → Business logic
@Repository → Database/data access
```

`@Service` and `@Repository` are specialized forms of component scanning stereotypes.

---

### 27. What is a RESTful Web Service?

REST stands for:

> **Representational State Transfer**

Don't worry about the complicated name.

A REST API allows applications to communicate over HTTP.

For example, suppose we have a student application. We might have:

```text
GET    /students
GET    /students/10
POST   /students
PUT    /students/10
DELETE /students/10
```

These endpoints operate on a resource called **students**.

**HTTP methods**

*GET* — used to retrieve data.

```http
GET /students
```

Meaning: give me the students.

*POST* — used to create data.

```http
POST /students
```

Body:

```json
{
    "name": "Kiru",
    "age": 21
}
```

*PUT* — usually used to replace/update a resource.

```http
PUT /students/10
```

*DELETE* — deletes a resource.

```http
DELETE /students/10
```

**REST commonly uses JSON**

Example response:

```json
{
    "id": 10,
    "name": "Kiru",
    "age": 21
}
```

**Simple definition**

> A RESTful web service is a web API that uses HTTP methods and resource-based URLs to allow applications to communicate.

---

### 28. What is the difference between `@Controller` and `@RestController`?

Both are used for handling web requests.

**`@Controller`**

Traditional Spring MVC controller.

```java
@Controller
class HomeController {

    @GetMapping("/home")
    public String home() {
        return "home";
    }
}
```

This commonly returns a **view/page name**. For example:

```text
home
```

could refer to:

```text
home.html
```

**`@RestController`**

Used commonly for REST APIs.

```java
@RestController
class StudentController {

    @GetMapping("/students")
    public Student getStudent() {
        return student;
    }
}
```

Spring converts the returned object into a response format such as JSON.

Conceptually:

```text
@Controller
     ↓
Usually returns view

@RestController
     ↓
Usually returns response body
     ↓
Often JSON
```

`@RestController` is essentially:

```text
@Controller + @ResponseBody
```

**Interview answer**

> `@Controller` is commonly used for MVC applications that return views, while `@RestController` is used for REST APIs and automatically treats returned values as response bodies.

---

### 29. How do you map HTTP requests to controller methods?

Spring Boot provides annotations for mapping requests.

*GET*

```java
@GetMapping("/students")
public List<Student> getStudents() {
    return students;
}
```

*POST*

```java
@PostMapping("/students")
public Student createStudent(@RequestBody Student student) {
    return student;
}
```

*PUT*

```java
@PutMapping("/students/{id}")
public Student updateStudent(@PathVariable Long id) {
    // update
}
```

*DELETE*

```java
@DeleteMapping("/students/{id}")
public void deleteStudent(@PathVariable Long id) {
}
```

There is also the more general:

```java
@RequestMapping
```

**Typical flow**

```text
HTTP Request
     ↓
Spring DispatcherServlet
     ↓
Find matching controller
     ↓
Find matching method
     ↓
Execute method
     ↓
Return response
```

**Common annotations**

```text
@GetMapping
@PostMapping
@PutMapping
@PatchMapping
@DeleteMapping
@RequestMapping
```

---

### 30. What is the purpose of `application.properties`?

`application.properties` is used to store **application configuration**.

For example:

```properties
server.port=8081
```

This changes the server port.

Database configuration might look like:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=postgres
spring.datasource.password=password
```

JPA configuration can include:

```properties
spring.jpa.hibernate.ddl-auto=update
```

**Why is this useful?**

Instead of hardcoding configuration inside Java code:

```java
server.setPort(8081);
```

we can keep configuration outside the code.

This makes it easier to change settings for different environments. For example:

```text
Development → localhost database
Testing     → test database
Production  → production database
```

You can also use:

```text
application.yml
```

instead of:

```text
application.properties
```

**Simple definition**

> `application.properties` stores configuration settings such as server port, database connection details, JPA settings, logging settings, and custom application properties.

---

### 31. What is Spring Data JPA?

First understand JPA.

**JPA** stands for:

> Java Persistence API

It provides a standard way for Java applications to work with relational databases using objects.

For example, suppose you have:

```java
class Student {
    Long id;
    String name;
}
```

You can map it to a database table:

```text
student
----------------
id
name
```

This is called **Object-Relational Mapping (ORM)**.

Spring Data JPA makes this much easier.

Instead of writing a lot of SQL/database code manually, you can create:

```java
public interface StudentRepository
        extends JpaRepository<Student, Long> {
}
```

Then Spring provides many operations automatically. For example:

```java
repository.findAll();
repository.findById(1L);
repository.save(student);
repository.deleteById(1L);
```

**Basic flow**

```text
Java Object
     ↓
Spring Data JPA
     ↓
JPA provider (commonly Hibernate)
     ↓
JDBC
     ↓
Database
```

**Important distinction**

* **JPA** = specification/API
* **Hibernate** = popular JPA implementation
* **Spring Data JPA** = Spring project that simplifies repository-based data access using JPA

---

### 32. What is the difference between CrudRepository and JpaRepository?

Both are Spring Data repository interfaces.

**CrudRepository**

Provides basic CRUD operations.

CRUD means:

```text
C → Create
R → Read
U → Update
D → Delete
```

For example:

```java
save()
findById()
findAll()
deleteById()
existsById()
```

**JpaRepository**

`JpaRepository` provides more functionality for JPA-based repositories.

Conceptually:

```text
Repository
    ↑
CrudRepository
    ↑
ListCrudRepository / PagingAndSortingRepository
    ↑
JpaRepository
```

The exact inheritance structure has evolved across Spring Data versions, but the key point is that `JpaRepository` gives you a richer JPA-oriented repository API.

It provides CRUD plus additional features such as:

* pagination/sorting support through the inherited APIs
* JPA-specific operations
* batch-related operations
* flushing

**Which should you normally use?**

If you're building a JPA application and need its richer features:

```java
extends JpaRepository
```

is commonly used.

**Simple comparison**

| CrudRepository                 | JpaRepository                 |
| -------------------------------- | -------------------------------- |
| Basic CRUD                       | CRUD + more JPA features         |
| Simpler                          | More feature-rich                |
| General repository abstraction   | Designed specifically for JPA    |

---

### 33. What does `@Autowired` do?

`@Autowired` tells Spring:

> "Find a suitable dependency managed by Spring and inject it here."

Example:

```java
@Service
class StudentService {
}
```

Then:

```java
@RestController
class StudentController {

    @Autowired
    private StudentService studentService;
}
```

Spring finds the `StudentService` bean and provides it.

**Constructor injection**

Modern Spring code often doesn't need `@Autowired` when there is a single constructor.

```java
@RestController
class StudentController {

    private final StudentService service;

    StudentController(StudentService service) {
        this.service = service;
    }
}
```

Spring automatically injects the dependency.

**Why is this useful?**

Without dependency injection:

```java
StudentService service = new StudentService();
```

The controller creates the service itself.

With Spring:

```text
Spring Container
      ↓
Creates StudentService
      ↓
Provides it to Controller
```

**Interview answer**

> `@Autowired` tells Spring to resolve and inject a suitable bean into a dependency. Constructor injection is generally preferred for required dependencies.

---

### 34. How do you handle global exceptions in Spring Boot?

Suppose many controllers can throw:

```text
StudentNotFoundException
```

You don't want to write the same exception-handling code inside every controller.

Spring provides:

```java
@RestControllerAdvice
```

or:

```java
@ControllerAdvice
```

for centralized exception handling.

Example:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity<String> handleStudentNotFound(
            StudentNotFoundException ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }
}
```

Now when that exception occurs in a controller, the global handler can handle it.

**Example**

Controller:

```java
@GetMapping("/students/{id}")
public Student getStudent(@PathVariable Long id) {

    throw new StudentNotFoundException("Student not found");
}
```

Global handler catches it.

Response could be:

```text
HTTP 404
Student not found
```

**Why is this useful?**

Without global handling:

```text
Controller 1 → exception code
Controller 2 → exception code
Controller 3 → exception code
```

With global handling:

```text
Controller 1 ─┐
Controller 2 ─┼→ Global Exception Handler
Controller 3 ─┘
```

Cleaner and more consistent.

---

### 35. What does `@Transactional` do?

`@Transactional` tells Spring that a method or class should execute within a **database transaction**.

A transaction is basically a group of database operations treated as one logical unit.

Imagine transferring ₹10,000:

```text
Account A
   ↓
Remove ₹10,000

Account B
   ↓
Add ₹10,000
```

What if the money is removed from A but adding it to B fails? That's a problem.

A transaction can make sure that either:

```text
Both operations succeed
```

or:

```text
Both are rolled back
```

This is the basic idea of **atomicity**.

Example:

```java
@Transactional
public void transferMoney() {

    withdraw();
    deposit();
}
```

If a suitable exception causes the transaction to roll back, the database changes can be undone.

**Transaction properties**

You may hear **ACID**:

```text
A → Atomicity
C → Consistency
I → Isolation
D → Durability
```

**Simple definition**

> `@Transactional` tells Spring to execute database operations within a transaction so that related operations can succeed or roll back together according to the transaction rules.

---

### 36. How are endpoints secured in Spring Boot?

The most common solution is:

> **Spring Security**

Spring Security provides authentication and authorization mechanisms.

**Authentication** asks: **Who are you?**

For example:

```text
Username: Kiru
Password: ****
```

**Authorization** asks: **What are you allowed to do?**

For example:

```text
ADMIN → Can delete users
USER  → Cannot delete users
```

**Example**

Suppose we have:

```text
GET /students
POST /students
DELETE /students/10
```

We might configure:

```text
GET /students       → authenticated users
POST /students      → ADMIN
DELETE /students    → ADMIN
```

Modern Spring Security commonly uses a `SecurityFilterChain` configuration.

Applications can use mechanisms such as:

* session-based authentication
* HTTP Basic
* OAuth 2.0
* JWT-based authentication
* role/authority-based authorization

**Simple flow**

```text
Client
  ↓
Request
  ↓
Spring Security filters
  ↓
Authenticate user
  ↓
Check permissions
  ↓
Controller
```

**Important**

Don't simply put passwords directly into your database as plain text.

Passwords should be securely hashed using a password encoder such as BCrypt.

---

### 37. What is an embedded server, and which is default?

Traditionally, web applications often required a separate web server/application server.

Spring Boot can package an application with an **embedded server**. That means the server is included with the application.

For example:

```text
myapp.jar
 ├── Application code
 ├── Dependencies
 └── Embedded server
```

You can run:

```bash
java -jar myapp.jar
```

and the application starts.

**Which is the default?**

For the standard Spring Boot web stack:

> **Tomcat is the default embedded servlet container.**

You can also use alternatives such as:

* Jetty
* Undertow

depending on the application setup/dependencies.

**Simple definition**

> An embedded server is a web server packaged inside the Spring Boot application, allowing the application to run without separately installing/configuring a server.

---

### 38. What is the difference between `@PathVariable` and `@RequestParam`?

Both are used to get information from an HTTP request. But they come from different places.

**`@PathVariable`**

Gets a value directly from the URL path.

Example:

```text
GET /students/25
```

Controller:

```java
@GetMapping("/students/{id}")
public Student getStudent(@PathVariable Long id) {
    // id = 25
}
```

Here:

```text
/students/{id}
```

contains the variable.

**`@RequestParam`**

Gets a value from the query parameter.

Example:

```text
GET /students?id=25
```

Controller:

```java
@GetMapping("/students")
public Student getStudent(@RequestParam Long id) {
    // id = 25
}
```

**Another example**

```text
/products?category=mobile&brand=samsung
```

You could have:

```java
@RequestParam String category
@RequestParam String brand
```

**Comparison**

| `@PathVariable`                 | `@RequestParam`                    |
| --------------------------------- | ------------------------------------ |
| Comes from URL path               | Comes from query string              |
| `/students/25`                    | `/students?id=25`                    |
| Usually identifies a resource     | Often used for filtering/options     |

**Easy memory**

```text
PathVariable → /students/25
RequestParam → /students?id=25
```

---

### 39. What is the N+1 select problem?

This is an important **database performance problem**.

Imagine you have:

```text
Department
   ↓
Employees
```

Suppose you fetch:

```text
10 departments
```

Then your application separately fetches employees for each department. You might get:

```text
1 query → Get all departments

+ 10 queries → Get employees for each department
```

Total:

```text
11 queries
```

That's the **N+1 problem**.

**Why is it bad?**

Imagine:

```text
1,000 departments
```

You could end up with:

```text
1 + 1,000 = 1,001 queries
```

That can be much slower than necessary.

**Why does it happen?**

It commonly appears with ORM relationships and lazy loading.

For example:

```java
Department
    |
    └── employees
```

You fetch departments first. Then accessing:

```java
department.getEmployees()
```

may trigger another database query for each department.

**How can we solve it?**

Depending on the use case, solutions include:

* `JOIN FETCH`
* entity graphs
* carefully designed queries
* projections/DTOs
* batch fetching
* appropriate fetch strategies

Example conceptually — instead of:

```text
Get departments
       ↓
Get employees 1
Get employees 2
Get employees 3
...
```

use a suitable join-based query:

```text
Get departments + employees
          ↓
       One/fewer
       queries
```

**Important**

Don't blindly change everything to `EAGER`. That can create other performance problems.

The correct solution depends on what data the application actually needs.

**Interview answer**

> The N+1 select problem occurs when an application executes one query to fetch a set of parent records and then executes an additional query for each parent to fetch related data, resulting in N+1 database queries.

---

### 40. How do you package and run a Spring Boot app manually?

Once your Spring Boot application is complete, you normally package it into a JAR file.

If you're using Maven:

```bash
mvn clean package
```

This does roughly:

```text
Clean old build files
       ↓
Compile
       ↓
Run tests
       ↓
Package application
       ↓
Create JAR
```

You'll usually get something like:

```text
target/
    myapp-0.0.1-SNAPSHOT.jar
```

Then run:

```bash
java -jar target/myapp-0.0.1-SNAPSHOT.jar
```

Your Spring Boot application starts.

**Maven wrapper**

If the project contains Maven Wrapper, you can use:

Windows:

```bash
mvnw.cmd clean package
```

Linux/macOS:

```bash
./mvnw clean package
```

Then:

```bash
java -jar target/myapp.jar
```

**What happens?**

Conceptually:

```text
Java Source Code
       ↓
Maven
       ↓
Compile
       ↓
Test
       ↓
Package
       ↓
Executable JAR
       ↓
java -jar
       ↓
Spring Boot starts
       ↓
Embedded Tomcat
       ↓
REST API available
```

For a typical web application, you can then access something like:

```text
http://localhost:8080
```

assuming the default port hasn't been changed.
