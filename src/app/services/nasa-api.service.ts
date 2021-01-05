import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {

  constructor(private http: HttpClient) { }
  todayDate = new Date();
  apiData = [];
  BASE_URL = "https://api.nasa.gov/planetary/apod?api_key=SXawfzxoI7QNVA2s7d4TOmyhFnudTOpghg4aYxnm";
  selectedSearchHistory

  getImages(start_date, end_date) {
    return this.http.get(`${this.BASE_URL}&start_date=${start_date}&end_date=${end_date}`)
  };

  getImageOfToday() {
    return this.http.get(`${this.BASE_URL}&start_date=${moment(this.todayDate).format('YYYY-MM-DD')}&end_date=${moment(this.todayDate).format('YYYY-MM-DD')}`)
  };

}
