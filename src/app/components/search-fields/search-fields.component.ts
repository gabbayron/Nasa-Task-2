import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NasaApiService } from 'src/app/services/nasa-api.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { SearchHistoryDialogComponent } from '../search-history-dialog/search-history-dialog.component';

@Component({
  selector: 'app-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css']
})
export class SearchFieldsComponent implements OnInit {

  constructor(private fb: FormBuilder, public nasaApi: NasaApiService, private dialog: MatDialog) { }
  show = false
  searchForm: FormGroup
  maxDate = new Date()
  searchHistory = []

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      start_date: [this.nasaApi.selectedSearchHistory ? this.nasaApi.selectedSearchHistory.start_date : '', Validators.required],
      end_date: [this.nasaApi.selectedSearchHistory ? this.nasaApi.selectedSearchHistory.end_date : '', Validators.required]
    })
    this.searchHistory = localStorage.recent_search ? JSON.parse(localStorage.recent_search) : []
  };

  //  ---------- Search History ------------

  addToRecentSearchArray(start_date, end_date) {
    this.searchHistory = [{ start_date, end_date }, ...this.searchHistory.slice(0, 4)]
    localStorage.recent_search = JSON.stringify(this.searchHistory)
  };

  openSearchHistoryDialog() {
    this.dialog.open(SearchHistoryDialogComponent, {
      data: {
        searchHistory: this.searchHistory
      }
    })
  }

  //  ---------- Search Image ------------


  searchImage() {
    this.show = true
    const start_date_format = moment(this.searchForm.value.start_date).format('YYYY-MM-DD');
    const end_date_format = moment(this.searchForm.value.end_date).format('YYYY-MM-DD');
    this.addToRecentSearchArray(start_date_format, end_date_format);
    this.nasaApi.getImages(start_date_format, end_date_format).subscribe(
      (res: []) => {
        this.nasaApi.apiData = res
        this.show = false
      },
      err => console.log(err)
    );
  };

}
