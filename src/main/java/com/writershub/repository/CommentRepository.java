package com.writershub.repository;

import com.writershub.entity.Comment;
import com.writershub.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	 List<Comment> findByPostOrderByCreatedAtDesc(Post post);
}
