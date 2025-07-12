import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

 
  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/post/${postId}`);
  }

  
  addComment(postId: number, text: string): Observable<Comment> {
    const username = localStorage.getItem('username');
    if (!username) throw new Error('User not logged in');

    return this.http.post<Comment>(`${this.apiUrl}/post/${postId}`, {
      text,
      username,
      createdAt: new Date()
    });
  }

  
  deleteComment(commentId: number): Observable<any> {
    const username = localStorage.getItem('username');
    if (!username) throw new Error('User not logged in');

    return this.http.request('delete', `${this.apiUrl}/${commentId}`, {
      body: { username }
    });
  }
}
