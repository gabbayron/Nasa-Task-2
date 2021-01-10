import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor() { }
  officeLat = 32.064795;
  officeLng = 34.771842;
  mapCenterLat = 32.064795;
  mapCenterLng = 34.771842;
  markersArray = [
    {
      lat: this.officeLat,
      lng: this.officeLng,
    }
  ]
  origin = { lat: 32.08871782365754, lng: 34.78568987554956 }
  destination = { lat: 32.064795, lng: 34.771842 }
  travelMode = 'DRIVING'

}
