import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { ForgotPasswordData, ResetPasswordData, User } from '../../../interfaces/auth/auth';
import { ApiError, AuthResponse } from '../../../modules/auth/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassword {

  private readonly API_BASE_URL = 'https://your-api-url.com/api/auth';
    private readonly TOKEN_KEY = 'authToken';
    private readonly USER_KEY = 'userData';
  
 
    constructor(
      private http: HttpClient,
      private router: Router,
      private auth: Auth
    ) {}
  


  forgotPassword(data: ForgotPasswordData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/forgot-password`, data)
      .pipe(catchError(this.auth.handleHttpError));
  }

  resetPassword(data: ResetPasswordData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/reset-password`, data)
      .pipe(catchError(this.auth.handleHttpError));
  }
}
