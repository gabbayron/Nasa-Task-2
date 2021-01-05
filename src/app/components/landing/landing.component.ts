import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NasaApiService } from 'src/app/services/nasa-api.service';
import { DailyImgDialogComponent } from '../daily-img-dialog/daily-img-dialog.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public nasaApi: NasaApiService, private dialog: MatDialog, public r: Router) { }
  dailyImage = []
  ngOnInit(): void {
    this.nasaApi.getImageOfToday().subscribe(
      (res: []) => {
        this.dailyImage = res
        console.log(this.dailyImage)
      },
      err => console.log(err)
    )
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
