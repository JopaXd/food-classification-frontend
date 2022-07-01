import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { UserService } from '@app/services/user.service';
import { appInitializer } from './app.initializer';
import { ClassificationComponent } from './classification/classification.component';

import { AuthInterceptor } from '@app/helpers/auth_interceptor';
import { UnknownRouteComponent } from './unknown-route/unknown-route.component';
import { MealComponent } from './meal/meal.component';
import { LikedPostsComponent } from './liked-posts/liked-posts.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ClassificationComponent,
    UnknownRouteComponent,
    MealComponent,
    LikedPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [UserService] },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
