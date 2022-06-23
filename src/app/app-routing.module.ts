import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ClassificationComponent } from './classification/classification.component';
import { UnknownRouteComponent } from './unknown-route/unknown-route.component';
import { AuthGuard } from '@app/helpers/auth_guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'classification', component: ClassificationComponent, canActivate: [AuthGuard]},
  { path: '**', component:UnknownRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
