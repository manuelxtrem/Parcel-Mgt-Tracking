import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NotyService } from '../../service/noty.service';
import { AlertService } from '../../service/alert.service';
import { LoginDetail, Person } from '../../model';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { PersonService } from '../../service/person.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-person-login',
    templateUrl: './person-login.component.html',
    styleUrls: ['./person-login.component.css']
})
export class PersonLoginComponent implements OnInit, OnChanges {

    @Input() personID: number;
    @Input() person: Person;
    @Input() load: boolean;
    loginDetail = new LoginDetail();
    loading: boolean;
    editMode: boolean;
    matcher = new MyErrorStateMatcher();

    emailFC = new FormControl({ value: '', disabled: this.loading }, [
        Validators.required,
        Validators.email
    ]);
    passwordFC = new FormControl({ value: '', disabled: this.loading }, [
        Validators.required,
        Validators.minLength(6)
    ]);
    repeatPasswordFC = new FormControl({ value: '', disabled: this.loading }, [
        Validators.required,
        Validators.minLength(6)
    ]);

    constructor(
        private personService: PersonService,
        private loginService: LoginService,
        private noty: NotyService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        // this.emailFC.value = this.loginService.getUserEmail();
        this.loading = true;
    }

    ngOnChanges() {
        if (this.load) {
            this.load = false;
            if (this.person) {
                this.loading = false;
                this.loginDetail.email = this.person.email;
            }
        }
    }

    onSave() {
        if (!this.person) {
            this.alertService.alert({
                title: 'An error occurred',
                message: 'Sorry, please try again.'
            });
            console.error('PersonLogin:: person is empty. find a way to solve this.');
            return;
        }

        const loginDetail: LoginDetail = {
            userId: this.personID,
            email: this.emailFC.value,
            password: this.passwordFC.value,
            repeatPassword: this.repeatPasswordFC.value,
            token: this.loginService.getUserSession()
        };

        this.loading = true;

        this.loginService.editLoginDetails(loginDetail).subscribe(
            result => {
                console.log('EDIT', 'result => ' + result);
            },
            (error) => {
                this.loading = false;
                this.alertService.confirm({
                    title: 'An error occurred',
                    message: 'Could not save the login details! Do you want to try again.',
                    confirmText: 'RETRY',
                    callback: (result) => {
                        if (result) {
                            this.onSave();
                        }
                    }
                });
                console.log('EDIT', 'error => ' + error);
            },
            () => {
                this.loading = false;
                this.savePersonEmail();
                console.log('EDIT', 'success');
            }
        );
    }

    savePersonEmail() {
        this.loading = true;
        this.personService.editPersonEmail(this.person.id, this.person.email).subscribe(
            result => {
            },
            error => {
                this.loading = false;
                this.alertService.confirm({
                    title: 'An error occurred',
                    message: 'Could not save the login details! Do you want to try again.',
                    confirmText: 'RETRY',
                    callback: (result) => {
                        if (result) {
                            this.savePersonEmail();
                        }
                    }
                });
            },
            () => {
                this.loading = false;
                this.noty.alert('The login details have been saved!');
            }
        );
    }

}
