import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserType, User, TokenResult } from '../shared/model';
import { AuthService } from '../shared/service/auth.service';
import { LoginService } from '../shared/service/login.service';
import { AlertService } from '../shared/service/alert.service';
import { CameraService } from '../shared/service/camera.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { QrScannerService } from '../shared/service/qr-scanner.service';

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
  selector: 'app-login',
  templateUrl: './logincust.component.html',
  styleUrls: ['./logincust.component.css']
})
export class LogincustComponent implements OnInit {
  username: string;
  password: string;
  loading = false;
  test = '{"mobile":"0242443401", "code":"asdfasdf"}';
  scanMode = false;
  returnUrl: string;
  queryParams: any;
  matcher = new MyErrorStateMatcher();
  // loginForm: FormGroup;

  mobileFC = new FormControl({ value: '', disabled: this.loading }, [
    Validators.required,
    Validators.pattern(/^0\d{9}$/)
  ]);
  codeFC = new FormControl({ value: '', disabled: this.loading }, [
    Validators.required,
    Validators.minLength(6)
  ]);

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService,
    private alertService: AlertService,
    private cameraService: CameraService,
    private loginService: LoginService,
    private qrScanner: QrScannerService
  ) {
    iconRegistry.addSvgIcon(
      'qrcode',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/qrcode.svg')
    );
  }

  ngOnInit() {
    // reset login status
    this.loginService.setUserLoggedOut();

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.aRoute.snapshot.queryParams['returnUrl'] || '/customer';
  }

  onSubmit() {
    if (this.loading) {
      return false;
    }

    this.loading = true;

    this.loginService
      .login(this.mobileFC.value, this.codeFC.value, UserType.CUSTOMER)
      .subscribe(
        (token: TokenResult) => {
          this.onLoginSuccess(token);
        },
        (error: Response) => {
          this.onLoginError(error);
        }
      );
  }

  onLoginError(error: Response, isScan?: boolean) {
    // Noty.error(`An unknown error occurred: ${error}`); TODO replace with better
    this.loading = false;
    console.log('login2 error', error);

    let message = '';
    if (error.status === 0) {
      message =
        'Could not communicate with the server. Please check your internet connection and try again.';
    } else if (error.status === 401) {
      message = isScan
        ? 'The QR Code is incorrect. Try again.'
        : 'The mobile number or the code is incorrect';
    } else {
      message = `An error occurred: ${error.statusText}`;
    }

    this.alertService.alert({
      title: 'Login failed',
      message: message
    });
  }

  onLoginSuccess(token: TokenResult) {
    this.loginService.getUser(token.userId).subscribe(
      details => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
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

  onScanResult(text: string) {
    console.log('entered login scan');
    if (this.loading) {
      console.log('login scan', 'loading');
      return false;
    }

    let decoded;

    // logic
    if (text && text.indexOf('{"mobile":') !== -1) {
      try {
        decoded = JSON.parse(text); // TODO fix -  text is an object, not json string
      } catch (e) {
        console.log('decode error', e);
      }
    }

    console.log('decode2', decoded);

    if (!decoded) {
      this.alertService.alert({
        title: 'Warning',
        message: 'This code is invalid. Please scan a different code.'
      });
      return;
    }

    this.loading = true;

    this.loginService
      .login(decoded.mobile, decoded.code, UserType.CUSTOMER)
      .subscribe(
        (token: TokenResult) => {
          this.onLoginSuccess(token);
        },
        (error: Response) => {
          this.onLoginError(error, true);
        }
      );
    // message: 'This code does not exist. Please scan a different code.' TODO
  }

  beginScan() {
    if (!this.cameraService.isOnMobile()) {
      this.alertService.alert({
        title: 'Sorry',
        message: 'Code scanning works only on the mobile app.'
      });
    } else if (this.cameraService.isReady()) {
      this.cameraService.scan().subscribe(this.onScanResult);
    } else {
      this.alertService.confirm({
        title: 'An error occurred',
        message: 'Camera was not initialized. Try again?',
        confirmText: 'RETRY',
        callback: result => {
          if (result) {
            this.beginScan();
          }
        }
      });
    }
  }

  beginScan2() {
    this.qrScanner.open().subscribe(code => {
      console.log('resulting code', code);
      if (code) {
        this.onScanResult(code);
      }
    });
  }
}
