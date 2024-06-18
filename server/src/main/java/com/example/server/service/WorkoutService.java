package com.example.server.service;

import java.util.List;

import com.example.server.entity.Workout;

public interface WorkoutService {
            void addworkout(Workout workout);

    List<Workout> getWorkout();

    Workout getWorkout(Integer id);

    void updateWorkout(Integer id, Workout workout);

    void deleteWorkout(Integer id);

}
