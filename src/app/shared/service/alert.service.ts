import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  ConfirmDialogComponent,
  AlertDialogComponent,
  InputDialogComponent,
  LoadingDialogComponent
} from '../directive/alert';

@Injectable()
export class AlertService {
  loadingRef: any;

  constructor(public dialog: MatDialog) {}

  confirm(options: ConfirmModel) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = options.title;
    dialogRef.componentInstance.message = options.message;
    dialogRef.componentInstance.confirmText = options.confirmText || 'CONFIRM';
    dialogRef.componentInstance.confirmColor =
      options.confirmColor || 'primary';
    dialogRef.componentInstance.cancelText = options.cancelText || 'Cancel';

    dialogRef.afterClosed().subscribe(result => {
      options.callback(result);
    });
  }

  alert(options: AlertModel) {
    const dialogRef = this.dialog.open(AlertDialogComponent);
    dialogRef.componentInstance.title = options.title || 'Alert';
    dialogRef.componentInstance.message = options.message;
    dialogRef.componentInstance.confirmText = options.confirmText || 'OK';
    dialogRef.componentInstance.confirmColor =
      options.confirmColor || 'primary';
  }

  input(options: InputModel) {
    const dialogRef = this.dialog.open(InputDialogComponent);
    dialogRef.componentInstance.title = options.title;
    dialogRef.componentInstance.message = options.message;
    dialogRef.componentInstance.confirmText = options.confirmText || 'CONFIRM';
    dialogRef.componentInstance.confirmColor =
      options.confirmColor || 'primary';
    dialogRef.componentInstance.cancelText = options.cancelText || 'Cancel';

    dialogRef.afterClosed().subscribe(result => {
      options.callback(result);
    });
  }

  startLoading() {
    this.loadingRef = this.dialog.open(LoadingDialogComponent);
    this.loadingRef.disableClose = true;
  }

  stopLoading() {
    if (this.loadingRef) {
      this.loadingRef.close();
    }
  }

  close() {
    this.dialog.closeAll();
  }
}

export class AlertModel {
  title?: string;
  message: string;
  confirmText?: string;
  confirmColor?: string;
}

export class ConfirmModel {
  title: string;
  message: string;
  confirmText?: string;
  confirmColor?: string;
  cancelText?: string;
  callback: (result: boolean) => any;
}

export class InputModel {
  title: string;
  message: string;
  confirmText?: string;
  confirmColor?: string;
  cancelText?: string;
  callback: (result: boolean) => any;
}
