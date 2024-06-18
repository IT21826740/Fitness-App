package com.example.server.repository;

import com.example.server.entity.CreatePost;
import com.example.server.entity.LikePost;
import com.example.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LikePostRepository extends JpaRepository<LikePost, Long> {
    LikePost findByUserAndPost(User user, CreatePost post);
    @Query("SELECT COUNT(l) FROM Likepost l WHERE l.createPost.id = ?1")
    Long countLikesByCreatePostId(int post_id);
}