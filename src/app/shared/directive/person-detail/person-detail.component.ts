import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  EventEmitter,
  Output,
  SimpleChanges,
  ElementRef
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { PersonService } from '../../service/person.service';
import {
  Person,
  LoginDetail,
  XResponse,
  UserType,
  RegisterDetail
} from '../../model';
import { AlertService } from '../../service/alert.service';
import { NotyService } from '../../service/noty.service';
import { LoginService } from '../../service/login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit, OnChanges {
  personDetail: Person;
  loading: boolean;
  notSubPerson = true;
  showMarital = true;
  loginDetail = new LoginDetail();
  personTypeDriver: string;

  @Input() personType: string;
  @Input() editMode: boolean;
  @Output() editModeChange: EventEmitter<boolean> = new EventEmitter();
  @Input() personID: number;
  @Input() parentID: number;
  @Input() addMode: boolean;
  @Output() onPerson: EventEmitter<Person> = new EventEmitter();
  @Output() onSaved: EventEmitter<boolean> = new EventEmitter();
  @Output() onAdded: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('personForm') personForm: ElementRef;

  matcher = new MyErrorStateMatcher();
  surnameFC = new FormControl({ value: '', disabled: this.loading }, [
    Validators.required
  ]);
  othernameFC = new FormControl({ value: '', disabled: this.loading }, [
    Validators.required
  ]);
  genderFC = new FormControl({ value: '', disabled: this.loading }, [
    Validators.required
  ]);
  dateOfBirthFC = new FormControl({ value: '', disabled: this.loading }, [
    Validators.required
  ]);
  addressFC = new FormControl({ value: '', disabled: this.loading }, [
    Validators.required
  ]);
  vehicleNoFC = new FormControl({ value: '', disabled: this.loading }, [
    // Validators.required
  ]);
  vehicleDescFC = new FormControl({ value: '', disabled: this.loading }, [
    // Validators.required
  ]);
  mobileOneFC = new FormControl({ value: '', disabled: this.loading }, [
    Validators.required,
    Validators.pattern(/^0\d{9}$/)
  ]);
  mobileTwoFC = new FormControl({ value: '', disabled: this.loading }, [
    Validators.pattern(/^0\d{9}$/)
  ]);
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
    private notyService: NotyService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.personDetail = new Person();
    this.personTypeDriver = PersonService.PERSON_DRIVER;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (
      changes.addMode &&
      changes.addMode.isFirstChange() &&
      changes.addMode.currentValue
    ) {
      console.log('changed', changes.addMode);
      this.personDetail = {
        id: 0,
        fullName: '',
        surname: '',
        othername: '',
        gender: '',
        email: '',
        dateOfBirth: null,
        address: '',
        city: '',
        personType: '',
        mobileOne: '',
        mobileTwo: ''
      };
    } else {
      // do this when first change detected
      if (changes.personID && changes.personID.currentValue) {
        if (this.personType) {
          console.log('changes', 'editmode');
          this.getPersonDetails();
        }
      }
    }

    if (this.addMode) {
      this.personDetail.personType = this.personType;
      this.notSubPerson = true;
      console.log('person', this.personDetail);
      console.log('parentID', this.parentID);
    }
  }

  doChecks() {
    if (this.personDetail.personType === PersonService.PERSON_CHILD) {
      this.notSubPerson = false;
    } else if (this.personDetail.personType === PersonService.PERSON_SPOUSE) {
      this.notSubPerson = false;
      this.showMarital = false;
    }
  }

  getPersonDetails() {
    this.loading = true;
    this.personDetail = new Person();

    this.personService.viewPerson(this.personType, this.personID).subscribe(
      details => (this.personDetail = details),
      error => {
        this.loading = false;
        this.alertService.confirm({
          title: 'An error occurred',
          message:
            'Could not get the details of this person. Do you want to retry?',
          confirmText: 'RETRY',
          callback: result => {
            if (result) {
              this.getPersonDetails();
            }
          }
        });
      },
      () => {
        this.loading = false;
        this.onPerson.emit(this.personDetail);
        this.doChecks();
        console.log('personDtail', this.personDetail);
        this.loginDetail.email = this.personDetail.email;
      }
    );
  }

  onSave() {
    // submit on valid form
    if (!this.personForm.nativeElement.checkValidity()) {
      this.notyService.alert(
        'Please make sure all required (*) fields hae been filled.'
      );
      return;
    }

    let status: XResponse<any>;

    // this.alertService.startLoading();
    this.loading = true;

    if (this.addMode) {
      // adding new person
      this.personDetail.email = this.loginDetail.email;

      if (this.personType === PersonService.PERSON_CUSTOMER) {
        this.personDetail.qrHash = this.loginDetail.password;
      }

      this.personService
        .addPerson(this.personType, this.personDetail)
        .subscribe(
          (res: XResponse<any>) => {
            status = res;
            console.log('status:: ' + res.message);
          },
          error => {
            this.loading = false;
            // this.alertService.stopLoading();
            this.alertService.confirm({
              title: 'An error occurred',
              message:
                'Could not add the details of this person. Do you want to retry?',
              confirmText: 'RETRY',
              callback: result => {
                if (result) {
                  this.onSave();
                }
              }
            });
          },
          () => {
            // this.alertService.stopLoading();
            this.loading = false;

            if (status.status) {
              const newPerson: Person = status.data;
              if (newPerson) {
                this.personDetail.id = newPerson.id;
                this.doEmailAdd();
              } else {
                console.error(
                  'Fatal error:: empty person returned from server'
                );
              }
            } else {
              this.alertService.alert({
                title: 'An error occurred',
                message: status.message
              });
            }
          }
        );
    } else {
      // editing existing person
      this.personService
        .editPerson(this.personType, this.personDetail)
        .subscribe(
          res => {},
          error => {
            this.loading = false;
            // this.alertService.stopLoading();
            this.onSaved.emit(false);
            this.alertService.confirm({
              title: 'An error occurred',
              message:
                'Could not save the details of this person. Do you want to retry?',
              confirmText: 'RETRY',
              callback: result => {
                if (result) {
                  this.personDetail.id = 0;

                  this.onSave();
                }
              }
            });
          },
          () => {
            this.loading = false;
            // this.alertService.stopLoading();
            this.editMode = false;
            this.editModeChange.emit(false);
            this.onSaved.emit(true);
            this.notyService.alert('The changes have been saved successfully.');
          }
        );
    }
  }

  doEmailAdd() {
    const registerDetail: RegisterDetail = {
      email: this.emailFC.value,
      phoneNumber: this.personDetail.mobileOne,
      password: this.passwordFC.value,
      confirmPassword: this.passwordFC.value,
      personId: this.personDetail.id,
      isCustomer: this.personType === UserType.CUSTOMER
    };

    this.loading = true;

    this.loginService.addLoginDetails(registerDetail).subscribe(
      result => {
        console.log('ADD', 'result => ' + result);
      },
      error => {
        this.loading = false;
        // TODO remove previously added person to avoid conflicts TODO
        this.alertService.confirm({
          title: 'An error occurred',
          message:
            'Could not save the login details! Do you want to try again.',
          confirmText: 'RETRY',
          callback: result => {
            if (result) {
              this.onSave();
            }
          }
        });
        console.log('ADD', 'error => ' + error);
      },
      () => {
        console.log('ADD', 'success');
        this.loading = false;
        this.onAdded.emit(true);
        this.onPerson.emit(this.personDetail);
        this.personDetail.id = 0;

        this.notyService.alert('The details have been added successfully.');
      }
    );
  }
}
