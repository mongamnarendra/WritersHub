package com.writershub.repository;

import com.writershub.entity.Post;
import com.writershub.entity.User;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthor(User author);
    
    @Modifying
    @Transactional
    @Query(
        value = "INSERT INTO post (author_id, content, created_at) VALUES (:authorId, :content, :createdAt)",
        nativeQuery = true
    )
    void insertPost(@Param("authorId") Long authorId, @Param("content") String content, @Param("createdAt") Date createdAt);

	List<Post> findAllByOrderByCreatedAtDesc();

	List<Post> findByAuthorOrderByCreatedAtDesc(User author);
}
