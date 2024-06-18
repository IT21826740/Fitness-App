package com.example.server.repository;

import com.example.server.entity.CreatePost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreatePostRepsitory extends JpaRepository<CreatePost,Integer> {
}
