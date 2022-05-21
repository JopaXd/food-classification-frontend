import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private userSvc:UserService) { }

  signupForm = this.formBuilder.group({
      email: '',
      password: ''
    });

  ngOnInit(): void {

  }

  onSignupSubmit(): void {
    this.userSvc.createUser(this.signupForm.value.email, this.signupForm.value.password).subscribe(
      result => {
        // Handle result
        console.log(result.status)
        window.location.href = "/login"
      },
      error => {
        console.log(error.status)
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }
}