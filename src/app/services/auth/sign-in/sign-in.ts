import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LoginData } from '../../../interfaces/auth/auth';
import { ApiError, AuthResponse } from '../../../modules/auth/auth';
import { Auth } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class SignIn {


  private readonly API_BASE_URL = 'http://127.0.0.1:9001';

  
    
    constructor(
      private http: HttpClient,
      private router: Router,
      private auth: Auth,
    ) {}
  
    // Métodos de autenticación
    login(loginData: LoginData): Observable<AuthResponse> {
      const payload = {
        username: 12345678,
        password: 12345,
        rememberMe: loginData.rememberMe || false
      };
      
      console.log('Login payload:', payload);
      return this.http.post<AuthResponse>(`${this.API_BASE_URL}/login`, payload)
        .pipe( 
          tap(response => this.auth.handleAuthSuccess(response)),
          catchError(this.handleHttpError)
        );
    }

    // Autenticación con Google
  initiateGoogleAuth(): void {
    window.location.href = `${this.API_BASE_URL}/google`;
  }

  

// Manejo de errores HTTP
  private handleHttpError = (error: HttpErrorResponse): Observable<never> => {
    let apiError: ApiError = {
      error: 'Unknown Error',
      message: 'An unexpected error occurred',
      statusCode: error.status || 0
    };

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      apiError.message = error.error.message;
    } else {
      // Error del servidor
      apiError = {
        error: error.error?.error || 'Server Error',
        message: error.error?.message || `HTTP ${error.status}: ${error.statusText}`,
        statusCode: error.status
      };
    }

    return throwError(() => apiError);
  };

}
