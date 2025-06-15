import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SignIn } from './modules/auth/pages/sign-in/sign-in';
import { SignUp } from './modules/auth/pages/sign-up/sign-up';
import { CommonModule } from '@angular/common';
import { Auth } from './modules/auth/auth';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    SignIn,
    SignUp,
    Auth,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule
    
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
