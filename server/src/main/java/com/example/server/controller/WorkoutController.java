package com.example.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.entity.Workout;
import com.example.server.service.WorkoutService;


@RestController
@RequestMapping("/workout")
@CrossOrigin(origins = "*") 

public class WorkoutController {
         @Autowired
        private WorkoutService workoutService;

        @PostMapping("/add")
        public String addworkout(@RequestBody Workout workout){
           workoutService.addworkout(workout);

           
            return "Success";
            
        }

        @GetMapping("/getworkout")
        public List<Workout> getWorkout(){
                return workoutService.getWorkout();
        }

        @GetMapping("/getworkoutID")
        public Workout geWorkout(@RequestParam Integer id){
                return workoutService.getWorkout(id);
        }

        @PutMapping("/updateworkout/{id}")
        public ResponseEntity<Void> updateWorkout(@PathVariable Integer id, @RequestBody Workout workout ){
                workoutService.updateWorkout(id,workout);

                return ResponseEntity.noContent().build();
        }

        @DeleteMapping("/deleteworkout/{id}")
        public ResponseEntity<String> deleteWorkout(@PathVariable Integer id){
                workoutService.deleteWorkout(id);
                
                return ResponseEntity.ok().body("Successfully deleted workout with ID: " + id);
        }
}
