import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../service/auth.service';
import { Result, Damage, AppSettings } from '../model';

@Injectable()
export class DamageService {

    ObserveDamagesResult: Observable<Result<Damage>>;

    constructor(
        private authService: AuthService,
        private http: Http) {
    }

    getDamages(personId: number, page: number, perPage: number, filter?: string): Observable<Result<Damage>> {
        const search = new URLSearchParams();
        search.set('PersonId', personId ? personId.toString() : '0');
        search.set('PageNumber', page ? page.toString() : '0');
        search.set('PageSize', perPage ? perPage.toString() : '0');
        if (filter) { search.set('Filter', filter); }

        this.ObserveDamagesResult = this.http.get(`${AppSettings.SERVER}/Damages`, this.authService.requestOptions(search))
            .map((res: Response) => {
                console.log('MAPPING');
                return (<Result<Damage>>res.json());
            })
            .catch(this.handleError);

        return this.ObserveDamagesResult;
    }

    viewDamage(DamageId: number): Observable<Damage> {
        const search = new URLSearchParams();

        return this.http.get(`${AppSettings.SERVER}/Damages/${DamageId}`, this.authService.requestOptions(search))
            // return this.http.get(`/assets/json/feedback1.json`)
            .map((res: Response) => {
                console.log('MAPPING');
                return (<Damage>res.json());
            })
            .catch(this.handleError);
    }

    editDamage(Damage: Damage): Observable<Damage> {
        Damage = JSON.parse(JSON.stringify(Damage));
        Damage.customer = null;

        return this.http.put(`${AppSettings.SERVER}/Damages/${Damage.id}`, Damage, this.authService.requestOptions())
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    addDamage(Damage: Damage): Observable<Damage> {
        Damage = JSON.parse(JSON.stringify(Damage));
        Damage.customer = null;
        Damage.parcel = null;

        return this.http.post(`${AppSettings.SERVER}/Damages`, Damage, this.authService.requestOptions())
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    deleteDamage(Id: number) {
        return this.http.delete(`${AppSettings.SERVER}/Damages/${Id}`, this.authService.requestOptions())
            .map((res: Response) => res.json())
            // .do(data => console.log('All Updated!'), (e) => this.statusHandler.requestError(e))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log('Damages Server', error.toString());
        return Observable.throw(error.json().error || 'Damages Server Error');
    }

}
