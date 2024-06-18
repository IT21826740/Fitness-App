package com.example.server.controller;

import com.example.server.entity.CreatePost;
import com.example.server.repository.CreatePostRepsitory;
import com.example.server.response.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class CreatePostController {

    @Autowired
    CreatePostRepsitory repo;

    private static final String UPLOAD_DIR ="server/src/main/resources/static/post";

    //localhost:8080/post/all
    @GetMapping("/post/all")
    public List<CreatePost> getAllPost(){
        List<CreatePost> createPosts = repo.findAll();
        return createPosts;
    }

    // localhost:8080/post/1
    @GetMapping("/post/{id}")
    public CreatePost getCreatePost(@PathVariable int id) {
        CreatePost createPost = repo.findById(id).get();
        return createPost;
    }

    @PostMapping("/post/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ApiResponse addPost(@RequestParam("file") MultipartFile file,
            @RequestParam("caption") String caption) {
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            System.out.println("path: " + filePath);
            Files.write(filePath, file.getBytes());

            CreatePost createPost = new CreatePost(caption, filePath.toString());
            createPost.setCreatedAt(Instant.now());

            repo.save(createPost);

            return new ApiResponse("Post created successfully!");
        } catch (Exception e) {
            return new ApiResponse("Failed to create post: " + e.getMessage());
        }
    }

  @PutMapping("/post/update/{id}")
    public ResponseEntity<ApiResponse> updateCreatePost(@PathVariable("id") int id,
                                                      @RequestParam(value = "file", required = false) MultipartFile file,
                                                      @RequestParam("post") String createPostJson) {
        try {
            Optional<CreatePost> optionalCreatePost = repo.findById(id);
            if (optionalCreatePost.isPresent()) {
                CreatePost createPost = optionalCreatePost.get();
                if (file != null) {
                    Path uploadPath = Paths.get(UPLOAD_DIR);
                    if (!Files.exists(uploadPath)) {
                        Files.createDirectories(uploadPath);
                    }
                    String fileName = file.getOriginalFilename();
                    Path filePath = Paths.get(UPLOAD_DIR, fileName);
                    Files.write(filePath, file.getBytes());
                    createPost.setImagePath(filePath.toString());
                }
                CreatePost updatedCreatePost = new ObjectMapper().readValue(createPostJson, CreatePost.class);
                createPost.setCaption(updatedCreatePost.getCaption());
           
                repo.save(createPost);
                return ResponseEntity.ok().body(new ApiResponse("Post updated successfully!"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Post with id " + id + " not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed to update post: " + e.getMessage()));
        }
    }



    @DeleteMapping("/post/delete/{id}")
    public ApiResponse removeCreatePost(@PathVariable int id) {
        CreatePost createPost = repo.findById(id).get();
        repo.delete(createPost);
        return new ApiResponse("Post deleted successfully");
    }


}

