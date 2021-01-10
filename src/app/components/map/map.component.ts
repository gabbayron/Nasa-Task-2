import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { styles } from './styles'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  constructor() { }

  markersArray = [
    {
      lat: 32.064795,
      long: 34.771842,
    }
  ]
  styles = styles
  lat = 32.064795;
  long = 34.771842;
  officeLat = 32.064795;
  officeLong = 34.771842;
  ngOnInit(): void {
  }
  handleAddressChange(address) {
    if (!address.geometry) return
    this.lat = address.geometry.location.lat()
    this.long = address.geometry.location.lng()
    this.markersArray = [...this.markersArray, { lat: this.lat = address.geometry.location.lat(), long: address.geometry.location.lng() }]
  }
}
