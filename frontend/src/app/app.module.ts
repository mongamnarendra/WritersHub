import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Auth components
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';


// Shared
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

// Services & guards
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';

import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

import { CommentSectionComponent } from './components/dashboard/comment-section/comment-section.component';
import { PostDetailComponent } from './components/posts/post-detail/post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    CommentSectionComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
