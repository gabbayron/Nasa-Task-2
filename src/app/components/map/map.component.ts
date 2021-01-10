import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { MapsService } from 'src/app/services/maps.service';
import { styles } from './styles'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  constructor(public mapService: MapsService) { }

  mapStyles = styles
  origin: { lat: number, lng: number } = { lat: 0, lng: 0 }
  destination: { lat: number, lng: number } = { lat: 0, lng: 0 }

  ngOnInit(): void {
  }
  handleAddressChange(address) {
    if (!address.geometry) return
    const lat = address.geometry.location.lat()
    const lng = address.geometry.location.lng()
    this.mapService.markersArray = [...this.mapService.markersArray, { lat, lng }]
    this.mapService.mapCenterLat = lat
    this.mapService.mapCenterLng = lng
  }

  handleOriginDirectionChange(address) {
    if (!address.geometry) return
    this.origin.lat = address.geometry.location.lat()
    this.origin.lng = address.geometry.location.lng()
  }
  handleDestDirectionChange(address) {
    if (!address.geometry) return
    this.destination.lat = address.geometry.location.lat()
    this.destination.lng = address.geometry.location.lng()
  }
  searchDirection() {
    this.mapService.origin = this.origin
    this.mapService.destination = this.destination
    this.origin = { lat: 0, lng: 0 }
    this.destination = { lat: 0, lng: 0 }
  }
}
