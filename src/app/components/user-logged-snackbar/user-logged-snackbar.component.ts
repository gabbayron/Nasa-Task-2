import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-logged-snackbar',
  templateUrl: './user-logged-snackbar.component.html',
  styleUrls: ['./user-logged-snackbar.component.css']
})
export class UserLoggedSnackbarComponent implements OnInit {

  constructor(private r: Router, public loginService: LoginService ,private snackRef : MatSnackBarRef<UserLoggedSnackbarComponent>) { }

  ngOnInit(): void {
  }

  checkIfLogged() {
    this.loginService.userLogged ? this.r.navigateByUrl('') : null
    this.snackRef.dismiss()
  }

}
