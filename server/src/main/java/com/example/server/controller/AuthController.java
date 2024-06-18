package com.example.server.controller;

import com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.repository.UserRepository;
import com.example.server.response.ApiResponse;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

@RestController
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private HttpSession httpSession;

   
    @PostMapping("/user/login")
    public ResponseEntity<ApiResponse> login(@RequestBody User loginUser) {
        String username = loginUser.getUsername();
        String password = loginUser.getPassword();

        User user = userRepository.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            httpSession.setAttribute("user", user);
            ApiResponse response = new ApiResponse("Login successful!");
            response.setUser(user);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Invalid username or password"));
        }
    }

    @PostMapping("/user/logout")
    public ResponseEntity<ApiResponse> logout() {
        httpSession.invalidate();
        return ResponseEntity.ok(new ApiResponse("Logout successful"));
    }
    
    public ResponseEntity<User> getUserProfile() {
        User user = (User) httpSession.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}

