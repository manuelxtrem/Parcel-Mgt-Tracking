import { Injectable } from '@angular/core';
import { Location } from '../model';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs/Observable';

declare var cordova: any;

@Injectable()
export class GPSService {
  gpsInterval = 5000;
  gpsObservable: Observable<Location>;
  watchID: any;
  location: Location;
  ready: boolean;
  reqTimes = 0;

  constructor(private alert: AlertService) {
    this.location = new Location();
    // this.ready = true; // TODO just a test - remove later
  }

  getLastCoordinates(): Location {
    return this.location; // TODO uncomment this too
    // TODO remove kraa
    // return {
    //     coords: {
    //         longitude: -1.6463036999999758,
    //         latitude: 6.6961869,
    //         accuracy: 23
    //     },
    //     timestamp: 0
    // };
  }

  initialize() {
    console.log('STUB!!!');
    // if(!this.gpsObservable) {
    //     this.gpsObservable = new Observable((observer) => {
    //         if (typeof cordova !== 'undefined') {
    //             this.watchID = cordova.plugins.locationServices.geolocation.watchPosition(
    //                 (position: Location) => {
    //                     this.location = position;
    //                     this.ready = true;
    //                     observer.next(position);
    //                     observer.complete();
    //                 },
    //                 (error) => {
    //                     this.ready = false;
    //                     observer.error('GPS failed: ' + error.message);

    //                     this.alert.alert({
    //                         message: error.message
    //                         // message: 'You need to allow permissions!'
    //                     });
    //                 });
    //         } else {
    //             observer.error('GPS engine not stated. Probably you are not on mobile');
    //         }
    //     });
    // }

    // return this.gpsObservable;
  }

  getPosition(refresh: boolean) {
    if (!this.gpsObservable || refresh) {
      this.gpsObservable = new Observable(observer => {
        if (typeof cordova !== 'undefined') {
          // if on android check permissions
          if (cordova.plugins.permissions) {
            const permissions = cordova.plugins.permissions;
            permissions.requestPermission(
              [
                permissions.ACCESS_FINE_LOCATION,
                permissions.ACCESS_COARSE_LOCATION
              ],
              status => {
                if (status && !status.hasPermission) {
                  console.warn('Location permission is not turned on');
                }
              },
              error => {
                console.warn('Location permission is not turned on');
              }
            );
          }

          this.watchID = setInterval(() => {
            cordova.plugins.locationServices.geolocation.getCurrentPosition(
              (position: Location) => {
                console.log('GPS Monitor', position);
                this.location = position;
                this.ready = true;
                observer.next(position);
                // observer.complete();
              },
              error => {
                console.log('GPS Monitor', error);
                this.ready = false;
                observer.error('GPS failed: ' + error.message);

                // this.alert.alert({
                // message: error.message
                // // message: 'You need to allow permissions!'
                // });
              }
            );
          }, this.gpsInterval);
        } else {
          observer.error(
            'GPS engine not stated. Probably you are not on mobile'
          );
        }
      });
    }

    return this.gpsObservable;
  }

  destroy() {
    // destroy the gps coords callnback
    // if (typeof cordova !== 'undefined') {
    // cordova.plugins.locationServices.geolocation.clearWatch(this.watchID);
    clearInterval(this.watchID);
    // }
  }

  isReady(): boolean {
    return this.ready;
  }
}
