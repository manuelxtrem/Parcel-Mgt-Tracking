import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

    title: string;
    message: string;
    confirmText = 'OK';
    confirmColor = 'primary';

    constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {
    }

    ngOnInit() {
    }

    onConfirm() {
        this.dialogRef.close();
    }
}
