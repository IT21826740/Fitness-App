package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.entity.MealPlan;

public interface MealPlanRepository extends JpaRepository<MealPlan,Integer>{

}
