package com.example.server.controller;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.nio.file.Path;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.server.repository.UserRepository;
import com.example.server.response.ApiResponse;
import com.example.server.entity.User;

@CrossOrigin(origins = "*")

@RestController
public class UserController {

    @Autowired
    UserRepository repo;

    private static final String PROFILE_UPLOAD_DIR = "server/src/main/resources/static/profile";
    private static final String COVER_UPLOAD_DIR = "server/src/main/resources/static/cover";

    @GetMapping("/user")
    public List<User> getAllUsers() {
        List<User> user = repo.findAll();
        return user;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        Optional<User> userOptional = repo.findById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

       @PostMapping("/user/add")
       public ResponseEntity<ApiResponse> createUser(@RequestBody User user) {
           try {
               if (repo.existsByUsername(user.getUsername())) {
                   ApiResponse response = new ApiResponse("Username already exists");
                   return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
               }

               repo.save(user);
               ApiResponse response = new ApiResponse("User created successfully!");
               return ResponseEntity.status(HttpStatus.CREATED).body(response);
           } catch (DataIntegrityViolationException e) {
               ApiResponse response = new ApiResponse("Error creating user: " + e.getRootCause().getMessage());
               return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
           }
       }
    
        @PostMapping("/user/{id}/profile-picture")
        public ResponseEntity<String> uploadProfilePicture(@PathVariable int id,
     @RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Please select a file");
            }
            User user = repo.findById(id).orElse(null);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            String fileName = file.getOriginalFilename();
            String avatarPath = saveFile(file, PROFILE_UPLOAD_DIR);
            user.setProfilePath(avatarPath);
            repo.save(user);
            return ResponseEntity.ok().body(avatarPath);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload cover photo: " + e.getMessage());
        }
    }

    @PostMapping("/user/{id}/cover-photo")
    public ResponseEntity<String> uploadCoverPhotoAndGetPath(@PathVariable int id,
            @RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Please select a file");
            }
            User user = repo.findById(id).orElse(null);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            String fileName = file.getOriginalFilename();
            String filePath = saveFile(file, COVER_UPLOAD_DIR);
            user.setCoverPath(filePath);
            repo.save(user);
            return ResponseEntity.ok().body(filePath); 
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload cover photo: " + e.getMessage());
        }
    }

    private String saveFile(MultipartFile file, String uploadDir) throws IOException {
        String fileName = file.getOriginalFilename();
        String filePath = Paths.get(uploadDir, fileName).toString();
        byte[] bytes = file.getBytes();
        Path path = Paths.get(filePath);
        Files.write(path, bytes);
        return filePath;
    }
}


