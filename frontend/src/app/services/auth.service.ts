import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  
  register(user: User): Observable<string> {
    return this.http.post<string>(`${this.authUrl}/register`, user, {
      responseType: 'text' as 'json'
    });
  }

  
  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/login`, user).pipe(
      tap((res: User) => {
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role);
      })
    );
  }

  
  getCurrentUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  
  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

 
  setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.role);
  }

  
  clearUser(): void {
    localStorage.removeItem('user');
  }
}
