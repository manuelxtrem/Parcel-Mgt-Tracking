import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { QrScannerComponent } from '../directive/qr-scanner/qr-scanner.component';

declare var cordova: any;

@Injectable()
export class QrScannerService {
  constructor(public dialog: MatDialog) {}

  open(): Observable<any> {
    // if on android check permissions
    if (typeof cordova !== 'undefined') {
      const permissions = cordova.plugins.permissions;
      permissions.requestPermission(
        permissions.CAMERA,
        status => {
          if (status && !status.hasPermission) {
            console.warn('Camera permission is not turned on');
          }
        },
        error => {
          console.warn('Camera permission is not turned on');
        }
      );
    }

    const dialogRef = this.dialog.open(QrScannerComponent);
    return dialogRef.afterClosed();
  }

  close() {
    this.dialog.closeAll();
  }
}
