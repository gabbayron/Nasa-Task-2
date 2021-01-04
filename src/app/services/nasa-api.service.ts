import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {

  constructor(private http: HttpClient) { }

  apiData = []

  getImages(start_date, end_date) {
    return this.http.get(`https://api.nasa.gov/planetary/apod?api_key=SXawfzxoI7QNVA2s7d4TOmyhFnudTOpghg4aYxnm&start_date=${start_date}&end_date=${end_date}`)
  }

}
