package com.writershub.controllers;

import com.writershub.entity.Comment;
import com.writershub.entity.User;
import com.writershub.repository.UserRepository;
import com.writershub.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(
    origins = {"http://localhost:4200", "http://cloudbuck28.s3-website-us-east-1.amazonaws.com"}
)
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserRepository userRepository;

    // ✅ Get all comments for a post
    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getCommentsForPost(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsForPost(postId));
    }

    // ✅ Add comment (username from request body)
    @PostMapping("/post/{postId}")
    public ResponseEntity<?> addComment(
            @PathVariable Long postId,
            @RequestBody Map<String, String> request) {

        String text = request.get("text");
        String username = request.get("username");

        if (username == null || username.isBlank()) {
            return ResponseEntity.status(401).body("Username is required");
        }

        return ResponseEntity.ok(commentService.addComment(postId, text, username));
    }

    // ✅ Delete comment (username from request body)
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long commentId,
            @RequestBody Map<String, String> request) {

        String username = request.get("username");
        if (username == null || username.isBlank()) {
            return ResponseEntity.status(401).body("Username is required");
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        try {
            commentService.deleteComment(commentId, user);
            return ResponseEntity.ok("Comment deleted");
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}
