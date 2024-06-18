package com.example.server.repository;

import com.example.server.entity.CreatePost;
import com.example.server.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
    List<PostComment> findByCreatePost(CreatePost createPost);
}
