import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {
    username: '',
    password: '',
    role: 'READER'
  };

  isLoading = false;
  errorMessage = '';
  showPassword = false; 

  constructor(private authService: AuthService, private router: Router) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.user).subscribe({
      next: (res) => {
        if (typeof res === 'string') {
          this.errorMessage = 'Unexpected response: ' + res;
          this.isLoading = false;
          return;
        }

        const userInfo = res as User;
        localStorage.setItem('username', userInfo.username); 
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Invalid username or password.';
        this.isLoading = false;
      }
    });
  }
}
