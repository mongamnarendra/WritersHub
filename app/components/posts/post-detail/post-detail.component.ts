import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';
import { Post } from 'src/app/models/post.model';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postId!: number;
  post!: Post;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPost();
    this.loadComments();
  }

  loadPost(): void {
    this.postService.getPostById(this.postId).subscribe(post => {
      this.post = post;
    });
  }

  loadComments(): void {
    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.error("Failed to load comments", err);
      }
    });

  }
}
