package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.server.entity.Likes;
import com.example.server.entity.MealPlan;
import com.example.server.entity.User;

public interface LikesRepository extends JpaRepository<Likes,Long> {
    Likes findByUserAndMealPlan(User user, MealPlan mealPlan);
   @Query("SELECT COUNT(l) FROM Likes l WHERE l.mealPlan.id = ?1")
    Long countLikesByMealPlanId(int meal_id);
}
