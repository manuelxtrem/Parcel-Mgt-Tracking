import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotyService } from '../../../../shared/service/noty.service';
import { AlertService } from '../../../../shared/service/alert.service';
import { RouteService } from '../../../../shared/service/route.service';
import { Route, Person, GPSLocation } from '../../../../shared/model';
import { PersonService } from '../../../../shared/service/person.service';
import { MapPickerService } from '../../../../shared/service/map-picker.service';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {
  typeAheadFilter: string;
  details: Route = new Route();
  editMode: boolean;
  loading: boolean;
  years: Date[];
  levels: string[];
  currentLocation: GPSLocation = new GPSLocation();

  constructor(
    public dialogRef: MatDialogRef<RouteDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private routeService: RouteService,
    private mapPicker: MapPickerService,
    private notyService: NotyService,
    private alertService: AlertService
  ) {
    this.details = data.route;
    this.editMode = data.editMode;
  }

  ngOnInit() {
    // this.dialogRef.disableClose = true;
    this.dialogRef.updateSize('350px');
    this.dialogRef.beforeClose().subscribe(() => {
      this.notyService.dismissAll();
    });

    // HTML5 location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.currentLocation.latitude = position.coords.latitude;
          this.currentLocation.longitude = position.coords.longitude;
        },
        () => {
          // no location
          console.log('We had no location');
        }
      );
    }
  }

  onSourceSelect() {
    this.mapPicker
      .open({
        latitude: this.editMode
          ? this.details.sourceLat
          : this.currentLocation.latitude,
        longitude: this.editMode
          ? this.details.sourceLong
          : this.currentLocation.longitude
      })
      .subscribe((result: GPSLocation) => {
        console.log('GPS result', result);
        if (result) {
          this.details.sourceLat = result.latitude;
          this.details.sourceLong = result.longitude;
        }
      });
  }

  onDestinationSelect() {
    this.mapPicker
      .open({
        latitude: this.editMode
          ? this.details.destinationLat
          : this.currentLocation.latitude,
        longitude: this.editMode
          ? this.details.destinationLong
          : this.currentLocation.longitude
      })
      .subscribe((result: GPSLocation) => {
        console.log('GPS result', result);
        if (result) {
          this.details.destinationLat = result.latitude;
          this.details.destinationLong = result.longitude;
        }
      });
  }

  onSave() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.notyService.dismissAll();
    let result;

    if (this.editMode) {
      // we're saving edited chages
      this.routeService.editRoute(this.details).subscribe(
        res => (result = res),
        error => {
          this.loading = false;
          this.alertService.confirm({
            title: 'An error occurred',
            message: 'Could not save changes. Do you want to retry?',
            confirmText: 'RETRY',
            confirmColor: 'warn',
            callback: ans => {
              if (ans) {
                this.onSave();
              }
            }
          });
        },
        () => {
          this.loading = false;
          this.notyService.alert('Changes have been saved successfully.');
          this.dialogRef.close(true);
        }
      );
    } else {
      // we're adding new details
      this.routeService.addRoute(this.details).subscribe(
        res => (result = res),
        error => {
          this.loading = false;
          this.alertService.confirm({
            title: 'An error occurred',
            message: 'Could not save changes. Do you want to retry?',
            confirmText: 'RETRY',
            confirmColor: 'warn',
            callback: ans => {
              if (ans) {
                this.onSave();
              }
            }
          });
        },
        () => {
          this.loading = false;
          this.notyService.alert('The entry has been saved successfully.');
          this.dialogRef.close(true);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
