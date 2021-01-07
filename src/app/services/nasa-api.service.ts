import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {

  constructor(private http: HttpClient) { }
  todayDate = new Date();
  apiData = [];
  selectedSearchHistory

  getImages(start_date, end_date) {
    return this.http.get(`${environment.BASE_URL}&start_date=${start_date}&end_date=${end_date}`)
  };

  getImageOfToday() {
    return this.http.get(`${environment.BASE_URL}&start_date=${moment(this.todayDate).format('YYYY-MM-DD')}&end_date=${moment(this.todayDate).format('YYYY-MM-DD')}`)
  };

}
