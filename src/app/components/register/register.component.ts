import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( public r: Router) { }


  ngOnInit(): void { }

  printUser(event) {
    this.r.navigateByUrl('')
  }

  printError(event) {
    console.error(event);
  }

}