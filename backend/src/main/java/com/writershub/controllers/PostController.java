package com.writershub.controllers;

import com.writershub.entity.Post;
import com.writershub.entity.User;
import com.writershub.repository.UserRepository;
import com.writershub.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(
    origins = {"http://localhost:4200", "http://cloudbuck28.s3-website-us-east-1.amazonaws.com"}
)
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    
    @GetMapping("/me")
    public ResponseEntity<?> getMyPosts(@RequestHeader("X-Username") String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty() || userOpt.get().getRole() != User.Role.WRITER) {
            return ResponseEntity.status(401).body("Unauthorized: Only writers can view their posts");
        }

        return ResponseEntity.ok(postService.getPostsByAuthor(username));
    }

    
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody Map<String, String> payload) {
        String content = payload.get("content");
        String username = payload.get("username");

        if (username == null || content == null) {
            return ResponseEntity.badRequest().body("Missing content or username");
        }

        try {
            Post createdPost = postService.createPost(content, username);
            return ResponseEntity.ok(createdPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create post");
        }
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<?> toggleLike(
            @PathVariable Long postId,
            @RequestHeader("X-Username") String username) {
        return ResponseEntity.ok(postService.toggleLike(postId, username));
    }

    
    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(
            @PathVariable Long postId,
            @RequestHeader("X-Username") String username) {

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        boolean isAdmin = userOpt.get().getRole() == User.Role.ADMIN;

        try {
            postService.deletePost(postId, username, isAdmin);
            return ResponseEntity.ok("Post deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

  
    @GetMapping("/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable Long postId) {
        try {
            Post post = postService.getPostById(postId);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
