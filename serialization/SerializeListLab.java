import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class SerializeListLab {
    public static void main(String[] args) throws IOException, ClassNotFoundException {

        List<Person> people = new ArrayList<>();
        people.add(new Person("Kiruthik Kumar", 22, "secret123"));
        people.add(new Person("Anish", 24, "hunter2"));
        people.add(new Person("Priya", 23, "letmein"));

        // Write the whole list in one go — ArrayList is already Serializable
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("people.ser"))) {
            out.writeObject(people);
            System.out.println("Saved " + people.size() + " people.");
        }

        // Read it back
        readAndPrint();
    }

    @SuppressWarnings("unchecked")
    private static void readAndPrint() throws IOException, ClassNotFoundException {
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("people.ser"))) {
            List<Person> loaded = (List<Person>) in.readObject();
            System.out.println("Loaded " + loaded.size() + " people:");
            for (Person p : loaded) {
                System.out.println("  " + p); // password will print as null for all
            }
        }
    }
}
