# Java Full-Stack Interview Q&A (Questions 61–80)

Database & SQL

---

### 61. What is an RDBMS?

RDBMS stands for:

> **Relational Database Management System**

It is software used to **store, organize, manage, and retrieve data in tables**.

Examples:

* MySQL
* PostgreSQL
* Oracle Database
* Microsoft SQL Server

**What is a relational database?**

A relational database stores data in **tables**.

For example, a `Student` table:

| id | name  | age |
| -: | ----- | --: |
|  1 | Kiru  |  21 |
|  2 | Rahul |  22 |
|  3 | Arun  |  20 |

Another table might be:

`Course`

| course_id | course_name |
| --------: | ----------- |
|       101 | Java        |
|       102 | Python      |

The tables can be related to each other.

For example:

```text
Student
   ↓
enrolls in
   ↓
Course
```

This relationship is why it is called a **relational** database.

**What does an RDBMS provide?**

It provides things like:

* tables
* relationships
* constraints
* SQL
* transactions
* security
* indexing
* data integrity

**Simple definition**

> An RDBMS is software that stores data in related tables and provides tools such as SQL, constraints, and transactions to manage that data.

---

### 62. What is the difference between a Primary Key and a Foreign Key?

**Primary Key**

A primary key uniquely identifies each row in a table.

Example:

```sql
CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10,2)
);
```

Here:

```text
employee_id
```

is the primary key.

Example data:

| employee_id | name  | salary |
| ----------: | ----- | -----: |
|           1 | Kiru  |  50000 |
|           2 | Rahul |  60000 |
|           3 | Arun  |  55000 |

Each employee has a unique ID.

Important properties — a primary key:

* must be unique
* cannot normally contain `NULL`
* identifies a row

**Foreign Key**

A foreign key creates a relationship between tables.

Suppose:

```text
Employee
employee_id
```

and:

```text
Department
department_id
```

Employee might contain:

```text
department_id
```

which refers to the Department table.

```sql
CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,

    FOREIGN KEY (department_id)
        REFERENCES Department(department_id)
);
```

Now:

```text
Employee.department_id
          ↓
Department.department_id
```

**Easy memory**

```text
Primary Key → "Who am I?"
Foreign Key → "Which other table am I related to?"
```

---

### 63. What is the difference between a Primary Key and a UNIQUE constraint?

Both help prevent duplicate values, but they aren't the same.

**Primary Key**

A table has **one primary key constraint** (which may consist of multiple columns).

Example:

```sql
employee_id INT PRIMARY KEY
```

It uniquely identifies each row and doesn't allow `NULL`.

**UNIQUE**

A `UNIQUE` constraint ensures that values in the constrained column or column combination aren't duplicated.

Example:

```sql
email VARCHAR(100) UNIQUE
```

You can't have:

```text
abc@gmail.com
abc@gmail.com
```

twice under that unique constraint.

Unlike a primary key, a table can have **multiple UNIQUE constraints**.

Example:

```sql
CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20) UNIQUE
);
```

Here:

```text
employee_id → Primary Key
email       → Unique
phone       → Unique
```

**Simple comparison**

| Primary Key                          | UNIQUE                               |
| ------------------------------------ | ------------------------------------ |
| Identifies the row                   | Prevents duplicate values            |
| One primary key constraint per table | Multiple unique constraints possible |
| Cannot contain NULL                  | NULL handling depends on the DBMS    |
| Main row identifier                  | Used for alternate uniqueness rules  |

**Easy memory**

> **Primary Key = main identity**
> **UNIQUE = no duplicates**

---

### 64. What are the different types of SQL Joins?

A JOIN combines related data from multiple tables.

Suppose we have:

**Employee**

| id | name  | dept_id |
| -: | ----- | ------: |
|  1 | Kiru  |      10 |
|  2 | Rahul |      20 |
|  3 | Arun  |      30 |

**Department**

| dept_id | department |
| ------: | ---------- |
|      10 | IT         |
|      20 | HR         |
|      40 | Finance    |

**1. INNER JOIN**

Returns only rows that have matching values in **both tables**.

```sql
SELECT e.name, d.department
FROM Employee e
INNER JOIN Department d
    ON e.dept_id = d.dept_id;
```

Result:

| name  | department |
| ----- | ---------- |
| Kiru  | IT         |
| Rahul | HR         |

Arun is excluded because department 30 doesn't exist in Department.

**2. LEFT JOIN**

Returns **all rows from the left table** and matching rows from the right table.

```sql
SELECT e.name, d.department
FROM Employee e
LEFT JOIN Department d
    ON e.dept_id = d.dept_id;
```

Result:

| name  | department |
| ----- | ---------- |
| Kiru  | IT         |
| Rahul | HR         |
| Arun  | NULL       |

Arun is included even though there is no matching department.

**3. RIGHT JOIN**

Returns all rows from the right table and matching rows from the left table.

```sql
SELECT e.name, d.department
FROM Employee e
RIGHT JOIN Department d
    ON e.dept_id = d.dept_id;
```

Result would include Finance even though no employee belongs to department 40.

**4. FULL OUTER JOIN**

Returns:

> All matching and non-matching rows from both tables.

Conceptually:

```text
Left table + matching rows + right-only rows
```

Some databases, including PostgreSQL, support `FULL OUTER JOIN` directly. MySQL traditionally doesn't support it directly and often uses `UNION` of appropriate left/right joins.

**5. CROSS JOIN**

Produces every possible combination of rows.

If:

```text
Employee → 3 rows
Department → 4 rows
```

then:

```text
3 × 4 = 12 rows
```

Example:

```sql
SELECT *
FROM Employee
CROSS JOIN Department;
```

**6. SELF JOIN**

A table joins with **itself**.

For example, an Employee table:

| employee_id | name    | manager_id |
| ----------: | ------- | ---------: |
|           1 | Manager |       NULL |
|           2 | Kiru    |          1 |
|           3 | Rahul   |          1 |

We can use a self join to find each employee's manager.

```sql
SELECT
    e.name AS employee,
    m.name AS manager
FROM Employee e
LEFT JOIN Employee m
    ON e.manager_id = m.employee_id;
```

**Easy memory**

```text
INNER → Matching only
LEFT  → Everything from left
RIGHT → Everything from right
FULL  → Everything from both
CROSS → Every combination
SELF  → Table joins itself
```

---

### 65. What is the difference between WHERE and HAVING?

Both are used to filter data, but they work at different stages.

**WHERE**

`WHERE` filters **individual rows before grouping**.

Example:

```sql
SELECT *
FROM Employee
WHERE salary > 50000;
```

This selects employees whose salary is greater than 50,000.

**HAVING**

`HAVING` filters **groups after `GROUP BY`**.

Example:

```sql
SELECT department_id, AVG(salary)
FROM Employee
GROUP BY department_id
HAVING AVG(salary) > 50000;
```

Here:

1. Employees are grouped by department.
2. Average salary is calculated.
3. Departments with average salary > 50,000 are kept.

Think:

```text
WHERE
 ↓
Filter rows
 ↓
GROUP BY
 ↓
Calculate groups
 ↓
HAVING
 ↓
Filter groups
```

**Easy memory**

> **WHERE → rows**
> **HAVING → groups**

---

### 66. What is the difference between GROUP BY and ORDER BY?

They do completely different things.

**GROUP BY**

Groups rows that have the same value.

Example:

```sql
SELECT department_id, COUNT(*)
FROM Employee
GROUP BY department_id;
```

Result:

| department_id | count |
| ------------: | ----: |
|            10 |     5 |
|            20 |     3 |
|            30 |     7 |

It answers:

> "How many employees are in each department?"

**ORDER BY**

Sorts the result.

Example:

```sql
SELECT *
FROM Employee
ORDER BY salary DESC;
```

This sorts employees from highest salary to lowest.

**Easy memory**

```text
GROUP BY → Make groups
ORDER BY → Sort results
```

---

### 67. What are aggregate functions?

Aggregate functions perform calculations on **multiple rows** and return a result.

Common aggregate functions are:

```text
COUNT()
SUM()
AVG()
MIN()
MAX()
```

**COUNT**

Counts rows.

```sql
SELECT COUNT(*)
FROM Employee;
```

Example result:

```text
100
```

Meaning 100 employees.

**SUM**

Adds values.

```sql
SELECT SUM(salary)
FROM Employee;
```

**AVG**

Calculates average.

```sql
SELECT AVG(salary)
FROM Employee;
```

**MIN**

Finds smallest value.

```sql
SELECT MIN(salary)
FROM Employee;
```

**MAX**

Finds largest value.

```sql
SELECT MAX(salary)
FROM Employee;
```

Example:

```sql
SELECT
    COUNT(*) AS total_employees,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MIN(salary) AS lowest_salary,
    MAX(salary) AS highest_salary
FROM Employee;
```

**Easy memory**

```text
COUNT → How many?
SUM   → Total?
AVG   → Average?
MIN   → Smallest?
MAX   → Largest?
```

---

### 68. What is database normalization?

Normalization is a process of **organizing database tables to reduce unnecessary duplication and improve data integrity**.

Imagine this bad table:

| order_id | customer | customer_phone | product  |
| -------: | -------- | -------------- | -------- |
|        1 | Kiru     | 98765          | Laptop   |
|        2 | Kiru     | 98765          | Mouse    |
|        3 | Kiru     | 98765          | Keyboard |

The customer phone number is repeated.

If Kiru changes their phone number, we have to update multiple rows. That's a problem.

**Normalization**

We can separate the data:

`Customer`

| customer_id | name | phone |
| ----------: | ---- | ----- |
|           1 | Kiru | 98765 |

`Orders`

| order_id | customer_id | product  |
| -------: | ----------: | -------- |
|        1 |           1 | Laptop   |
|        2 |           1 | Mouse    |
|        3 |           1 | Keyboard |

Now the phone number is stored once.

**Common normal forms**

*1NF* — Data should be atomic and there should be no repeating groups.

*2NF* — Must satisfy 1NF and remove partial dependency on part of a composite key.

*3NF* — Must satisfy 2NF and remove transitive dependencies.

For beginner/interview purposes, remember:

> Normalization reduces redundancy and avoids update, insert, and delete anomalies.

**Why normalize?**

To reduce:

* duplicate data
* inconsistent data
* update problems
* storage waste

**Easy definition**

> Normalization organizes data into related tables to reduce duplication and improve consistency.

---

### 69. What is denormalization?

Denormalization is basically the **opposite direction**.

You intentionally introduce some redundancy to improve **read performance or simplify queries**, when appropriate.

Suppose you have:

```text
Customer
Orders
Products
```

A normalized design may require several joins to display an order report.

Sometimes we may store some frequently needed information together.

For example:

```text
Order
-----------------------
order_id
customer_name
customer_phone
product_name
```

This duplicates some data.

Why would we do that? Because reading the report may become simpler or faster in certain workloads.

**But there's a cost.**

If the customer changes their phone:

```text
Customer table
Order table
Report table
```

you may have multiple places to update.

**Easy memory**

```text
Normalization   → Less duplication, stronger consistency
Denormalization → More duplication, potentially faster/easier reads
```

You don't simply choose one universally. The right design depends on the application's workload and requirements.

---

### 70. What is an index, and how does it affect performance?

An index is a **data structure that helps the database find rows faster**.

Think about a book.

Without an index: you may have to scan page by page.

With an index: you can quickly locate the relevant page.

**Example**

Suppose:

```text
Employee
----------------
id
name
email
salary
```

You frequently search:

```sql
SELECT *
FROM Employee
WHERE email = 'kiru@example.com';
```

An index on `email` can make this lookup much more efficient for a large table.

```sql
CREATE INDEX idx_employee_email
ON Employee(email);
```

**But indexes aren't free.**

Indexes:

* consume storage
* take time to maintain
* can slow down `INSERT`
* can slow down `UPDATE`
* can slow down `DELETE`

because the index may also need to be updated.

Simple idea — no index:

```text
Query
 ↓
Scan many rows
 ↓
Find match
```

With a useful index:

```text
Query
 ↓
Index
 ↓
Find relevant rows
```

**Important**

More indexes are **not always better**.

You should index columns based on actual query patterns, constraints, joins, and workload.

**Easy definition**

> An index is an additional data structure maintained by the database to speed up data retrieval, at the cost of extra storage and write/maintenance overhead.

---

### 71. What are ACID properties?

ACID describes important properties of database transactions.

```text
A → Atomicity
C → Consistency
I → Isolation
D → Durability
```

**1. Atomicity**

A transaction happens **completely or not at all**.

Example — bank transfer:

```text
Remove ₹1000 from A
Add ₹1000 to B
```

If adding to B fails, the removal from A should also be rolled back.

**2. Consistency**

The database should remain in a **valid state** according to its rules and constraints.

For example: if an account balance cannot be negative, a successful transaction shouldn't leave it violating that rule.

**3. Isolation**

Multiple transactions running at the same time should not incorrectly interfere with each other.

For example:

```text
Transaction A
Transaction B
```

should behave according to the database's isolation rules.

**4. Durability**

Once a transaction is successfully committed, its changes should survive failures such as a database/server restart, subject to the database's durability guarantees.

**Easy memory**

```text
Atomicity  → All or nothing
Consistency → Valid data
Isolation   → Transactions don't improperly interfere
Durability  → Committed data stays
```

---

### 72. What is the difference between DELETE, TRUNCATE, and DROP?

**DELETE**

Removes rows from a table.

```sql
DELETE FROM Employee
WHERE employee_id = 10;
```

You can use `WHERE`. You can also delete all rows:

```sql
DELETE FROM Employee;
```

The table itself remains.

**TRUNCATE**

Removes **all rows** from a table quickly.

```sql
TRUNCATE TABLE Employee;
```

The table structure remains.

You cannot use a normal `WHERE` condition with `TRUNCATE`.

Its exact transactional, logging, identity-reset, and trigger behavior varies by DBMS, so don't assume identical behavior across databases.

**DROP**

Removes the table itself.

```sql
DROP TABLE Employee;
```

Now:

```text
Employee table
     ↓
Removed
```

The table structure and its data are gone.

**Comparison**

| DELETE              | TRUNCATE                   | DROP           |
| ------------------- | --------------------------- | -------------- |
| Removes rows        | Removes all rows           | Removes table  |
| `WHERE` possible    | No normal `WHERE`          | Not applicable |
| Table remains       | Table remains              | Table removed  |
| Row-level operation | Bulk/table-level operation | DDL operation  |

**Easy memory**

```text
DELETE   → Remove rows
TRUNCATE → Empty table
DROP     → Remove table
```

---

### 73. What is a subquery?

A subquery is a **query inside another query**.

Example — find employees whose salary is greater than the average salary:

```sql
SELECT *
FROM Employee
WHERE salary > (
    SELECT AVG(salary)
    FROM Employee
);
```

The inner query:

```sql
SELECT AVG(salary)
FROM Employee
```

calculates the average. Then the outer query finds employees above that value.

Think:

```text
Outer Query
     ↓
Needs result
     ↓
Inner Query
     ↓
Provides result
```

**Subquery can be used in different places**

For example:

```text
WHERE
FROM
SELECT
```

depending on the type of query.

**Simple definition**

> A subquery is a SQL query nested inside another SQL query.

---

### 74. What is a database view?

A view is a **stored SQL query that behaves like a virtual table**.

Suppose you frequently need:

```sql
SELECT
    e.name,
    e.salary,
    d.department
FROM Employee e
JOIN Department d
    ON e.department_id = d.department_id;
```

You can create a view:

```sql
CREATE VIEW employee_details AS
SELECT
    e.name,
    e.salary,
    d.department
FROM Employee e
JOIN Department d
    ON e.department_id = d.department_id;
```

Then:

```sql
SELECT *
FROM employee_details;
```

You can treat the view much like a table when querying it.

**Does a normal view store the actual data?**

Usually, a standard view stores the **query definition**, not a separate copy of the underlying data.

When queried, the database uses the underlying tables according to the view definition.

(Some databases also support materialized views, which are different.)

**Why use views?**

* simplify complex queries
* hide unnecessary columns
* provide a controlled data-access layer
* improve readability

**Easy definition**

> A view is a virtual table based on a stored SQL query.

---

### 75. What is a stored procedure?

A stored procedure is a **named set of SQL statements stored inside the database** that can be executed when needed.

Example concept:

```sql
CREATE PROCEDURE GetEmployees()
BEGIN
    SELECT *
    FROM Employee;
END;
```

Then you can call it using the syntax supported by your database. For example, in MySQL:

```sql
CALL GetEmployees();
```

**Why use stored procedures?**

They can be useful for:

* reusable database operations
* complex database-side logic
* centralizing certain operations
* reducing repeated SQL from applications

Example — instead of your application sending multiple SQL statements individually:

```text
Update stock
Insert sale
Update customer balance
```

a stored procedure can encapsulate a database-side operation.

**But are stored procedures always better?**

No. Modern applications often keep much of their business logic in the application layer.

The choice depends on:

* architecture
* team practices
* database
* performance
* portability requirements

**Simple definition**

> A stored procedure is a named, reusable set of SQL statements stored and executed by the database.

---

### 76. What is the difference between UNION and UNION ALL?

Both combine the results of multiple `SELECT` queries.

**UNION**

Combines results and removes duplicate rows.

Example:

```sql
SELECT city FROM Customers
UNION
SELECT city FROM Suppliers;
```

If both queries return:

```text
Chennai
Mumbai
Chennai
```

the final result contains each duplicate row only once.

**UNION ALL**

Combines results but **keeps duplicates**.

```sql
SELECT city FROM Customers
UNION ALL
SELECT city FROM Suppliers;
```

Duplicates remain.

**Performance**

`UNION` generally requires additional work to remove duplicates.

`UNION ALL` doesn't need that duplicate-removal step and is often faster when duplicates are acceptable.

**Easy memory**

```text
UNION     → Combine + remove duplicates
UNION ALL → Combine + keep duplicates
```

---

### 77. What is connection pooling?

Connecting to a database takes resources and time.

Imagine an application receiving 1,000 requests.

Without pooling:

```text
Request 1 → Create connection → Query → Close
Request 2 → Create connection → Query → Close
Request 3 → Create connection → Query → Close
...
```

That's inefficient.

**Connection pooling**

A connection pool maintains a collection of reusable database connections.

Conceptually:

```text
             Connection Pool
          ┌────┬────┬────┬────┐
          │ C1 │ C2 │ C3 │ C4 │
          └────┴────┴────┴────┘
             ↑    ↑
           reused
             connections
```

Application:

```text
Request
   ↓
Borrow connection
   ↓
Execute query
   ↓
Return connection to pool
```

The connection isn't necessarily destroyed after every request.

**Why is it useful?**

It:

* reduces connection creation overhead
* improves performance
* controls the number of simultaneous database connections

Spring Boot applications commonly use a connection pool such as **HikariCP**.

**Simple definition**

> Connection pooling maintains reusable database connections so applications don't need to create a new database connection for every request.

---

### 78. What is a database deadlock?

A deadlock occurs when two or more transactions are **waiting for each other indefinitely**.

Imagine:

```text
Transaction A
locks Row 1
     ↓
wants Row 2
```

At the same time:

```text
Transaction B
locks Row 2
     ↓
wants Row 1
```

Now:

```text
A → waiting for B
B → waiting for A
```

Neither can continue. That's a deadlock.

**Example**

```text
Transaction A:
Lock Account 1
Wait for Account 2

Transaction B:
Lock Account 2
Wait for Account 1
```

Conceptually:

```text
A ─────waits────→ B
↑                 │
└──────waits──────┘
```

The database detects deadlocks in many systems and chooses a transaction to abort/roll back so the others can proceed.

**How can we reduce deadlocks?**

One important technique is:

> Access shared resources in a consistent order.

For example, always lock:

```text
Account 1 → Account 2
```

instead of sometimes:

```text
Account 2 → Account 1
```

Other strategies include keeping transactions short and choosing appropriate locking/isolation behavior.

**Simple definition**

> A deadlock occurs when transactions hold resources that each other needs and wait for each other to release them.

---

### 79. What is Object-Relational Mapping (ORM)?

ORM stands for:

> **Object-Relational Mapping**

It allows us to work with database records using **programming language objects**.

Without ORM, you might write SQL directly:

```sql
SELECT *
FROM Employee
WHERE id = 10;
```

Then manually convert the result into a Java object.

With ORM, you can map:

```java
class Employee {
    Long id;
    String name;
    double salary;
}
```

to:

```text
Employee table
----------------
id
name
salary
```

Then the ORM handles much of the conversion.

**Java example**

Using JPA:

```java
@Entity
public class Employee {

    @Id
    private Long id;

    private String name;

    private double salary;
}
```

Now the Java class represents a database entity.

**In Spring Boot**

A common stack is:

```text
Java Entity
     ↓
JPA
     ↓
Hibernate
     ↓
JDBC
     ↓
Database
```

**Advantages**

ORM can reduce:

* repetitive SQL
* manual result mapping
* database access boilerplate

**Disadvantages**

ORM doesn't eliminate the need to understand SQL.

Poorly designed ORM queries can cause:

* N+1 problems
* inefficient queries
* unnecessary joins
* excessive data loading

**Simple definition**

> ORM is a technique that maps objects in a programming language to rows and tables in a relational database.

---

### 80. How would you find the second-highest salary from an Employee table?

This is a **very common SQL interview question**.

Suppose:

| employee_id | name | salary |
| ----------: | ---- | -----: |
|           1 | A    |  50000 |
|           2 | B    |  80000 |
|           3 | C    |  70000 |
|           4 | D    |  80000 |
|           5 | E    |  60000 |

The highest salary is:

```text
80000
```

The second-highest **distinct** salary is:

```text
70000
```

There are several ways to solve this.

**Method 1: `MAX()` with a subquery**

```sql
SELECT MAX(salary) AS second_highest
FROM Employee
WHERE salary < (
    SELECT MAX(salary)
    FROM Employee
);
```

How does it work? Inner query:

```sql
SELECT MAX(salary)
FROM Employee;
```

returns:

```text
80000
```

Then:

```sql
WHERE salary < 80000
```

removes the highest salary. Then `MAX()` finds the largest remaining salary:

```text
70000
```

This is one of the easiest approaches to explain in an interview.

**Method 2: `DISTINCT` + `ORDER BY`**

In databases that support `LIMIT`:

```sql
SELECT DISTINCT salary
FROM Employee
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

How it works. First:

```text
50000
60000
70000
80000
80000
```

`DISTINCT`:

```text
50000
60000
70000
80000
```

Sort descending:

```text
80000
70000
60000
50000
```

Skip the first:

```text
70000
```

That's the second-highest distinct salary.

**Method 3: `DENSE_RANK()`**

A more advanced and very useful approach is a window function:

```sql
SELECT salary
FROM (
    SELECT
        salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM Employee
) x
WHERE rnk = 2;
```

`DENSE_RANK()` gives:

| salary | rank |
| -----: | ---: |
|  80000 |    1 |
|  80000 |    1 |
|  70000 |    2 |
|  60000 |    3 |
|  50000 |    4 |

Then:

```sql
WHERE rnk = 2
```

returns:

```text
70000
```

Why `DENSE_RANK()`? Because we're asking for the second-highest **distinct salary**.
