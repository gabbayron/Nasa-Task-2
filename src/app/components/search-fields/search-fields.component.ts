import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NasaApiService } from 'src/app/services/nasa-api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css']
})
export class SearchFieldsComponent implements OnInit {

  constructor(private fb: FormBuilder, public nasaApi: NasaApiService) { }
  show = false
  searchForm: FormGroup
  maxDate = new Date()
  recentSearches = []

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    })
  };

  addToRecentSearchArray(start_date, end_date) {
    this.recentSearches = [{ start_date, end_date }, ...this.recentSearches.slice(0, 4)]
    localStorage.recent_search = JSON.stringify(this.recentSearches)
  };

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
