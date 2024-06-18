package com.example.server.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.entity.Comments;
import com.example.server.entity.MealPlan;
import com.example.server.entity.User;
import com.example.server.repository.CommentRepository;
import com.example.server.repository.MealPlanRepository;
import com.example.server.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController

public class CommentController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MealPlanRepository mealPlanRepository;
    @Autowired
    private CommentRepository commentRepository;

    @PostMapping("/comments/add")

    public ResponseEntity<String> addComment(@RequestParam("user_id") int userId,
            @RequestParam("meal_id") int mealPlanId,
            @RequestParam("content") String content) {
        User user = userRepository.findById(userId).orElse(null);
        MealPlan mealPlan = mealPlanRepository.findById(mealPlanId).orElse(null);

        if (user != null && mealPlan != null) {
            Comments comment = new Comments(content, user, mealPlan);
            commentRepository.save(comment);
            return ResponseEntity.ok("Comment added successfully!");
        } else {
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Meal plan with ID " + mealPlanId + " not found.");
            }
        }
    }

    @GetMapping("/comments/{meal_id}")
    public ResponseEntity<List<Comments>> getCommentsByMealId(@PathVariable("meal_id") int mealPlanId) {
        MealPlan mealPlan = mealPlanRepository.findById(mealPlanId).orElse(null);

        if (mealPlan != null) {
            List<Comments> comments = commentRepository.findByMealPlan(mealPlan);
            return ResponseEntity.ok(comments);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/comments/count/{meal_id}")
    public ResponseEntity<Integer> getCommentCountByMealId(@PathVariable("meal_id") int mealPlanId) {
        MealPlan mealPlan = mealPlanRepository.findById(mealPlanId).orElse(null);

        if (mealPlan != null) {
            List<Comments> comments = commentRepository.findByMealPlan(mealPlan);
            int commentCount = comments.size();
            return ResponseEntity.ok(commentCount);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(0);
        }
    }
   @DeleteMapping("/comments/{comment_id}")
    public ResponseEntity<String> deleteCommentById(@PathVariable("comment_id") Long commentId) {
        Comments comment = commentRepository.findById(commentId).orElse(null);

        if (comment != null) {
            commentRepository.delete(comment);
            return ResponseEntity.ok("Comment deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
