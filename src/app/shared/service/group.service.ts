
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../service/auth.service';
import { Result, Group, AppSettings } from '../model';

@Injectable()
export class GroupService {

    constructor(
        private authService: AuthService,
        private http: Http) {
    }

    getGroups(page: number, perPage: number, filter?: string): Observable<Result<Group>> {

        const search = new URLSearchParams();
        search.set('PageNumber', page ? page.toString() : '0');
        search.set('PageSize', perPage ? perPage.toString() : '0');
        if (filter) { search.set('Filter', filter); }

        return this.http.get(`${AppSettings.SERVER}/Groups`, this.authService.requestOptions(search))
            .map((res: Response) => {
                return (<Group[]>res.json());
            })
            .catch(this.handleError);
    }

    getSubGroups(groupId: number, page: number, perPage: number, filter?: string): Observable<Result<Group>> {

        const search = new URLSearchParams();
        search.set('PageNumber', page ? page.toString() : '0');
        search.set('PageSize', perPage ? perPage.toString() : '0');
        if (filter) { search.set('Filter', filter); }

        return this.http.get(`${AppSettings.SERVER}/Subgroups/${groupId}`, this.authService.requestOptions(search))
            .map((res: Response) => {
                return (<Group[]>res.json());
            })
            .catch(this.handleError);
    }

    editGroup(education: Group): Observable<Group> {
        return this.http.put(`${AppSettings.SERVER}/Groups/${education.id}`, education, this.authService.requestOptions(null))
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    addGroup(education: Group): Observable<Group> {
        return this.http.post(`${AppSettings.SERVER}/Groups`, education, this.authService.requestOptions(null))
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    deleteGroup(Id: number) {
        return this.http.delete(`${AppSettings.SERVER}/Groups/${Id}`, this.authService.requestOptions(null))
            .map((res: Response) => res.json())
            // .do(data => console.log('All Updated!'), (e) => this.statusHandler.requestError(e))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log('Groups Server', error.toString());
        return Observable.throw(error.json().error || 'Groups Server Error');
    }

}
