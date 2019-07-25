import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../service/auth.service';
import { Result, Route, AppSettings, TypeAhead } from '../model';

@Injectable()
export class RouteService {

    ObserveRoutesResult: Observable<Result<Route>>;

    constructor(
        private authService: AuthService,
        private http: Http) {
    }

    getRoutes(page: number, perPage: number, filter?: string): Observable<Result<Route>> {
        const search = new URLSearchParams();
        search.set('PageNumber', page ? page.toString() : '0');
        search.set('PageSize', perPage ? perPage.toString() : '0');
        if (filter) { search.set('Filter', filter); }

        this.ObserveRoutesResult = this.http.get(`${AppSettings.SERVER}/Routes`, this.authService.requestOptions(search))
            .map((res: Response) => {
                console.log('MAPPING');
                return (<Result<Route>>res.json());
            })
            .catch(this.handleError);

        return this.ObserveRoutesResult;
    }

    getTypeAhead(filter: string): Observable<TypeAhead[]> {
        const search = new URLSearchParams();
        if (filter) { search.set('Filter', filter); }

        return this.http.get(`${AppSettings.SERVER}/Routes/Typeahead`, this.authService.requestOptions(search))
            .map((res: Response) => {
                return (<Result<TypeAhead[]>> res.json());
            })
            .catch(this.handleError);
    }

    viewRoute(RouteId: number): Observable<Route> {
        return this.http.get(`${AppSettings.SERVER}/Routes/${RouteId}`, this.authService.requestOptions())
        .map((res: Response) => {
                console.log('MAPPING');
                return (<Route>res.json());
            })
            .catch(this.handleError);
    }

    editRoute(Route: Route): Observable<Route> {
        return this.http.put(`${AppSettings.SERVER}/Routes/${Route.id}`, Route, this.authService.requestOptions())
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    addRoute(Route: Route): Observable<Route> {
        return this.http.post(`${AppSettings.SERVER}/Routes`, Route, this.authService.requestOptions())
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    deleteRoute(Id: number) {
        return this.http.delete(`${AppSettings.SERVER}/Routes/${Id}`, this.authService.requestOptions())
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log('Routes Server', error.toString());
        return Observable.throw(error.json().error || 'Routes Server Error');
    }

}
