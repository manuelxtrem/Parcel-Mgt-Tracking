import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../service/auth.service';
import { Result, AppSettings, Coords, XResponse } from '../model';

@Injectable()
export class LocationService {
  constructor(private authService: AuthService, private http: Http) {}

  putLocation(driverId: number, coords: Coords): Observable<XResponse<number>> {
    console.log('coords to server', coords);
    return this.http
      .put(
        `${AppSettings.SERVER}/Location/${driverId}`,
        coords,
        this.authService.requestOptions()
      )
      .map((res: Response) => <XResponse<number>> res.json())
      .catch(this.handleError);
  }

  beginTracking(driverId: number): Observable<any> {
    console.log('start tracking');
    return this.http
      .put(
        `${AppSettings.SERVER}/Location/StartTracking/${driverId}`,
        null,
        this.authService.requestOptions()
      )
      .map((res: Response) => res.toString())
      .catch(this.handleError);
  }

  confirmArrival(driverId: number): Observable<any> {
    console.log('stop tracking');
    return this.http
      .put(
        `${AppSettings.SERVER}/Location/StopTracking/${driverId}`,
        null,
        this.authService.requestOptions()
      )
      .map((res: Response) => res.toString())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log('Location Server', error.toString());
    return Observable.throw(error.json().error || 'Location Server Error');
  }
}
