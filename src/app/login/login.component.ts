import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserType, User, TokenResult } from '../shared/model';
import { AuthService } from '../shared/service/auth.service';
import { LoginService } from '../shared/service/login.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../shared/service/alert.service';
import { PersonService } from '../shared/service/person.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loading = false;
    returnUrl: string;
    queryParams: any;
    scanMode = false;
    matcher = new MyErrorStateMatcher();
    // loginForm: FormGroup;

    usernameFC = new FormControl({ value: '', disabled: this.loading }, [
        Validators.required,
        Validators.email
    ]);
    passwordFC = new FormControl({ value: '', disabled: this.loading }, [
        Validators.required,
        Validators.minLength(6)
    ]);
    // typeFC = new FormControl({value: UserType.DRIVER, disabled: this.loading}, [
    //     Validators.required
    // ]);


    constructor(private router: Router,
        private aRoute: ActivatedRoute,
        private authService: AuthService,
        private alertService: AlertService,
        private loginService: LoginService) {
    }

    ngOnInit() {
        // reset login status
        this.loginService.setUserLoggedOut();

        // get return url from route parameters
        this.returnUrl = this.aRoute.snapshot.queryParams['returnUrl'] || '/manage';
    }

    onSubmit() {
        if (this.loading) {
            return false;
        }

        this.loading = true;

        this.loginService.login(this.usernameFC.value, this.passwordFC.value, UserType.STAFF).subscribe(
            (token: TokenResult) => {
                this.getUserDetails(token.userId);
            },
            (error: Response) => {
                // Noty.error(`An unknown error occurred: ${error}`); TODO replace with better
                this.loading = false;
                console.log('login2 error', error);

                let message = '';
                if (error.status === 0) {
                    message = 'Could not communicate with the server. Please check your internet connection and try again.';
                } else if (error.status === 401) {
                    message = 'The username or password is incorrect';
                } else {
                    message = `An error occurred: ${error.statusText}`;
                }

                this.alertService.alert({
                    title: 'Login failed',
                    message: message
                });
            }
        );
    }

    getUserDetails(userId: number) {
        this.loginService.getUser(userId).subscribe(
            details => {
                if (details.personType.toLowerCase() === PersonService.PERSON_DRIVER) {
                    this.router.navigate(['/driver']);
                } else {
                    this.router.navigate([this.returnUrl]);
                }
            },
            (error) => {
                // Noty.error(`An unknown error occurred: ${error}`); TODO replace with better
                this.loading = false;
                console.log('login3 error', error);
                this.alertService.alert({
                    title: 'Login failed',
                    message: 'An unknown error occurred. Please try again.'
                });
            },
            () => {
                console.log('login3', 'complete');
                this.loading = false;
            }
        );
    }

}
