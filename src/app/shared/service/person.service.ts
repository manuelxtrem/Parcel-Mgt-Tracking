import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../service/auth.service';
import { Result, Person, AppSettings, TypeAhead, XResponse } from '../model';

@Injectable()
export class PersonService {
  public static get PERSON_DRIVER(): string {
    return 'driver';
  }
  public static get PERSON_CUSTOMER(): string {
    return 'customer';
  }
  public static get PERSON_ADMINISTRATOR(): string {
    return 'administrator';
  }

  public static get PERSON_SPOUSE(): string {
    return 'Spouse';
  }
  public static get PERSON_CHILD(): string {
    return 'Child';
  }
  public static get PERSON_TECHNICAL_OFFICER(): string {
    return 'Technical Officer';
  }

  ObservePersonsResult: Observable<Result<Person>>;

  constructor(private authService: AuthService, private http: Http) {}

  getPersons(
    personType: string,
    page: number,
    perPage: number,
    filter?: string
  ): Observable<Result<Person>> {
    const search = new URLSearchParams();
    search.set('personType', personType);
    search.set('PageNumber', page ? page.toString() : '0');
    search.set('PageSize', perPage ? perPage.toString() : '0');
    if (filter) {
      search.set('Filter', filter);
    }

    this.ObservePersonsResult = this.http
      .get(
        `${AppSettings.SERVER}/People`,
        this.authService.requestOptions(search)
      )
      // this.ObservePersonsResult = this.http.get(`/assets/json/${personType}s.json`)
      .map((res: Response) => {
        return <Result<Person>>res.json();
      })
      .catch(this.handleError);

    return this.ObservePersonsResult;
  }

  getTypeAhead(personType: string, filter: string): Observable<TypeAhead[]> {
    const search = new URLSearchParams();
    search.set('personType', personType);
    if (filter) {
      search.set('Filter', filter);
    }

    return this.http
      .get(
        `${AppSettings.SERVER}/People/Typeahead`,
        this.authService.requestOptions(search)
      )
      .map((res: Response) => {
        return <Result<TypeAhead[]>>res.json();
      })
      .catch(this.handleError);
  }

  getDriversOnTrack(
    page: number,
    perPage: number,
    filter?: string
  ): Observable<Result<Person>> {
    const search = new URLSearchParams();
    search.set('PageNumber', page ? page.toString() : '0');
    search.set('PageSize', perPage ? perPage.toString() : '0');
    if (filter) {
      search.set('Filter', filter);
    }

    this.ObservePersonsResult = this.http
      .get(
        `${AppSettings.SERVER}/People/DriversOnTrack`,
        this.authService.requestOptions(search)
      )
      // this.ObservePersonsResult = this.http.get(`/assets/json/${personType}s.json`)
      .map((res: Response) => {
        return <Result<Person>>res.json();
      })
      .catch(this.handleError);

    return this.ObservePersonsResult;
  }

  getSpouses(personId: number): Observable<Person[]> {
    return this.http
      .get(
        `${AppSettings.SERVER}/People/${personId}/Spouse`,
        this.authService.requestOptions(null)
      )
      .map((res: Response) => {
        return <Person[]>res.json();
      })
      .catch(this.handleError);
  }

  getChildren(personId: number): Observable<Person[]> {
    return this.http
      .get(
        `${AppSettings.SERVER}/People/${personId}/Child`,
        this.authService.requestOptions(null)
      )
      .map((res: Response) => {
        return <Person[]>res.json();
      })
      .catch(this.handleError);
  }

  viewPerson(personType: string, personId: number): Observable<Person> {
    const search = new URLSearchParams();
    search.set('personType', personType);

    return (
      this.http
        .get(
          `${AppSettings.SERVER}/People/${personId}`,
          this.authService.requestOptions(search)
        )
        // return this.http.get(`/assets/json/${personType}1.json`)
        .map((res: Response) => {
          return <Person>res.json();
        })
        .catch(this.handleError)
    );
  }

  editPerson(personType: string, person: Person): Observable<Person> {
    return this.http
      .put(
        `${AppSettings.SERVER}/People/${person.id}`,
        person,
        this.authService.requestOptions()
      )
      .map((res: Response) => <any>res.json())
      .catch(this.handleError);
  }

  editPersonEmail(personId: number, email: string): Observable<any> {
    return this.http
      .put(
        `${AppSettings.SERVER}/People/${personId}/Email`,
        { email: email },
        this.authService.requestOptions()
      )
      .map((res: Response) => res.text())
      .catch(this.handleError);
  }

  editPersonPicture(personId: number, picture: string): Observable<any> {
    return this.http
      .put(
        `${AppSettings.SERVER}/People/${personId}/Picture`,
        { picture: picture },
        this.authService.requestOptions()
      )
      .map((res: Response) => res.text())
      .catch(this.handleError);
  }

  addPerson(personType: string, person: Person): Observable<XResponse<any>> {
    const search = new URLSearchParams();
    search.set('personType', personType);

    return this.http
      .post(
        `${AppSettings.SERVER}/People`,
        person,
        this.authService.requestOptions(search)
      )
      .map((res: Response) => <XResponse<any>>res.json())
      .catch(this.handleError);
  }

  deletePerson(Id: number) {
    return (
      this.http
        .delete(
          `${AppSettings.SERVER}/People/${Id}`,
          this.authService.requestOptions(null)
        )
        .map((res: Response) => res.json())
        // .do(data => console.log('All Updated!'), (e) => this.statusHandler.requestError(e))
        .catch(this.handleError)
    );
  }

  private handleError(error: Response) {
    console.log('Farmers Server', error.toString());
    return Observable.throw(error.json().error || 'Persons Server Error');
  }
}
