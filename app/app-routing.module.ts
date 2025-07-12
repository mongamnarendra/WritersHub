import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';


import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { PostDetailComponent } from './components/posts/post-detail/post-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Main Dashboard for all roles
  { path: 'dashboard', component: DashboardComponent},

   { path: 'posts/:id', component: PostDetailComponent },

  // Fallback
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
