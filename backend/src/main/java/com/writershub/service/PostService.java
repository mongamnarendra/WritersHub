package com.writershub.service;

import com.writershub.entity.Post;
import com.writershub.entity.User;
import com.writershub.repository.PostRepository;
import com.writershub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private UserRepository userRepo;

    // ✅ Get all posts
    public List<Post> getAllPosts() {
        return postRepo.findAllByOrderByCreatedAtDesc();
    }

    // ✅ Get posts by specific author
    public List<Post> getPostsByAuthor(String username) {
        User author = userRepo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        return postRepo.findByAuthorOrderByCreatedAtDesc(author);
    }

    // ✅ Create a post (username comes from frontend)
    public Post createPost(String content, String username) {
        User author = userRepo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        Post post = new Post();
        post.setAuthor(author);
        post.setContent(content);
        post.setCreatedAt(new Date());

        return postRepo.save(post);
    }

    // ✅ Get post by ID
    public Post getPostById(Long postId) {
        return postRepo.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found with ID: " + postId));
    }

    // ✅ Toggle like (username passed from Angular)
    public Post toggleLike(Long postId, String username) {
        Post post = postRepo.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (post.getLikedUsers().contains(user)) {
            post.getLikedUsers().remove(user); // unlike
        } else {
            post.getLikedUsers().add(user); // like
        }

        return postRepo.save(post);
    }

    // ✅ Delete post with owner/admin logic
    public void deletePost(Long postId, String username, boolean isAdmin) {
        Post post = postRepo.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        boolean isOwner = post.getAuthor().getUsername().equals(username);

        if (!isOwner && !isAdmin) {
            throw new RuntimeException("You are not authorized to delete this post");
        }

        postRepo.delete(post);
    }
}
