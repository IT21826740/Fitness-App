package com.example.server.controller;

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

import com.example.server.entity.Likes;
import com.example.server.entity.MealPlan;
import com.example.server.entity.User;
import com.example.server.repository.LikesRepository;
import com.example.server.repository.MealPlanRepository;
import com.example.server.repository.UserRepository;

@CrossOrigin(origins = "*")

@RestController
public class LikesController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Autowired
    private LikesRepository likesRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addLike(@RequestParam("user_id") int userId,
            @RequestParam("meal_id") int mealPlanId) {
        User user = userRepository.findById(userId).orElse(null);
        MealPlan mealPlan = mealPlanRepository.findById(mealPlanId).orElse(null);

        if (user != null && mealPlan != null) {
            Likes existingLike = likesRepository.findByUserAndMealPlan(user, mealPlan);
            if (existingLike == null) {
                Likes like = new Likes(user, mealPlan);
                likesRepository.save(like);
                return ResponseEntity.ok("Like added successfully!");
            } else {
                return ResponseEntity.badRequest().body("You have already liked this meal plan.");
            }
        } else {
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Meal plan with ID " + mealPlanId + " not found.");
            }
        }
    }
    
    @GetMapping("/likes/{mealPlanId}/count")
    public ResponseEntity<Long> getLikesCountForMealPlan(@PathVariable int mealPlanId) {
        Long likesCount = likesRepository.countLikesByMealPlanId(mealPlanId);
        return ResponseEntity.ok(likesCount);
    }

      @DeleteMapping("/remove")
    public ResponseEntity<String> removeLike(@RequestParam("user_id") int userId,
                                             @RequestParam("meal_id") int mealPlanId) {
        User user = userRepository.findById(userId).orElse(null);
        MealPlan mealPlan = mealPlanRepository.findById(mealPlanId).orElse(null);

        if (user != null && mealPlan != null) {
            Likes existingLike = likesRepository.findByUserAndMealPlan(user, mealPlan);
            if (existingLike != null) {
                likesRepository.delete(existingLike);
                return ResponseEntity.ok("Unliked the post !");
            } else {
                return ResponseEntity.badRequest().body("You have not liked this meal plan.");
            }
        } else {
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Meal plan with ID " + mealPlanId + " not found.");
            }
        }
    }

}
