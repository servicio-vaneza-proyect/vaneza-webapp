import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}


@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',

})
export class SignIn  {
  @Output() loginSubmit = new EventEmitter<LoginData>();
  @Output() switchToRegister = new EventEmitter<void>();
  @Output() googleLogin = new EventEmitter<void>();
  @Output() forgotPassword = new EventEmitter<string>();

  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loginData: LoginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        rememberMe: this.loginForm.value.rememberMe
      };
      this.loginSubmit.emit(loginData);
    } else {
      this.markFormGroupTouched();
    }
  }

  onGoogleLogin() {
    this.googleLogin.emit();
  }

  onForgotPassword() {
    if (this.email?.valid) {
      this.forgotPassword.emit(this.email.value);
    }
  }

  onSwitchToRegister() {
    this.switchToRegister.emit();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
}
