package com.writershub.controllers;

import com.writershub.entity.User;
import com.writershub.entity.User.Role;
import com.writershub.repository.UserRepository;
import com.writershub.service.UserService;

import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(
    origins = {"http://localhost:4200", "http://cloudbuck28.s3-website-us-east-1.amazonaws.com"}
)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepo;

    // ✅ Get current user info
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("X-Username") String username) {
        return userService.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElseThrow();
    }

    // ✅ Get all users (admin only)
    @GetMapping
    public ResponseEntity<?> getAllUsers(@RequestHeader("X-Username") String username) {
        User user = userRepo.findByUsername(username)
                .orElse(null);
        if (user == null || user.getRole() != Role.ADMIN) {
            return ResponseEntity.status(403).body("Only admin can view all users");
        }
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // ✅ Get any user by username (admin or same user)
    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(
            @PathVariable String username,
            @RequestHeader("X-Username") String requester) {

        User requesterUser = userRepo.findByUsername(requester).orElse(null);
        if (requesterUser == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        if (!requesterUser.getUsername().equals(username) && requesterUser.getRole() != Role.ADMIN) {
            return ResponseEntity.status(403).body("Not authorized to view this user");
        }

        return userService.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElseThrow();
    }

    // ✅ Delete user (admin only)
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId, @RequestHeader("X-Username") String username) {
        User admin = userRepo.findByUsername(username).orElse(null);
        if (admin == null || admin.getRole() != Role.ADMIN) {
            return ResponseEntity.status(403).body("Only admin can delete users");
        }

        userService.deleteUserById(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
}
