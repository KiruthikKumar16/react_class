package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hello")
public class HelloController {

    @GetMapping
    public String sayHello() {
        return "Hello from Spring Boot";
    }

    @GetMapping("/bye")
    public String sayBye() {
        return "Goodbye from Spring Boot";
    }

    @GetMapping("/person")
    public Person getPerson() {
        return new Person("Kiruthik", "Trainer");
    }

    @GetMapping("/{id}")
    public String getById(@PathVariable Long id) {
        return "You asked for ID: " + id;
    }

    @GetMapping("/search")
    public String search(@RequestParam String name) {
        return "Searching for: " + name;
    }

    @PostMapping
    public String create(@RequestBody Person person) {
        return "Created: " + person.getName() + " as " + person.getRole();
    }

    @PutMapping("/{id}")
    public String update(@PathVariable Long id, @RequestBody Person person) {
        return "Updated person " + id + " to: " + person.getName() + ", " + person.getRole();
    }
}
