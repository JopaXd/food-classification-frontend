import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userSvc:UserService) { }

  toggle:boolean = false;
  user:User; 

  ngOnInit(): void {
    if (this.userSvc.userValue !== null){
      this.user = this.userSvc.userValue;
    }
  }

  logout(){
    this.userSvc.logout();
  }

  toggleNavbar(){
    this.toggle = !this.toggle
    if (this.toggle){
        let navLeft = document.getElementsByClassName("nav-items-left")[0] as HTMLElement
        navLeft.style.display="initial";
        let navRight = document.getElementsByClassName("nav-items-right")[0] as HTMLElement
        navRight.style.display="initial";
    }
    else{
        let navLeft = document.getElementsByClassName("nav-items-left")[0] as HTMLElement
        navLeft.style.display="none";
        let navRight = document.getElementsByClassName("nav-items-right")[0] as HTMLElement
        navRight.style.display="none";
    }
  }

}