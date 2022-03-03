import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  toggle:boolean = false;

  ngOnInit(): void {
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