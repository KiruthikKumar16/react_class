import java.io.*;

public class SerializeDemo {
    public static void main(String[] args) throws IOException, ClassNotFoundException {

        Person p = new Person("Kiruthik", 22, "secret123");

        // Write (serialize)
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("person.ser"))) {
            out.writeObject(p);
            System.out.println("Saved: " + p);
        }

        // Read (deserialize)
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("person.ser"))) {
            Person loaded = (Person) in.readObject();
            System.out.println("Loaded: " + loaded);
            // password will print as null — transient fields are never saved
        }
    }
}
