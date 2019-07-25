import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../service/auth.service';
import { Result, Education, AppSettings } from '../model';

@Injectable()
export class EducationService {

    constructor(
        private authService: AuthService,
        private http: Http) {
    }

    getEducations(personId: number): Observable<Education[]> {
        console.log('getEducations', personId);

        const search = new URLSearchParams();
        search.set('personId', personId.toString());

        return this.http.get(`${AppSettings.SERVER}/Educations`, this.authService.requestOptions(search))
            .map((res: Response) => {
                return (<Education[]>res.json());
            })
            .catch(this.handleError);
    }

    editEducation(education: Education): Observable<Education> {
        return this.http.put(`${AppSettings.SERVER}/Educations/${education.id}`, education, this.authService.requestOptions(null))
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    addEducation(education: Education): Observable<Education> {
        return this.http.post(`${AppSettings.SERVER}/Educations`, education, this.authService.requestOptions(null))
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    deleteEducation(Id: number) {
        return this.http.delete(`${AppSettings.SERVER}/Educations/${Id}`, this.authService.requestOptions(null))
            .map((res: Response) => res.json())
            // .do(data => console.log('All Updated!'), (e) => this.statusHandler.requestError(e))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log('Educations Server', error.toString());
        return Observable.throw(error.json().error || 'Educations Server Error');
    }

}
