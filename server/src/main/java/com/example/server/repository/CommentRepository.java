package com.example.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.entity.Comments;
import com.example.server.entity.MealPlan;

public interface CommentRepository extends JpaRepository<Comments, Long> {
    List<Comments> findByMealPlan(MealPlan mealPlan);

}
