import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NasaApiService } from 'src/app/services/nasa-api.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { SearchHistoryDialogComponent } from '../search-history-dialog/search-history-dialog.component';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css']
})
export class SearchFieldsComponent implements OnInit {

  constructor(private fb: FormBuilder, public nasaApi: NasaApiService, private dialog: MatDialog, public db: FirestoreService) { }
  show = false
  searchForm: FormGroup
  maxDate = new Date()

  ngOnInit(): void {
    this.db.getSearchHistory()
    this.searchForm = this.fb.group({
      start_date: [this.nasaApi.selectedSearchHistory ? this.nasaApi.selectedSearchHistory.start_date : '', Validators.required],
      end_date: [this.nasaApi.selectedSearchHistory ? this.nasaApi.selectedSearchHistory.end_date : '', Validators.required]
    })
  };

  //  ---------- Search History ------------

  addToRecentSearchArray(start_date, end_date) {
    this.db.userSearchHistory = [{ start_date, end_date }, ...this.db.userSearchHistory.slice(0, 4)]
    this.db.addSearchHistory()
  };

  openSearchHistoryDialog() {
    this.dialog.open(SearchHistoryDialogComponent, {
      data: {
        searchHistory: this.db.userSearchHistory
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
