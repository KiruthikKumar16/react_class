package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/people")
public class PersonController {

    private List<Person> people = new ArrayList<>();
    private Long nextId = 1L;

    public PersonController() {
        create(new Person("Kiruthik Kumar", "Trainer"));
        create(new Person("Anish", "Developer"));
        create(new Person("Priya", "Designer"));
    }

    @GetMapping
    public List<Person> getAll() {
        return people;
    }

    @GetMapping("/{id}")
    public Person getById(@PathVariable Long id) {
        return people.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Person create(@RequestBody Person person) {
        person.setId(nextId++);
        people.add(person);
        return person;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        people.removeIf(p -> p.getId().equals(id));
        return "Deleted person with id: " + id;
    }
}
