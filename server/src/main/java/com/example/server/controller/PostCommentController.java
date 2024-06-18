package com.example.server.controller;

import com.example.server.entity.CreatePost;
import com.example.server.entity.PostComment;
import com.example.server.entity.User;
import com.example.server.repository.CreatePostRepsitory;
import com.example.server.repository.PostCommentRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController

public class PostCommentController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CreatePostRepsitory createPostRepository;
    @Autowired
    private PostCommentRepository postCommentRepository;

    @PostMapping("/postcomment/add")

    public ResponseEntity<String> addComment(@RequestParam("user_id") int userId,
                                             @RequestParam("post_id") int postId,
                                             @RequestParam("content") String content) {
        User user = userRepository.findById(userId).orElse(null);
        CreatePost createPost = createPostRepository.findById(postId).orElse(null);
//mealPlanId = postId
// mealPlan = createPost
        if (user != null && createPost != null) {
            PostComment comment = new PostComment(content, user, createPost);
            postCommentRepository.save(comment);
            return ResponseEntity.ok("Comment added successfully!");
        } else {
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Post with ID " + postId + " not found.");
            }
        }
    }


    @GetMapping("/comments/{post_id}")
    public ResponseEntity<List<PostComment>> getCommentsByMealId(@PathVariable("post_id") int postId) {
        CreatePost createPost = createPostRepository.findById(postId).orElse(null);

        if (createPost != null) {
            List<PostComment> comments = postCommentRepository.findByCreatePost(createPost);
            return ResponseEntity.ok(comments);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.emptyList());
        }
    }


    @GetMapping("/comments/count/{post_id}")
    public ResponseEntity<Integer> getCommentCountByPostId(@PathVariable("post_id") int postId) {
        CreatePost createPost = createPostRepository.findById(postId).orElse(null);

        if (createPost != null) {
            List<PostComment> comments = postCommentRepository.findByCreatePost(createPost);
            int commentCount = comments.size();
            return ResponseEntity.ok(commentCount);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(0);
        }
    }
    @DeleteMapping("/comments/{comment_id}")
    public ResponseEntity<String> deleteCommentById(@PathVariable("comment_id") Long commentId) {
        PostComment comment = postCommentRepository.findById(commentId).orElse(null);

        if (comment != null) {
            postCommentRepository.delete(comment);
            return ResponseEntity.ok("Comment deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
