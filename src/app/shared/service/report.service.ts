import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../service/auth.service';
import {
  Result,
  AppSettings,
  SummaryReport,
  Parcel,
  ParcelStatus
} from '../model';

@Injectable()
export class ReportService {
  ObserveSummaryResult: Observable<SummaryReport>;
  ObserveParcelsResult: Observable<Result<Parcel>>;

  constructor(private authService: AuthService, private http: Http) {}

  getSummaryReport(): Observable<SummaryReport> {
    this.ObserveSummaryResult = this.http
      .get(
        `${AppSettings.SERVER}/Reports/Summary`,
        this.authService.requestOptions()
      )
      .map((res: Response) => {
        console.log('MAPPING');
        return <SummaryReport>res.json();
      })
      .catch(this.handleError);

    return this.ObserveSummaryResult;
  }

  getParcelsReport(
    driverId: number,
    page: number,
    perPage: number,
    parcelType?: string,
    dateFrom?: Date,
    dateTo?: Date
  ): Observable<Result<Parcel>> {
    const search = new URLSearchParams();
    search.set('ParcelType', parcelType);
    search.set('DriverId', driverId ? driverId.toString() : '0');
    search.set('PageNumber', page ? page.toString() : '0');
    search.set('PageSize', perPage ? perPage.toString() : '0');
    if (dateFrom) {
      search.set('dateFrom', dateFrom.toString());
    }
    if (dateTo) {
      search.set('dateTo', dateTo.toString());
    }

    this.ObserveParcelsResult = this.http
      .get(
        `${AppSettings.SERVER}/Parcels/Report`,
        this.authService.requestOptions(search)
      )
      .map((res: Response) => {
        console.log('MAPPING');
        return <Result<Parcel>>res.json();
      })
      .catch(this.handleError);

    return this.ObserveParcelsResult;
  }

  private handleError(error: Response) {
    console.log('Parcels Server', error.toString());
    return Observable.throw(error.json().error || 'Parcels Server Error');
  }
}
