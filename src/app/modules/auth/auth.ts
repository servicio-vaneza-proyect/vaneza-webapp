import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginData } from './pages/sign-in/sign-in';
import { RegisterData } from './pages/sign-up/sign-up';
import { catchError, Observable, Subject, takeUntil, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SignIn } from '../../services/auth/sign-in/sign-in';
import { SignOut } from '../../services/auth/sign-out/sign-out';

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {

    currentView: 'login' | 'register' | 'forgot-password' = 'login';
  isLoading = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private SignIn: SignIn,
    private signout : SignOut,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Navegación entre vistas
  switchToLogin(): void {
    this.currentView = 'login';
  }

  switchToRegister(): void {
    this.currentView = 'register';
  }

  switchToForgotPassword(): void {
    this.currentView = 'forgot-password';
  }

  // Manejo de formularios
  onLoginSubmit(loginData: LoginData): void {
    this.isLoading = true;
    
    this.SignIn.login(loginData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          
        },
        error: (error: ApiError) => {
          this.isLoading = false;
        }
      });
  }

  onRegisterSubmit(registerData: RegisterData): void {
    this.isLoading = true;
    
    this.signout.register(registerData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          
        },
        error: (error: ApiError) => {
          this.isLoading = false;

        }
      });
  }

}
