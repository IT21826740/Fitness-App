package com.example.server.controller;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.server.entity.MealPlan;
import com.example.server.repository.MealPlanRepository;
import com.example.server.response.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin(origins = "*")

@RestController
public class MealPlanController {

    @Autowired
    MealPlanRepository repo;
    private static final String UPLOAD_DIR = "server/src/main/resources/static/uploads";
    
    
    //localhost:8080/mealplans
    @GetMapping("/mealplans")
    public List<MealPlan> getAllMeals() {
        List<MealPlan> mealPlans = repo.findAll();
        return mealPlans;
    }

    // localhost:8080/mealplans/1
    @GetMapping("/mealplans/{id}")
    public MealPlan getMealPlan(@PathVariable int id) {
        MealPlan mealPlan = repo.findById(id).get();
        return mealPlan;
    }

    @PostMapping("/mealplans/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ApiResponse createMealPlan(@RequestParam("file") MultipartFile file,
            @RequestParam("mealPlan") String mealPlanJson) {
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            System.out.println("path: " + filePath);
            Files.write(filePath, file.getBytes());
            
            MealPlan mealPlan = new ObjectMapper().readValue(mealPlanJson, MealPlan.class);
            mealPlan.setImagePath((filePath.toString()));

            repo.save(mealPlan);
            return new ApiResponse("Meal plan created successfully!");
            
        } catch (Exception e) {
            return new ApiResponse("Failed to create meal plan" + e.getMessage());
        }
    }
    
    @PutMapping("/mealplans/update/{id}")
    public ResponseEntity<ApiResponse> updateMealPlan(@PathVariable("id") int id,
                                                      @RequestParam(value = "file", required = false) MultipartFile file,                                               @RequestParam("mealPlan") String mealPlanJson) {
        try {
            Optional<MealPlan> optionalMealPlan = repo.findById(id);
            if (optionalMealPlan.isPresent()) {
                MealPlan mealPlan = optionalMealPlan.get();
                if (file != null) {
                    Path uploadPath = Paths.get(UPLOAD_DIR);
                    if (!Files.exists(uploadPath)) {
                        Files.createDirectories(uploadPath);
                    }
                    String fileName = file.getOriginalFilename();
                    Path filePath = Paths.get(UPLOAD_DIR, fileName);
                    Files.write(filePath, file.getBytes());
                    mealPlan.setImagePath(filePath.toString());
                }
                MealPlan updatedMealPlan = new ObjectMapper().readValue(mealPlanJson, MealPlan.class);
                mealPlan.setTitle(updatedMealPlan.getTitle());
                mealPlan.setDescription(updatedMealPlan.getDescription());
                mealPlan.setDietCategory(updatedMealPlan.getDietCategory());
                mealPlan.setScheduledDate(updatedMealPlan.getScheduledDate());
                repo.save(mealPlan);
                return ResponseEntity.ok().body(new ApiResponse("Meal plan updated successfully!"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Meal plan with id " + id + " not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed to update meal plan: " + e.getMessage()));
        }
    }


    @DeleteMapping("/mealplans/delete/{id}")
    public ApiResponse removeMealPlan(@PathVariable int id) {
        MealPlan mealPlan = repo.findById(id).get();
        repo.delete(mealPlan);
        return new ApiResponse("Meal plan deleted successfully");
    }
}
