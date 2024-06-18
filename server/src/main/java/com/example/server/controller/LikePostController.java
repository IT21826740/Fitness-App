package com.example.server.controller;

import com.example.server.entity.CreatePost;
import com.example.server.entity.LikePost;
import com.example.server.entity.User;
import com.example.server.repository.CreatePostRepsitory;
import com.example.server.repository.LikePostRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class LikePostController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CreatePostRepsitory createPostRepository;

    @Autowired
    private LikePostRepository likePostRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addLike(@RequestParam("user_id") int userId,
                                          @RequestParam("post_id") int postId) {
        User user = userRepository.findById(userId).orElse(null);
        CreatePost createPost = createPostRepository.findById(postId).orElse(null);

        if (user == null || createPost == null) {
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post with ID " + postId + " not found.");
            }
        }

        LikePost existingLike = likePostRepository.findByUserAndPost(user, createPost);
        if (existingLike == null) {
            LikePost like = new LikePost(user, createPost);
            likePostRepository.save(like);
            return ResponseEntity.ok("Like added successfully!");
        } else {
            return ResponseEntity.badRequest().body("You have already liked this post.");
        }
    }


}
