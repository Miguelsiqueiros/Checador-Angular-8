import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckInComponent } from './components/check-in/check-in.component';
import { CreatePTOComponent } from './components/CreatePTO/CreatePTO.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginProfileComponent } from './components/login-profile/login-profile.component';


const routes: Routes = [
  { path: 'check-in', component: CheckInComponent },
  { path: 'profile', component: LoginProfileComponent },
  { path: 'PTO', component: CreatePTOComponent },
  { path: 'register', component: RegisterComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'check-in'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }