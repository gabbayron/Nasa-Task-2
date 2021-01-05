import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NasaApiService } from 'src/app/services/nasa-api.service';
import { DailyImgDialogComponent } from '../daily-img-dialog/daily-img-dialog.component';

export interface dialogData {
  searchHistory: []
}

@Component({
  selector: 'app-search-history-dialog',
  templateUrl: './search-history-dialog.component.html',
  styleUrls: ['./search-history-dialog.component.css']
})
export class SearchHistoryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DailyImgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData,
    public nasaApiService: NasaApiService) { }

  ngOnInit(): void {
    console.log(this.data.searchHistory)
  }

  selectHistory(start_date, end_date) {
    this.nasaApiService.selectedSearchHistory = { start_date, end_date }
  }

}
