package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
    // findAll(), findById(), save(), deleteById() all come free — no code needed
}
