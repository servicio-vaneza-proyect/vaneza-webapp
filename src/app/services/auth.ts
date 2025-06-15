import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../interfaces/auth/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiError, AuthResponse } from '../modules/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly API_BASE_URL = 'http://127.0.0.1:9001';
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'userData';

  // BehaviorSubject para mantener el estado de autenticación
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}



  // Manejo de tokens y sesión
  handleAuthSuccess(response: AuthResponse): void {
    console.log('Auth response:', response);
    if (response.success && response.token) {
      this.setToken(response.token);
      
      if (response.user) {
        this.setUser(response.user);
        this.currentUserSubject.next(response.user);
      }
      
      this.isAuthenticatedSubject.next(true);
    }
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private getCurrentUserFromStorage(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Aquí podrías agregar validación de expiración del token
    return true;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    
    this.router.navigate(['/auth/login']);
  }

  // Verificar token en el servidor
  verifyToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.API_BASE_URL}/verify`)
      .pipe(
        tap(response => {
          if (!response.success) {
            this.logout();
          }
        }),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  // Manejo de errores HTTP
  handleHttpError = (error: HttpErrorResponse): Observable<never> => {
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
