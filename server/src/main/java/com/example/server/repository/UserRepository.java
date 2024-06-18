package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    boolean existsByUsername(String username);
}
