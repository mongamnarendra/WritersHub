package com.writershub.service;

import com.writershub.entity.Comment;
import com.writershub.entity.Post;
import com.writershub.entity.User;
import com.writershub.entity.User.Role;
import com.writershub.repository.CommentRepository;
import com.writershub.repository.PostRepository;
import com.writershub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private UserRepository userRepo;

    public Comment addComment(Long postId, String text, String username) {
        Post post = postRepo.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUser(user);
        comment.setText(text);
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepo.save(comment);
    }
    
    public List<Comment> getCommentsForPost(Long postId) {
        Post post = postRepo.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        return commentRepo.findByPostOrderByCreatedAtDesc(post);
    }
    

    public void deleteComment(Long commentId, User user) {
        Comment comment = commentRepo.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));

        boolean isOwner = comment.getUser().getId().equals(user.getId());
        boolean isAdmin = user.getRole() == Role.ADMIN;

        if (!isOwner && !isAdmin) {
            throw new RuntimeException("Unauthorized to delete this comment");
        }
        commentRepo.delete(comment);
    }

}
