import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../auth';
import { RegisterData } from '../../../interfaces/auth/auth';
import { catchError, Observable, tap } from 'rxjs';
import { AuthResponse } from '../../../modules/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class SignOut {

   private readonly API_BASE_URL = 'https://your-api-url.com/api/auth';
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'userData';



  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: Auth
  ) {}


  register(registerData: RegisterData): Observable<AuthResponse> {
    const payload = {
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
      acceptTerms: registerData.acceptTerms
    };

    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/register`, payload)
      .pipe(
        tap(response => this.auth.handleAuthSuccess(response)),
        catchError(this.auth.handleHttpError)
      );
  }
}
