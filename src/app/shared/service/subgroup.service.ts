
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../service/auth.service';
import { Result, SubGroup, AppSettings } from '../model';

@Injectable()
export class SubgroupService {

    constructor(
        private authService: AuthService,
        private http: Http) {
    }

    getSubGroups(groupId: number, page: number, perPage: number, filter?: string): Observable<Result<SubGroup>> {

        const search = new URLSearchParams();
        search.set('PageNumber', page ? page.toString() : '0');
        search.set('PageSize', perPage ? perPage.toString() : '0');
        if (filter) { search.set('Filter', filter); }

        return this.http.get(`${AppSettings.SERVER}/Subgroups/${groupId}`, this.authService.requestOptions(search))
            .map((res: Response) => {
                return (<SubGroup[]>res.json());
            })
            .catch(this.handleError);
    }

    editSubGroup(subgroup: SubGroup): Observable<SubGroup> {
        return this.http.put(`${AppSettings.SERVER}/SubGroups/${subgroup.id}`, subgroup, this.authService.requestOptions(null))
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    addSubGroup(subgroup: SubGroup): Observable<SubGroup> {
        return this.http.post(`${AppSettings.SERVER}/SubGroups`, subgroup, this.authService.requestOptions(null))
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    deleteSubGroup(Id: number) {
        return this.http.delete(`${AppSettings.SERVER}/SubGroups/${Id}`, this.authService.requestOptions(null))
            .map((res: Response) => res.json())
            // .do(data => console.log('All Updated!'), (e) => this.statusHandler.requestError(e))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log('SubGroups Server', error.toString());
        return Observable.throw(error.json().error || 'SubGroups Server Error');
    }

}
