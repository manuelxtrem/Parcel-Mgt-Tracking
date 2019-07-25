import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GPSLocation } from '../../model/index';

@Component({
  selector: 'app-map-picker',
  templateUrl: './map-picker.component.html',
  styleUrls: ['./map-picker.component.css']
})
export class MapPickerComponent implements OnInit {
  marker = [];
  longitude = 0;
  latitude = 0;
  zoom = 15;

  constructor(
    public dialogRef: MatDialogRef<MapPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GPSLocation
  ) {
    this.longitude = data && data.longitude ? data.longitude : 0;
    this.latitude = data && data.latitude ? data.latitude : 0;
  }

  ngOnInit() {
    // this.dialogRef.disableClose = true;
    this.dialogRef.updateSize('420px');
  }

  addMarker(event: LocationChangeEvent) {
    console.log('addMarker', event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  locationChange(event: LocationChangeEvent) {
    console.log('locationChange', event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  onSave() {
    this.dialogRef.close({
      latitude: this.latitude,
      longitude: this.longitude
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}

export class LocationChangeCoords {
  lat: number;
  lng: number;
}

export class LocationChangeEvent {
  coords: LocationChangeCoords;
}
