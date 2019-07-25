import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../service/auth.service';
import { Result, Parcel, AppSettings, ParcelStatus } from '../model';

@Injectable()
export class ParcelService {

    ObserveParcelsResult: Observable<Result<Parcel>>;

    constructor(
        private authService: AuthService,
        private http: Http) {
    }

    getParcels(personId: number, page: number, perPage: number, filter?: string): Observable<Result<Parcel>> {
        const search = new URLSearchParams();
        search.set('ParcelType', ParcelStatus.ALL);
        search.set('PersonId', personId ? personId.toString() : '0');
        search.set('PageNumber', page ? page.toString() : '0');
        search.set('PageSize', perPage ? perPage.toString() : '0');
        if (filter) { search.set('Filter', filter); }

        this.ObserveParcelsResult = this.http.get(`${AppSettings.SERVER}/Parcels`, this.authService.requestOptions(search))
            .map((res: Response) => {
                console.log('MAPPING');
                return (<Result<Parcel>>res.json());
            })
            .catch(this.handleError);

        return this.ObserveParcelsResult;
    }

    getDriverParcels(driverId: number, page: number, perPage: number, filter?: string): Observable<Result<Parcel>> {
        const search = new URLSearchParams();
        search.set('ParcelType', ParcelStatus.ALL);
        search.set('DriverId', driverId ? driverId.toString() : '0');
        search.set('PageNumber', page ? page.toString() : '0');
        search.set('PageSize', perPage ? perPage.toString() : '0');
        if (filter) { search.set('Filter', filter); }

        this.ObserveParcelsResult = this.http.get(`${AppSettings.SERVER}/Parcels`, this.authService.requestOptions(search))
            .map((res: Response) => {
                console.log('MAPPING');
                return (<Result<Parcel>>res.json());
            })
            .catch(this.handleError);

        return this.ObserveParcelsResult;
    }

    getStatusParcels(status: string, page: number, perPage: number, filter?: string): Observable<Result<Parcel>> {
        const search = new URLSearchParams();
        search.set('ParcelType', status ? status.toString() : '0');
        search.set('PageNumber', page ? page.toString() : '0');
        search.set('PageSize', perPage ? perPage.toString() : '0');
        if (filter) { search.set('Filter', filter); }

        // TODO as admin - add respective admin checking heaers

        this.ObserveParcelsResult = this.http.get(`${AppSettings.SERVER}/Parcels`, this.authService.requestOptions(search))
            .map((res: Response) => {
                console.log('MAPPING');
                return (<Result<Parcel>>res.json());
            })
            .catch(this.handleError);

        return this.ObserveParcelsResult;
    }

    viewParcel(ParcelId: number): Observable<Parcel> {
        return this.http.get(`${AppSettings.SERVER}/Parcels/${ParcelId}`, this.authService.requestOptions())
        .map((res: Response) => {
                console.log('MAPPING');
                return (<Parcel>res.json());
            })
            .catch(this.handleError);
    }

    editParcel(Parcel: Parcel): Observable<Parcel> {
        // remove unneeded fields
        Parcel = JSON.parse(JSON.stringify(Parcel));
        Parcel.sender = Parcel.recipient = Parcel.route = Parcel.driver = null;

        return this.http.put(`${AppSettings.SERVER}/Parcels/${Parcel.id}`, Parcel, this.authService.requestOptions())
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    editParcelDelivered(personId: number): Observable<any> {
        return this.http.put(`${AppSettings.SERVER}/Parcels/${personId}/Delivered`, { status: true }, this.authService.requestOptions())
            .map((res: Response) => res.text())
            .catch(this.handleError);
    }

    addParcel(Parcel: Parcel): Observable<Parcel> {
        // remove unneeded fields
        Parcel = JSON.parse(JSON.stringify(Parcel));
        Parcel.sender = Parcel.recipient = Parcel.route = Parcel.driver = null;

        return this.http.post(`${AppSettings.SERVER}/Parcels`, Parcel, this.authService.requestOptions())
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    deleteParcel(Id: number) {
        return this.http.delete(`${AppSettings.SERVER}/Parcels/${Id}`, this.authService.requestOptions())
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log('Parcels Server', error.toString());
        return Observable.throw(error.json().error || 'Parcels Server Error');
    }

}
