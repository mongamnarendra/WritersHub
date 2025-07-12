import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

 
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

 
  getMyPosts(): Observable<Post[]> {
    const username = localStorage.getItem('username') || '';
    const headers = new HttpHeaders().set('X-Username', username);
    return this.http.get<Post[]>(`${this.apiUrl}/me`, { headers });
  }

  
  createPost(post: { content: string }): Observable<Post> {
    const username = localStorage.getItem('username');
    return this.http.post<Post>(this.apiUrl, {
      content: post.content,
      username: username
    });
  }

  
  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  }

  
  deletePost(postId: number): Observable<any> {
    const username = localStorage.getItem('username') || '';
    const headers = new HttpHeaders().set('X-Username', username);
    return this.http.delete(`${this.apiUrl}/${postId}`, { headers });
  }

 
  toggleLike(postId: number): Observable<Post> {
    const username = localStorage.getItem('username') || '';
    const headers = new HttpHeaders().set('X-Username', username);
    return this.http.post<Post>(`${this.apiUrl}/${postId}/like`, {}, { headers });
  }
}
