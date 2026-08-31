# Java Full-Stack Interview Q&A (Questions 41–60)

Frontend — JavaScript & Web Concepts

---

### 41. What is the difference between `var`, `let`, and `const`?

All three are used to create variables in JavaScript.

```javascript
var name = "Kiru";
let age = 21;
const country = "India";
```

But they behave differently.

**`var`**

`var` is the older way of declaring variables.

```javascript
var age = 20;
age = 21;
```

You can change its value. You can also redeclare it:

```javascript
var age = 20;
var age = 21;
```

This is allowed. `var` is **function-scoped**, not block-scoped.

**`let`**

`let` is the modern way to create a variable whose value can change.

```javascript
let age = 20;

age = 21;
```

But you cannot redeclare it in the same scope:

```javascript
let age = 20;
let age = 21; // Error
```

`let` is **block-scoped**. For example:

```javascript
if (true) {
    let x = 10;
}

console.log(x); // Error
```

**`const`**

`const` is used when you don't want to reassign the variable.

```javascript
const pi = 3.14;

pi = 3.15; // Error
```

It is also block-scoped.

**Important**

`const` doesn't mean the object itself becomes completely immutable.

For example:

```javascript
const user = {
    name: "Kiru"
};

user.name = "Rahul";
```

This is allowed because we're changing a property of the object, not reassigning `user`.

**Comparison**

| Feature                       | `var`         | `let` | `const` |
| ----------------------------- | ------------- | ----- | ------- |
| Can reassign?                 | Yes           | Yes   | No      |
| Can redeclare in same scope?  | Yes           | No    | No      |
| Scope                         | Function      | Block | Block   |
| Modern recommendation         | Usually avoid | Yes   | Yes     |

**Easy memory**

```text
var   → Old
let   → Can change
const → Cannot reassign
```

In modern JavaScript, generally prefer **`const` by default**, and use **`let` when reassignment is needed**.

---

### 42. What are arrow functions?

Arrow functions are a shorter way of writing functions.

Traditional function:

```javascript
function add(a, b) {
    return a + b;
}
```

Arrow function:

```javascript
const add = (a, b) => {
    return a + b;
};
```

If there's only one expression, you can make it even shorter:

```javascript
const add = (a, b) => a + b;
```

**Why are arrow functions useful?**

They make small functions easier to write.

For example:

```javascript
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(n => n * 2);
```

Instead of writing:

```javascript
function double(n) {
    return n * 2;
}
```

**Important difference: `this`**

Arrow functions don't create their own `this`.

They capture `this` from the surrounding scope.

This is particularly useful in callbacks and React code.

**Simple definition**

> An arrow function is a shorter function syntax in JavaScript that also has different `this` behavior from normal functions.

---

### 43. What is DOM manipulation?

DOM means:

> **Document Object Model**

When a browser loads HTML:

```html
<h1>Hello</h1>
<button>Click</button>
```

the browser creates a tree-like representation of the page.

Conceptually:

```text
Document
   │
   └── HTML
       ├── h1
       │    └── Hello
       │
       └── button
```

JavaScript can access and modify this structure. That's called **DOM manipulation**.

**Example**

HTML:

```html
<h1 id="title">Hello</h1>
```

JavaScript:

```javascript
const title = document.getElementById("title");

title.textContent = "Hello Kiru";
```

The webpage changes from:

```text
Hello
```

to:

```text
Hello Kiru
```

**Other DOM operations**

JavaScript can:

* change text
* change styles
* add elements
* remove elements
* change attributes
* respond to user actions

Example:

```javascript
document.body.style.backgroundColor = "black";
```

**Simple definition**

> DOM manipulation means using JavaScript to read, change, add, or remove elements and content on a webpage.

---

### 44. What is the JavaScript Event Loop?

This is one of the most important JavaScript concepts.

JavaScript is traditionally described as **single-threaded**, meaning its main execution uses one call stack.

But browsers need to handle things such as:

* timers
* network requests
* user clicks
* API responses

JavaScript uses the **event loop** and browser-provided mechanisms to handle asynchronous work without blocking the main JavaScript execution.

**Example**

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");
```

You might expect:

```text
A
B
C
```

But the output is:

```text
A
C
B
```

Why? The `setTimeout` callback doesn't immediately run.

Conceptually:

```text
JavaScript code
      ↓
Call Stack
      ↓
Browser handles timer
      ↓
Callback waits in task queue
      ↓
Event Loop checks
      ↓
Call Stack becomes empty
      ↓
Callback executes
```

So JavaScript can continue executing other code instead of waiting for the timer.

**Simple analogy**

Imagine one cashier.

The cashier serves one customer at a time.

If someone says:

> "My food will take 10 minutes."

The cashier doesn't stand there doing nothing. They serve other customers.

When the food is ready, that customer can be handled.

That's roughly the idea behind asynchronous JavaScript and the event loop.

**Simple definition**

> The event loop coordinates the call stack and asynchronous callbacks so JavaScript can handle asynchronous operations without blocking the main execution thread.

---

### 45. What is a Promise?

A Promise represents the **eventual result of an asynchronous operation**.

For example, imagine requesting data from a backend.

The response isn't available immediately.

The Promise represents:

> "The result will be available later."

A Promise has three main states:

```text
Pending
   ↓
Fulfilled
```

or:

```text
Pending
   ↓
Rejected
```

**Example**

```javascript
const promise = fetch("/api/students");
```

The `fetch()` function returns a Promise.

You can use:

```javascript
fetch("/api/students")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
```

What happens?

```text
Request
   ↓
Promise pending
   ↓
Server responds
   ↓
Success → fulfilled
   OR
Failure → rejected
```

**Simple definition**

> A Promise is an object that represents the future success or failure of an asynchronous operation.

---

### 46. Explain `async` and `await`.

`async` and `await` make Promise-based asynchronous code easier to read.

Instead of:

```javascript
fetch("/api/students")
    .then(response => response.json())
    .then(data => console.log(data));
```

you can write:

```javascript
async function getStudents() {

    const response = await fetch("/api/students");

    const data = await response.json();

    console.log(data);
}
```

**What does `async` do?**

When you put:

```javascript
async function getStudents() {
}
```

the function returns a Promise.

**What does `await` do?**

`await` waits for a Promise to settle **inside an async function**.

For example:

```javascript
const response = await fetch("/api/students");
```

The async function pauses at that point until the Promise settles.

It does **not** freeze the entire browser or JavaScript environment. Other work can continue.

**Error handling**

You can use:

```javascript
async function getStudents() {

    try {
        const response = await fetch("/api/students");
        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.log(error);
    }
}
```

**Easy memory**

```text
Promise       → Future result
async         → Function works with Promises
await         → Wait for Promise result inside async function
```

---

### 47. What is the difference between `==` and `===` in JavaScript?

Both compare values, but they behave differently.

**`==`**

`==` performs **type coercion** when appropriate.

Example:

```javascript
5 == "5"
```

Result:

```text
true
```

JavaScript converts types during the comparison.

**`===`**

`===` checks both:

* value
* type

Example:

```javascript
5 === "5"
```

Result:

```text
false
```

because:

```text
5       → number
"5"     → string
```

**Another example**

```javascript
10 == 10
```

true.

```javascript
10 === 10
```

true.

But:

```javascript
10 == "10"
```

true.

```javascript
10 === "10"
```

false.

**Which should you use?**

In modern JavaScript, **prefer `===`** in most cases because it avoids unexpected type conversions.

**Easy memory**

```text
==  → Loose comparison
=== → Strict comparison
```

---

### 48. What is a closure?

A closure is created when a function **remembers variables from its surrounding scope even after that outer function has finished executing**.

This sounds complicated, so let's look at an example.

```javascript
function counter() {

    let count = 0;

    return function() {
        count++;
        return count;
    };
}
```

Now:

```javascript
const increment = counter();

console.log(increment());
console.log(increment());
console.log(increment());
```

Output:

```text
1
2
3
```

Why does `count` still exist? Because the inner function remembers/accesses the variable from the outer function. That's a closure.

**Think of it like a backpack 🎒**

The inner function leaves its original environment but carries the variables it needs in its "backpack."

```text
Outer function
     ↓
  count = 0
     ↓
Inner function
     ↓
Remembers count
```

Closures are useful for:

* data privacy
* callbacks
* event handlers
* maintaining state
* function factories

**Simple definition**

> A closure is a function together with access to variables from its surrounding lexical scope, even after that outer scope has finished executing.

---

### 49. What is CORS?

CORS means:

> **Cross-Origin Resource Sharing**

It is a browser security mechanism.

Imagine your frontend runs at:

```text
http://localhost:3000
```

and your backend runs at:

```text
http://localhost:8080
```

These are different origins because the ports differ.

The frontend tries:

```text
localhost:3000
       ↓
localhost:8080
```

The browser may block the request unless the backend allows that origin through the appropriate CORS response headers.

**Why does CORS exist?**

Without browser cross-origin protections, a malicious website could potentially make requests to other websites using your browser and access responses it shouldn't be allowed to read.

CORS lets the server say:

> "Requests from this origin are allowed."

**Spring Boot example**

You can configure CORS using Spring Security or Spring MVC configuration.

For example, conceptually:

```text
Frontend
localhost:3000
      ↓
      Request
      ↓
Backend
localhost:8080
      ↓
"localhost:3000 is allowed"
      ↓
Response
```

**Important**

CORS is primarily a **browser security mechanism**.

It doesn't mean that the server cannot receive a request at all. The browser controls whether frontend JavaScript is allowed to access the cross-origin response based on CORS rules.

**Simple definition**

> CORS is a browser security mechanism that controls whether frontend code from one origin can access resources from another origin.

---

### 50. What is JSON?

JSON stands for:

> **JavaScript Object Notation**

It is a lightweight text format commonly used to exchange data between frontend and backend.

Example:

```json
{
    "id": 101,
    "name": "Kiru",
    "age": 21
}
```

A backend might send this to a frontend.

**Why JSON?**

Because it is:

* easy for humans to read
* easy for machines to process
* widely supported
* commonly used in REST APIs

**Frontend receiving JSON**

```javascript
const response = await fetch("/api/student");

const data = await response.json();

console.log(data.name);
```

Output:

```text
Kiru
```

**JSON supports common data types**

```text
String
Number
Boolean
Object
Array
null
```

Example:

```json
{
    "name": "Kiru",
    "skills": ["Java", "Python", "JavaScript"],
    "active": true
}
```

**Simple definition**

> JSON is a lightweight text-based format commonly used to exchange structured data between applications, especially frontend and backend systems.

---

### 51. How do you make an HTTP request from a frontend script?

The modern browser provides the **Fetch API**.

Example:

```javascript
const response = await fetch("http://localhost:8080/api/students");
```

Then convert the response to JSON:

```javascript
const data = await response.json();
```

Complete example:

```javascript
async function getStudents() {

    try {

        const response =
            await fetch("http://localhost:8080/api/students");

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const students = await response.json();

        console.log(students);

    } catch (error) {
        console.error(error);
    }
}
```

**POST request**

You can also send data:

```javascript
const response = await fetch(
    "http://localhost:8080/api/students",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: "Kiru",
            age: 21
        })
    }
);
```

The flow is:

```text
JavaScript
    ↓
fetch()
    ↓
HTTP Request
    ↓
Spring Boot Backend
    ↓
Database
    ↓
HTTP Response
    ↓
JavaScript
```

---

### 52. What is the core structural difference between React and Angular?

Both are used to build modern web applications, but their philosophies differ.

**React**

React is primarily a **UI library**.

It focuses heavily on building user interfaces using components.

You commonly add other libraries for things such as:

* routing
* state management
* forms
* HTTP utilities

depending on the application.

**Angular**

Angular is a **full-fledged frontend framework**.

It provides a more integrated structure for things such as:

* components
* routing
* forms
* dependency injection
* HTTP communication
* directives
* services

**Basic comparison**

| React                                          | Angular                           |
| ----------------------------------------------- | ---------------------------------- |
| UI library                                      | Full framework                     |
| JSX commonly used                               | HTML templates                     |
| JavaScript/TypeScript                           | TypeScript                         |
| More freedom in choosing supporting libraries   | More built-in/integrated features  |
| Flexible architecture                           | More opinionated architecture      |

**Architecture idea**

React:

```text
React
 ↓
Components
 ↓
Add libraries as needed
```

Angular:

```text
Angular
 ├── Components
 ├── Services
 ├── Routing
 ├── Forms
 ├── HTTP
 └── Dependency Injection
```

**Simple answer**

> React is primarily a UI library focused on components, while Angular is a complete TypeScript-based framework that provides a more integrated application structure.

---

### 53. What is JSX in React?

JSX stands for:

> **JavaScript XML**

It allows you to write HTML-like syntax inside JavaScript/TypeScript code.

Example:

```jsx
function Welcome() {

    return (
        <h1>Hello Kiru</h1>
    );
}
```

This looks like HTML, but it's actually JSX.

**Why use JSX?**

It makes UI code easier to understand.

You can also put JavaScript expressions inside JSX:

```jsx
const name = "Kiru";

return (
    <h1>Hello {name}</h1>
);
```

Result:

```text
Hello Kiru
```

You can also conditionally display things:

```jsx
{isLoggedIn && <p>Welcome!</p>}
```

**Important**

Browsers don't directly understand JSX.

The React build process transforms JSX into JavaScript that the browser can execute.

**Simple definition**

> JSX is a syntax extension commonly used with React that allows developers to write HTML-like UI structures inside JavaScript code.

---

### 54. What is the difference between State and Props in React?

This is extremely important in React.

**Props**

Props are **data passed from a parent component to a child component**.

Example:

```jsx
function Student({ name }) {
    return <h1>{name}</h1>;
}
```

Parent:

```jsx
<Student name="Kiru" />
```

Here:

```text
Parent
  ↓
name = "Kiru"
  ↓
Child
```

Props are generally treated as **read-only by the receiving component**.

**State**

State is data that belongs to a component and can change over time.

Example:

```jsx
const [count, setCount] = useState(0);
```

When you call:

```jsx
setCount(count + 1);
```

React updates the state and can re-render the component.

**Comparison**

| Props                             | State                                          |
| ---------------------------------- | ----------------------------------------------- |
| Passed from parent                 | Managed by component/hook                       |
| Read-only to receiving component   | Can be updated using state setters              |
| Used to pass data                  | Used for changing data                          |
| Helps components communicate       | Helps component remember changing information   |

**Easy memory**

```text
Props  → Parent gives
State  → Component manages
```

---

### 55. What is the purpose of the `useEffect` hook?

`useEffect` is a React Hook used to perform **side effects** in a component.

A side effect is something that interacts with something outside the normal rendering process.

Examples:

* API requests
* timers
* subscriptions
* event listeners
* updating certain external systems

Example:

```jsx
useEffect(() => {

    fetch("/api/students")
        .then(response => response.json())
        .then(data => setStudents(data));

}, []);
```

The empty dependency array:

```jsx
[]
```

means the effect is set up to run after the initial mount under normal React behavior.

**Dependency array**

Example:

```jsx
useEffect(() => {
    console.log(count);
}, [count]);
```

This effect runs after renders where `count` has changed.

**Cleanup**

Some effects need cleanup.

Example:

```jsx
useEffect(() => {

    const timer = setInterval(() => {
        console.log("Running");
    }, 1000);

    return () => {
        clearInterval(timer);
    };

}, []);
```

The returned function performs cleanup.

**Simple definition**

> `useEffect` lets a React component synchronize with external systems or perform side effects after rendering, with dependencies controlling when the effect is re-run.

---

### 56. What are Angular components and directives?

Let's start with **components**.

**Angular Component**

A component represents a part of the user interface.

For example:

```text
Navbar
Login Page
Student List
Student Card
Footer
```

A component typically contains:

```text
Component
 ├── TypeScript class
 ├── HTML template
 └── CSS/styles
```

Example:

```typescript
@Component({
    selector: 'app-student',
    template: '<h1>Student</h1>'
})
export class StudentComponent {
}
```

**Angular Directive**

A directive changes the behavior or appearance of DOM elements.

There are different types.

*Attribute directive* — changes behavior/appearance.

Example:

```html
<p [ngClass]="{active: isActive}">
    Student
</p>
```

*Structural directives* — they affect the structure of the DOM.

Historically common examples include:

```html
<div *ngIf="isLoggedIn">
    Welcome
</div>
```

and:

```html
<div *ngFor="let student of students">
    {{ student.name }}
</div>
```

Modern Angular also provides newer control-flow syntax such as `@if` and `@for`.

**Easy memory**

```text
Component → Builds a UI part
Directive → Changes/controls existing DOM behavior or structure
```

---

### 57. What is data binding in Angular?

Data binding means connecting **data in the component's TypeScript code with the HTML template**.

Angular provides several forms.

**1. Interpolation**

Component:

```typescript
name = "Kiru";
```

HTML:

```html
<h1>Hello {{ name }}</h1>
```

Output:

```text
Hello Kiru
```

**2. Property binding**

```html
<img [src]="imageUrl">
```

Angular takes the value of `imageUrl` and assigns it to the element property.

**3. Event binding**

HTML:

```html
<button (click)="sayHello()">
    Click
</button>
```

When the user clicks:

```text
button
  ↓
click event
  ↓
sayHello()
```

**4. Two-way binding**

Commonly written using:

```html
[(ngModel)]
```

Example:

```html
<input [(ngModel)]="name">
```

If the user types:

```text
Kiru
```

the component's `name` value updates.

And if the component changes `name`, the UI can update accordingly.

**Easy memory**

```text
{{ }}      → Show data
[ ]        → Component → HTML property
( )        → HTML event → Component
[( )]      → Both directions
```

---

### 58. What is a Single Page Application (SPA)?

SPA means:

> **Single Page Application**

In a traditional website, clicking a link might cause the browser to request an entirely new HTML page.

Example:

```text
Home
 ↓
Server
 ↓
New HTML page

About
 ↓
Server
 ↓
Another HTML page
```

In an SPA, the browser initially loads the application, and JavaScript then updates the displayed content as the user navigates.

Conceptually:

```text
Browser
   ↓
Load application
   ↓
JavaScript application
   ↓
Change displayed component
   ↓
Fetch data when needed
```

React and Angular are commonly used to build SPAs.

**Example**

You have:

```text
example.com
```

Then navigate:

```text
example.com/home
example.com/students
example.com/settings
```

The application can change the visible UI without doing a complete browser page reload for every navigation.

**Advantages**

* smooth navigation
* less full-page reloading
* rich interactive UI
* can reuse components
* good user experience

**Disadvantages**

* initial JavaScript bundle can be large
* SEO can require additional consideration depending on the app
* client-side complexity can increase

**Simple definition**

> An SPA is a web application that loads the main application shell once and dynamically changes its content as the user interacts and navigates.

---

### 59. How does client-side routing work in an SPA?

Suppose you have:

```text
/students
/profile
/settings
```

In a traditional website, each URL might request a new page from the server.

In an SPA, a client-side router handles navigation.

For example, React applications commonly use a routing library, while Angular has its own router.

Conceptually:

```text
User clicks "Students"
       ↓
URL changes
       ↓
Client-side router sees /students
       ↓
Router selects Student component
       ↓
Student component displayed
```

The browser doesn't necessarily reload the entire page.

**Example concept**

```text
URL
 ↓
/students
 ↓
Router
 ↓
StudentComponent
 ↓
UI
```

If the component needs data:

```text
StudentComponent
       ↓
HTTP request
       ↓
Spring Boot API
       ↓
JSON
       ↓
Display students
```

**Important**

The server still needs to be configured correctly so that direct navigation to application routes can work in production.

**Simple definition**

> Client-side routing allows an SPA's JavaScript application to change the displayed component based on the URL without requiring a complete page reload.

---

### 60. What do common HTTP status codes mean?

HTTP status codes tell the client what happened with a request.

The most common ones you should know are:

**`200 OK`**

Everything worked.

Example:

```text
GET /students
```

Server successfully returns students.

```text
200 OK
```

Meaning: "Success."

**`201 Created`**

A new resource was successfully created.

Example:

```text
POST /students
```

Server creates a student.

```text
201 Created
```

Meaning: "Successfully created."

**`400 Bad Request`**

The client sent an invalid request.

Example:

```json
{
    "age": "hello"
}
```

when the API expects a number.

Response:

```text
400 Bad Request
```

Meaning: "Your request is invalid."

**`401 Unauthorized`**

The request lacks valid authentication credentials.

Example:

```text
GET /admin
```

without valid authentication.

```text
401 Unauthorized
```

Meaning: "You need to authenticate."

**`403 Forbidden`**

The server understands who you are (or the authentication context), but you **don't have permission** to perform that action.

Example:

```text
Normal User
    ↓
DELETE /admin/users/10
    ↓
403 Forbidden
```

Meaning: "You're not allowed to do this."

Easy difference:

```text
401 → Who are you?
403 → I know who you are, but you can't do this.
```

**`404 Not Found`**

The requested resource doesn't exist.

Example:

```text
GET /students/9999
```

if student 9999 doesn't exist.

```text
404 Not Found
```

Meaning: "I can't find it."

**`500 Internal Server Error`**

Something unexpected went wrong on the server.

For example:

```text
Frontend
   ↓
Backend
   ↓
Unexpected server error
   ↓
500
```

Meaning: "The server encountered an unexpected problem."

**Comparison**

| Code    | Meaning               | Simple explanation              |
| ------- | --------------------- | -------------------------------- |
| **200** | OK                    | Successful request                |
| **201** | Created               | Resource created                  |
| **400** | Bad Request           | Invalid request                   |
| **401** | Unauthorized          | Authentication required/invalid   |
| **403** | Forbidden             | Authenticated but not allowed     |
| **404** | Not Found             | Resource doesn't exist            |
| **500** | Internal Server Error | Unexpected server-side error      |
