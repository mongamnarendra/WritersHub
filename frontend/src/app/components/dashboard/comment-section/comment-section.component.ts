import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment.model'; // Adjust path if needed


@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  @Input() postId!: number;
  @Input() comments: Comment[] = [];
  newCommentText: string = '';
  currentUsername: string = '';

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadComments();

    this.currentUsername = this.authService.getUsername(); // assumes localStorage/session-based
  }

  loadComments(): void {
    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: (data) => this.comments = data,
      error: (err) => console.error(err)  
    });
    console.log(this.comments)
  }

  addComment(): void {
    if (!this.newCommentText.trim()) return;
    this.commentService.addComment(this.postId, this.newCommentText).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        this.newCommentText = '';
      },
      error: (err) => console.error(err)
    });
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
      },
      error: (err) => console.error(err)
    });
  }

  canDelete(comment: Comment): boolean {
    return comment.user?.username === this.currentUsername || this.authService.isAdmin();
  }
}
