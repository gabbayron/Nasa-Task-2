import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NasaApiService } from 'src/app/services/nasa-api.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public nasaApi: NasaApiService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

}
