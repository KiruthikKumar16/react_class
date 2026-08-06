package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PersonService {

    private final PersonRepository repository;

    public PersonService(PersonRepository repository) {
        this.repository = repository;
    }

    public List<Person> getAll() {
        return repository.findAll();
    }

    public Person getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Person create(Person person) {
        return repository.save(person);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
