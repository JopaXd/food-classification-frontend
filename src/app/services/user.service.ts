import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@app/models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {


  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private http:HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  getCurrentUser(){
    return this.http.get('http://localhost:8000/users/me', {observe: 'response', withCredentials:true})
    .pipe(map((req:any) => {
      if (req.status === 200){
        let loggedInUser = new User();
        loggedInUser.email = req.body.email
        this.userSubject.next(loggedInUser);
      }
      else{
        //Try to refresh the token.
        //The refresh token function will set the userSubject, so we don't have to do that here.
        this.refreshToken();
      }
      return req;
    }));
  }

  refreshToken(){
    return this.http.get('http://localhost:8000/refresh', {observe: 'response', withCredentials:true})
    .pipe(map((req:any) => {
      if (req.status === 200){
        let loggedInUser = new User();
        loggedInUser.email = req.body.email
        this.userSubject.next(loggedInUser);
      }
      else{
        this.userSubject.next(null);
      }
      return req;
    }));
  }

  createUser(email:string, password:string) {
    const headers = {'content-type': 'application/json'}  
    const body = {"email" : email, "password" : password}
    return this.http.post('http://localhost:8000/signup', body, {"headers": headers, observe: 'response'})
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  login(email:string, password:string){
    const headers = {'content-type': 'application/json'}  
    const body = {"email" : email, "password" : password}
    return this.http.post('http://localhost:8000/authenticate', body, {"headers": headers, observe: 'response', withCredentials:true})
    .pipe(map((req: any) => {
        if (req.status === 200){
          let loggedInUser = new User();
          loggedInUser.email = req.body.email;
          this.userSubject.next(loggedInUser);
          return req;
        }
    }));
  }

  logout(){
    this.http.get('http://localhost:8000/logout', {observe: 'response', withCredentials:true}).subscribe();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}