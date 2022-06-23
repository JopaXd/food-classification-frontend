import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '@app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private userSvc:UserService, private router: Router, private route: ActivatedRoute) { }

  returnUrl: string;

  loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });

  ngOnInit(): void {
    if (this.userSvc.userValue !== null){
      window.location.href = "/";
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoginSubmit(): void {
    this.userSvc.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      result => {
        // Handle result
        // this.router.navigate(['/']);
        window.location.href = this.returnUrl;
      },
      error => {
        console.log(error)
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }
}