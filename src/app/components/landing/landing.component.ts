import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoginService } from 'src/app/services/login.service';
import { NasaApiService } from 'src/app/services/nasa-api.service';
import { DailyImgDialogComponent } from '../daily-img-dialog/daily-img-dialog.component';
import { UserLoggedSnackbarComponent } from '../user-logged-snackbar/user-logged-snackbar.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public nasaApi: NasaApiService,
    private dialog: MatDialog, public r: Router,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    public db : FirestoreService
  ) { }
  dailyImage = []
  ngOnInit(): void {
    //  ------- Open user logged snackbar--------
    this._snackBar.openFromComponent(UserLoggedSnackbarComponent, {
      duration: 3000,
    });


    localStorage.user ? this.loginService.userLogged = true : null
    this.nasaApi.getImageOfToday().subscribe(
      (res: []) => {
        this.dailyImage = res
      },
      err => console.log(err)
    );
  }
  showImageOfTheDay() {
    this.dialog.open(DailyImgDialogComponent, {
      data: {
        image: this.dailyImage[0].url,
        title: this.dailyImage[0].title,
        type: this.dailyImage[0].media_type
      }
    })
  }
}
