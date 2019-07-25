import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { CameraStatus } from '../model';
import { AlertService } from './alert.service';
import { LoginService } from './login.service';

declare var cordova: any;
declare var document: any;

@Injectable()
export class CameraService implements OnInit {

    // private onScanListener: any;
    ready: boolean;
    scanObservable: Observable<string>;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private loginService: LoginService) {
        document.addEventListener('deviceready', () => {
            this.ready = true;
        });
    }

    ngOnInit() {
        Observable.fromEvent(document, 'deviceready')
            .debounceTime(800)
            .distinctUntilChanged()
            .subscribe(() => {
                this.ready = true;
                console.log('EVENT', 'Observable event listener worked');
            });

    }

    initialized(): boolean {
        if (typeof cordova !== 'undefined') {
            if (typeof cordova.plugins.barcodeScanner !== 'undefined') {
                // this.ready = true;
                return true;
            } else {
                console.error('Camera engine not started.');
            }
        } else {
            console.error('Camera not found. Probably you are not on android yet');
        }
        return false;
    }

    scan() {
        this.scanObservable = new Observable((observer) => {
            if (!this.initialized()) {
                observer.error('Cordova not initialized.');
            }
            cordova.plugins.barcodeScanner.scan(
                (result) => {
                    console.log('CameraService', 'We got a barcode\n' +
                        'Result: ' + result.text + '\n' +
                        'Format: ' + result.format + '\n' +
                        'Cancelled: ' + result.cancelled);

                    if (!result.cancelled) {
                        // this.onScanListener(result.text);
                        observer.next(result.text);
                    }

                    observer.complete();
                    console.log('CameraService', 'We got this far');
                },
                (error) => {
                    console.log('Scanning failed: ' + error);
                    observer.error('Scanning failed: ' + error);
                },
                {
                    preferFrontCamera: false, // iOS and Android
                    showFlipCameraButton: false, // iOS and Android
                    showTorchButton: true, // iOS and Android
                    torchOn: false, // Android, launch with the torch switched on (if available)
                    saveHistory: false, // Android, save scan history (default false)
                    prompt: 'Place the barcode inside the scan area to login', // Android
                    resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
                    orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations: true, // iOS
                    disableSuccessBeep: false // iOS and Android
                }
            );
        });

        return this.scanObservable;
    }

    isOnMobile() {
        return typeof cordova !== 'undefined';
    }

    isReady(): boolean {
        return this.initialized && this.ready;
    }

}
