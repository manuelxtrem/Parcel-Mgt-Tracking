import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent, AlertDialogComponent, InputDialogComponent, LoadingDialogComponent } from '../directive/alert';

@Injectable()
export class NotyService {

    constructor(
        public snackBar: MatSnackBar) {
    }

    alert(message: string) {
        const snackBarRef = this.snackBar.open(message, null, {
            duration: 2000
        });
    }

    notification(options: ConfirmNotyModel) {
        const snackBarRef = this.snackBar.open(options.message, options.actionText);
        snackBarRef.onAction().subscribe(() => {
            options.callback();
        });
    }

    dismissAll() {
        this.snackBar.dismiss();
    }

}

export class ConfirmNotyModel {
    message: string;
    actionText: string;
    callback: () => any;
}
