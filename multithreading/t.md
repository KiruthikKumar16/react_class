# Java Multithreading

**Goal:** understand what a thread is, create one, see a race condition break, fix it

---

## 1. What is a thread, and why does it matter?

So far, code runs one instruction at a time, top to bottom. A **thread** is an independent path of execution — multiple threads let a program do multiple things at once.

You've already benefited from this without writing any thread code: every time two Postman requests hit your Spring Boot API at the same time, Spring handled them on separate threads, concurrently. Today you see what's actually happening underneath.

---

## 2. Creating a thread

**Two ways — `Runnable` is the one to actually use:**

```java
// Way 1: extend Thread (works, but rarely the better choice)
class MyThread extends Thread {
    public void run() {
        System.out.println("Running in a thread");
    }
}
new MyThread().start();
```

```java
// Way 2: implement Runnable (preferred)
class MyTask implements Runnable {
    public void run() {
        System.out.println("Running in a thread");
    }
}
new Thread(new MyTask()).start();

// or shorter, with a lambda
new Thread(() -> System.out.println("Running in a thread")).start();
```

`Runnable` is preferred because Java doesn't support multiple inheritance — if your class already extends something, you can't also extend `Thread`. `Runnable` avoids that limitation.

**Important:** always call `.start()`, never `.run()` directly. `.run()` just executes like a normal method call on the current thread — no new thread gets created. `.start()` is what actually spins one up.

---

## 3. Race conditions — the centerpiece 

This is the most important thing to actually understand today. Everything else is scaffolding around this one idea.

```java
class Counter {
    private int count = 0;

    public void increment() {
        count++; // looks like one step — it's actually 3: read, add, write
    }

    public int getCount() {
        return count;
    }
}

public class RaceConditionDemo {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Runnable task = () -> {
            for (int i = 0; i < 10000; i++) {
                counter.increment();
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Expected: 20000, Actual: " + counter.getCount());
    }
}
```

**Run this 3 times.** You'll likely get 3 different numbers, all below 20000 (occasionally you might get lucky and hit 20000 by chance — run it more times if so).

**Why:** `count++` isn't one atomic operation. It's read the current value, add one, write it back. If two threads interleave those steps — both read the same value before either writes — one increment gets lost. This is a **race condition**: the result depends on timing, and timing isn't guaranteed. It's silent, inconsistent, and can pass every test and still break under real load in production.

---

## 4. Fixing it with `synchronized`

```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}
```

`synchronized` on a method means only one thread can execute it on a given object at a time — any other thread calling it has to wait its turn.

**Run the exact same demo again.** It should now reliably print 20000 every single run.

**One thing to flag:** both methods that touch `count` need to be synchronized, not just `increment()`. Miss `getCount()` and you can still get inconsistent reads under heavy load.

`synchronized` is the simplest fix and the right one to learn first. Production code sometimes reaches for `AtomicInteger` or other concurrency utilities for performance reasons — not needed today, just know they exist.

---

## 5. Thread lifecycle, briefly 

New → Runnable (ready, waiting for CPU) → Running → Blocked/Waiting (e.g. waiting on a lock, or `Thread.sleep()`) → Terminated.

`thread.join()` — used above — makes the calling thread (`main`) wait until that thread finishes before moving on. Without it, `main()` could print a result before the worker threads are actually done.

---

## 6. Lab 

1. Run the race condition demo 3 times, write down the 3 different (wrong) results
2. Fix it with `synchronized`, confirm it now reliably outputs 20000
3. Build a `BankAccount` class with `deposit(int amount)` and `withdraw(int amount)` methods that modify a `balance` field. Race-condition it — two threads doing simultaneous deposits — then fix it with `synchronized`.
4. Bonus: instead of synchronizing the whole method, try synchronizing just the risky line with a block: `synchronized(this) { balance += amount; }` — confirm it still fixes the race condition

---

## Common Errors

| Error | Cause | Fix |
|---|---|---|
| Still inconsistent after adding `synchronized` | Only one of the two methods touching the shared field got synchronized | Synchronize every method that reads or writes the shared value |
| Program hangs / never finishes | Missing `.join()`, or (more advanced) a deadlock from multiple locks | Keep locks simple today — one shared lock, always synchronize on the same object |
| Typo: called `.run()` instead of `.start()` | Common early mistake | `.run()` doesn't create a thread at all — always use `.start()` |
| Numbers are right every time even without `synchronized` | Race conditions are timing-dependent — may not show up on every machine/run, especially with small loop counts | Increase the loop count (e.g. 100000) to make the race condition show up reliably for demo purposes |