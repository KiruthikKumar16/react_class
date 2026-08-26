# Java Full Stack Interview Prep Checklist

*For entry-level Java Full Stack roles*

**How to use this:** Work top to bottom. Don't move to the next phase until you're comfortable, not just "aware," of the current one. Check items off as you go.

---

## Phase 1: Java Fundamentals

- [ ] Comfortable explaining OOP: encapsulation, inheritance, polymorphism, abstraction — with a real example, not just definitions
- [ ] Difference between overloading and overriding
- [ ] Interfaces vs abstract classes — when to use which
- [ ] `equals()` vs `==`, and the `hashCode()` contract
- [ ] Collections framework: List, Set, Map — when to use ArrayList vs LinkedList vs HashMap vs TreeMap
- [ ] Exception handling — checked vs unchecked exceptions, try/catch/finally
- [ ] Basics of multithreading (Thread, Runnable, synchronized) — conceptual level is fine
- [ ] JVM basics: what happens when you run a `.java` file (compile → bytecode → JVM)
- [ ] Streams and lambdas (Java 8+) — map, filter, reduce
- [ ] Can write a class from scratch without an IDE's help

---

## Phase 2: Data Structures & Algorithms

- [ ] Arrays & strings — two-pointer, sliding window patterns
- [ ] Hashmaps — frequency counting, lookups in O(1)
- [ ] Linked lists — reverse, detect cycle
- [ ] Stacks & queues — basic use cases
- [ ] Trees — traversals (inorder/preorder/postorder), BFS/DFS
- [ ] Sorting — know how quicksort/mergesort work conceptually, not just call `Collections.sort()`
- [ ] Binary search — and variations
- [ ] Recursion — comfortable tracing through a recursive call
- [ ] Can state time/space complexity of your own solution without prompting
- [ ] Solved at least 40–60 easy/medium problems (LeetCode, HackerRank, or similar)
- [ ] Practiced explaining your approach out loud *before* coding, not just coding silently

---

## Phase 3: Spring Boot

- [ ] Can build a basic REST controller (`@RestController`, `@GetMapping`, `@PostMapping`, etc.)
- [ ] Understand dependency injection and `@Autowired`
- [ ] Know the difference between `@Component`, `@Service`, `@Repository`
- [ ] Basic JPA/Hibernate: entities, repositories, `@OneToMany`/`@ManyToOne`
- [ ] Can explain request flow: client → controller → service → repository → DB
- [ ] Basic exception handling in APIs (`@ExceptionHandler` or global handler)
- [ ] Understand `application.properties`/`application.yml` basics (DB config, ports)
- [ ] Comfortable explaining what Spring Boot auto-configuration actually saves you from doing

---

## Phase 4: Frontend Basics

- [ ] HTML/CSS fundamentals — box model, flexbox basics
- [ ] JavaScript fundamentals — variables, functions, array methods (map/filter/reduce)
- [ ] DOM manipulation and events, at least conceptually
- [ ] If React/Angular is on your resume:
  - [ ] Components, props, state
  - [ ] Can explain one hook (useState/useEffect) or equivalent lifecycle concept
  - [ ] Comfortable saying "I built X feature" and explaining how data flowed through it

---

## Phase 5: Databases & SQL

- [ ] Can write SELECT queries with JOIN, GROUP BY, WHERE, ORDER BY without looking it up
- [ ] Understand INNER vs LEFT vs RIGHT join
- [ ] Basic normalization concepts (1NF, 2NF, 3NF — just the idea, not textbook definitions)
- [ ] What an index is and why it speeds up queries
- [ ] Primary key vs foreign key
- [ ] (Bonus) Basic NoSQL/MongoDB concepts if it's on your resume

---

## Phase 6: Tools & Workflow

- [ ] Git: clone, branch, commit, push, pull, merge
- [ ] Can explain how you'd resolve a merge conflict
- [ ] Basic understanding of CI/CD (what it is, not necessarily hands-on)
- [ ] Comfortable using Postman or similar to test an API you built
- [ ] Maven or Gradle basics — what a build tool actually does for you

---

## Phase 7: Lightweight System Design

- [ ] Can explain client-server model and REST principles in plain language
- [ ] Can sketch a simple architecture for something like "design a URL shortener" or "design a basic blog app"
- [ ] Understand MVC pattern
- [ ] Not expected to design at scale — focus on clarity of thought, not buzzwords

---

## Phase 8: Resume, Projects & Behavioral

- [ ] Can explain **every** technology listed on your resume — if you can't defend it, remove it
- [ ] For each project: know *why* you made key decisions (why this DB, why Spring Boot)
- [ ] Have 1 story ready for: a bug you struggled with, a deadline you missed/met, a team conflict
- [ ] Can answer "why this company / why this role" specifically, not generically
- [ ] Practiced saying "I don't know, but here's how I'd figure it out" — it's fine to not know everything

---

## Final Week: Mock Interview Readiness

- [ ] Done at least 1–2 full mock interviews (coding + technical + behavioral)
- [ ] Practiced thinking out loud while coding — silence is a red flag to interviewers
- [ ] Can clarify requirements before jumping into a coding problem
- [ ] Reviewed feedback from mocks and fixed the same mistake twice, not just noted it once
- [ ] Comfortable with silence/pauses — it's okay to pause and think before answering

---

## Practice Resources (pick 1–2, don't scatter across all)
- **DSA:** LeetCode (Easy → Medium), NeetCode roadmap
- **Java/Spring:** Spring Boot official guides, Baeldung
- **SQL:** SQLZoo, Mode SQL tutorial
- **System design (basic):** "Grokking the System Design Interview" — intro chapters only at this level
