import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logged-snackbar',
  templateUrl: './user-logged-snackbar.component.html',
  styleUrls: ['./user-logged-snackbar.component.css']
})
export class UserLoggedSnackbarComponent implements OnInit {

  constructor(private r: Router,private snackRef : MatSnackBarRef<UserLoggedSnackbarComponent>) { }

  ngOnInit(): void {
  }

  checkIfLogged() {
    this.snackRef.dismiss()
  }

}
