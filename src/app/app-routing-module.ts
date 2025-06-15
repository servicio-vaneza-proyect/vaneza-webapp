import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignIn } from './modules/auth/pages/sign-in/sign-in';
import { Auth } from './modules/auth/auth';
import { SignUp } from './modules/auth/pages/sign-up/sign-up';

const routes: Routes = [
 {
  path: 'atttt',
  redirectTo: 'auth/sign-in',
  pathMatch: 'full'
 }
, 
 {
  path: '',
  component : Auth
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
