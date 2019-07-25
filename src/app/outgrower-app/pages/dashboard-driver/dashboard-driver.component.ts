import { Component, OnInit } from '@angular/core';
import { GPSService } from '../../../shared/service/gps.service';
import { Marker, Location, XResponse } from '../../../shared/model';
import { AlertService } from '../../../shared/service/alert.service';
import { LocationService } from '../../../shared/service/location.service';
import { LoginService } from '../../../shared/service/login.service';
import { MatDialog } from '@angular/material';
import { TransportNoticeComponent } from './transport-notice/transport-notice.component';
import { NotifyService } from '../../../shared/service/notify.service';
import { NotyService } from '../../../shared/service/noty.service';

@Component({
  selector: 'app-dashboard-driver',
  templateUrl: './dashboard-driver.component.html',
  styleUrls: ['./dashboard-driver.component.css']
})
export class DashboardDriverComponent implements OnInit {
  ETA: number;
  // gpsStatus: boolean;
  trackingStatus = false;
  latitude: number;
  longitude: number;
  markers: Marker[];

  constructor(
    private loginService: LoginService,
    public gpsService: GPSService,
    private locationService: LocationService,
    private alert: AlertService,
    private notyService: NotyService,
    public dialog: MatDialog
  ) {
    this.longitude = this.gpsService.getLastCoordinates().coords.longitude;
    this.latitude = this.gpsService.getLastCoordinates().coords.latitude;
    this.markers = [
      {
        label: 'A',
        latitude: this.latitude,
        longitude: this.longitude
      }
    ];
  }

  ngOnInit() {
    // this.gpsStatus = this.gpsService.isReady();
    this.getLocation(false);
  }

  startTracking() {
    if (this.gpsService.isReady()) {
      this.alert.confirm({
        title: 'Are you sure?',
        message:
          'Do you want to begin tracking of your vehicle? Remember that the customers will be notified of this action.',
        callback: result => {
          if (result) {
            this.locationService
              .beginTracking(this.loginService.getUserProfile().id)
              .subscribe(
                () => {},
                error => {
                  this.alert.alert({
                    title: 'An error occurred',
                    message: 'Something unusual happened. Please try again.'
                  });
                },
                () => {
                  console.log('logging this');
                  this.trackingStatus = true;
                  const dialogRef = this.dialog.open(TransportNoticeComponent);
                  dialogRef.afterClosed().subscribe(destinationReached => {
                    this.trackingStatus = false;
                    if (destinationReached) {
                      // we have reached
                      this.locationService
                        .confirmArrival(this.loginService.getUserProfile().id)
                        .subscribe(
                          () => {},
                          error => {
                            this.notyService.alert(
                              'Something unusual happened. Please try again.'
                            );
                          },
                          () => {
                            console.log('confirmArrival complete');
                            this.notyService.alert(
                              'Customers of parcels will be notified.'
                            );
                          }
                        );
                    }
                  });
                }
              );
          }
        }
      });
    } else {
      this.alert.alert({
        message:
          'Please make sure you are logged in using your mobile device and your Location Settings is set to ON.'
      });
    }
  }

  getLocation(refresh: boolean) {
    this.gpsService.getPosition(refresh).subscribe(
      location => {
        this.onLocation(location);
      },
      error => {
        // this.gpsStatus = false;
        this.alert.alert({
          message:
            'Please make sure you are logged in using your mobile device and your Location Settings is set to ON.'
        });
      }
    );
  }

  onLocation(location: Location) {
    this.longitude = location.coords.longitude;
    this.latitude = location.coords.latitude;
    this.markers = [];
    this.markers.push({
      label: '',
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });

    // when you're tracking
    if (this.trackingStatus) {
      console.log('coords from gps', location.coords);
      // this.gpsStatus = true;

      this.locationService
        .putLocation(this.loginService.getUserProfile().id, location.coords)
        .subscribe((result: XResponse<number>) => {
          this.ETA = result.data;
        });
    } else {
      console.log('skipping gps coords', location.coords);
    }
  }
}
