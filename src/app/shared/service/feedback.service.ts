import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../service/auth.service';
import { Result, Feedback, AppSettings } from '../model';

@Injectable()
export class FeedbackService {

    ObserveFeedbacksResult: Observable<Result<Feedback>>;

    constructor(
        private authService: AuthService,
        private http: Http) {
    }

    getFeedbacks(personId: number, page: number, perPage: number, filter?: string): Observable<Result<Feedback>> {
        const search = new URLSearchParams();
        search.set('PersonId', personId ? personId.toString() : '0');
        search.set('PageNumber', page ? page.toString() : '0');
        search.set('PageSize', perPage ? perPage.toString() : '0');
        if (filter) { search.set('Filter', filter); }

        this.ObserveFeedbacksResult = this.http.get(`${AppSettings.SERVER}/Feedbacks`, this.authService.requestOptions(search))
            .map((res: Response) => {
                console.log('MAPPING');
                return (<Result<Feedback>>res.json());
            })
            .catch(this.handleError);

        return this.ObserveFeedbacksResult;
    }

    viewFeedback(FeedbackId: number): Observable<Feedback> {
        const search = new URLSearchParams();

        return this.http.get(`${AppSettings.SERVER}/Feedbacks/${FeedbackId}`, this.authService.requestOptions(search))
            // return this.http.get(`/assets/json/feedback1.json`)
            .map((res: Response) => {
                console.log('MAPPING');
                return (<Feedback>res.json());
            })
            .catch(this.handleError);
    }

    editFeedback(Feedback: Feedback): Observable<Feedback> {
        Feedback = JSON.parse(JSON.stringify(Feedback));
        Feedback.customer = null;

        return this.http.put(`${AppSettings.SERVER}/Feedbacks/${Feedback.id}`, Feedback, this.authService.requestOptions())
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    addFeedback(Feedback: Feedback): Observable<Feedback> {
        Feedback = JSON.parse(JSON.stringify(Feedback));
        Feedback.customer = null;

        return this.http.post(`${AppSettings.SERVER}/Feedbacks`, Feedback, this.authService.requestOptions())
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    deleteFeedback(Id: number) {
        return this.http.delete(`${AppSettings.SERVER}/Feedbacks/${Id}`, this.authService.requestOptions())
            .map((res: Response) => res.json())
            // .do(data => console.log('All Updated!'), (e) => this.statusHandler.requestError(e))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log('Feedbacks Server', error.toString());
        return Observable.throw(error.json().error || 'Feedbacks Server Error');
    }

}
