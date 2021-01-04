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
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    })
  }

  searchImage() {
    this.show = true
    this.nasaApi.getImages(
      moment(this.searchForm.value.start_date).format('YYYY-MM-DD'), moment(this.searchForm.value.end_date).format('YYYY-MM-DD')).
      subscribe(
        (res: []) => {
          this.nasaApi.apiData = res
          this.show = false
        },
        err => console.log(err)
      )
  }

}
