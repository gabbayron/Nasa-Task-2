import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoginService } from 'src/app/services/login.service';
import { NasaApiService } from 'src/app/services/nasa-api.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public nasaApi: NasaApiService, public af: AngularFirestore) { }

  userData

  ngOnInit(): void {
    this.userData = this.af.collection('users').snapshotChanges().subscribe(res => res.map((item: any) => {
      {
        const data: object = item.payload.doc.data()
        const id = item.payload.doc.id
        console.log(data)
      }

    }))

  }

}
