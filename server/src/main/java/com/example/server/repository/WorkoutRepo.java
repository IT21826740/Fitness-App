package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.entity.Workout;

public interface WorkoutRepo  extends  JpaRepository<Workout,Integer>{

}
