import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser!: any;
  posts: Post[] = [];
  newPostContent: string = '';
  newComment: { [key: number]: string } = {};

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {
  const user = this.authService.getCurrentUserFromStorage();

  if (user) {
    this.currentUser = user;
    this.loadPosts(); // or any logic based on the user
  } else {
    console.error("User not found in localStorage");
    // Optionally redirect to login page if not logged in
  }
}


  loadPosts(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;

      // Load comments for each post
      this.posts.forEach(post => {
        this.commentService.getCommentsByPost(post.id!).subscribe(comments => {
          post.comments = comments;
        });
      });
    });
  }
  
  canDeleteComment(comment: Comment): boolean {
    return comment.user?.id === this.currentUser.id || this.currentUser.role === 'ADMIN';
  }

  createPost(): void {
    if (!this.newPostContent.trim()) return;

    const newPost = {
      content: this.newPostContent,
      createdAt: new Date()
    };

    this.postService.createPost(newPost).subscribe(post => {
      post.comments = []; // initialize empty comment list
      this.posts.unshift(post);
      this.newPostContent = '';
    });
  }

  toggleLike(postId?: number): void {
    if (!postId) return;
    this.postService.toggleLike(postId).subscribe(updated => {
      const index = this.posts.findIndex(p => p.id === postId);
      if (index !== -1) this.posts[index] = updated;
    });
  }

  hasLiked(post: Post): boolean {
    return post.likedUsers?.some(u => u.id === this.currentUser.id) ?? false;
  }

  canDelete(post: Post): boolean {
    
    return this.currentUser.role === 'ADMIN' || this.currentUser.id === post.author?.id;
  }

  deletePost(postId?: number): void {
    if (!postId) return;
    this.postService.deletePost(postId).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== postId);
    });
  }

  addComment(postId?: number): void {
    const commentText = postId ? this.newComment[postId] : '';
    if (!postId || !commentText?.trim()) return;

    this.commentService.addComment(postId, commentText).subscribe(comment => {
      const post = this.posts.find(p => p.id === postId);
      if (post?.comments) {
        post.comments.push(comment);
      } else {
        post!.comments = [comment];
      }
      this.newComment[postId] = '';
    });
  }

  deleteComment(postId: number, commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        const post = this.posts.find(p => p.id === postId);
        if (post?.comments) {
          post.comments = post.comments.filter(c => c.id !== commentId);
        }
      },
      error: (err) => console.error('Error deleting comment:', err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  viewPostDetail(postId: number): void {
  this.router.navigate(['/posts', postId]);
}
}
