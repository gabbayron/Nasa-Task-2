import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NasaApiService } from 'src/app/services/nasa-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public nasaApi: NasaApiService, public db : FirestoreService) { }


  ngOnInit(): void {
    console.log(this.db.username)
  }

}
