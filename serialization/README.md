# Java Serialization

**Goal:** understand what serialization is, implement it, avoid the common mistakes

---

## 1. What is serialization?

Objects live in memory (RAM) and vanish when the program stops. **Serialization** converts an object into a stream of bytes so it can be saved to a file, sent over a network, or stored somewhere — then rebuilt later exactly as it was. That rebuilding step is **deserialization**.

Analogy: saving a game. Your player object (health, inventory, position) exists in memory while you play. Serialization is how it gets written to a save file; deserialization is how it's loaded back.

**Note for later:** this is different from the JSON conversion Spring Boot does in REST APIs (that's Jackson, a separate library). `Serializable` produces raw Java-specific binary data — used for things like saving app state to disk or sending objects between two Java programs directly, not for web APIs.

---

## 2. Making a class serializable

```java
import java.io.Serializable;

public class Person implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}
```

- `implements Serializable` — a marker interface, no methods to override. Just tells the JVM "this class can be serialized." Skip it and you get a `NotSerializableException` at runtime.
- `serialVersionUID` — a version number for the class. Always declare this explicitly. If you skip it, Java auto-generates one based on class structure, and changing the class later (adding a field) can silently break old saved files.

---

## 3. Writing and reading a file 

```java
import java.io.*;

public class SerializeDemo {
    public static void main(String[] args) throws IOException, ClassNotFoundException {

        Person p = new Person("Kiruthik", 22);

        // Write (serialize)
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("person.ser"))) {
            out.writeObject(p);
            System.out.println("Saved: " + p);
        }

        // Read (deserialize)
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("person.ser"))) {
            Person loaded = (Person) in.readObject();
            System.out.println("Loaded: " + loaded);
        }
    }
}
```

Run it. You should see the same `Person` printed twice — once before saving, once after loading back from the file.

---

## 4. `transient` — skipping fields 

```java
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
    private transient String password; // never gets saved

    public Person(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }

    public String getPassword() { return password; }
    // other getters same as before
}
```

`transient` marks a field to be skipped during serialization — useful for sensitive data (passwords, tokens) or things that can't meaningfully be saved (like an open file handle). After deserializing, a transient field comes back as `null` (or `0`/`false` for primitives), not its original value.

**Try it:** serialize a `Person` with a password set, deserialize it, print the password. It'll be `null`.

---

## 5. Lab 

Build a small program:
1. Create 3 `Person` objects, one with a `transient` password field set
2. Write all 3 to a single file (hint: serialize a `List<Person>` instead of one at a time — `ArrayList` is already `Serializable`)
3. Read them back in a separate method/run
4. Print all 3 — confirm the transient field is `null` after loading, everything else is correct

---

## Common Errors

| Error | Cause | Fix |
|---|---|---|
| `NotSerializableException` | Forgot `implements Serializable`, or a field's type isn't serializable either | Add `Serializable` to the class and to any custom object types used as fields |
| `InvalidClassException` | Class changed since the file was saved, `serialVersionUID` mismatch | Expected if incompatible — keep `serialVersionUID` stable across versions you want to stay compatible |
| `FileNotFoundException` on read | Tried to deserialize before ever writing the file | Run the write step first, check the file path |
| transient field isn't actually null | Testing the object still in memory from before serializing, not the reloaded one | Make sure you're printing the object returned by `readObject()`, not the original |