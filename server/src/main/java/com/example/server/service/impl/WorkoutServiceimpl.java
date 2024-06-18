package com.example.server.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.server.entity.Workout;
import com.example.server.repository.WorkoutRepo;
import com.example.server.service.WorkoutService;

@Service
public class WorkoutServiceimpl implements WorkoutService{
    @Autowired
    private WorkoutRepo workoutRepo;
    @Override
    public void addworkout(Workout workout) {
        // add workout in db
        workoutRepo.save(workout);
    }
    @Override
    public List<Workout> getWorkout() {
        // get all workouts in db 
       return workoutRepo.findAll(); 
    }
    @Override
    public Workout getWorkout(Integer id) {
       Workout workout = workoutRepo
                    .findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid User ID" +id));
        return workout;
}
    @Override
    public void updateWorkout(Integer id, Workout workout) {
        // check workout is in db

        workoutRepo
            .findById(id)
            .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "No Workout for the id" +id));
        workout.setId(id);

    workoutRepo.save(workout);
    }
    @Override
    public void deleteWorkout(Integer id) {
        // check user in db
       Workout workout = workoutRepo
        .findById(id)
        .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "No Workout for the id" +id));
    workout.setId(id);

    workoutRepo.delete(workout);
    }
}
