import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    title: string;
    message: string;
    confirmText = 'CONFIRM';
    confirmColor = 'primary';
    cancelText = 'Cancel';

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    }

    ngOnInit() {
    }

    onConfirm() {
        this.dialogRef.close(true);
    }

    onCancel() {
        this.dialogRef.close(false);
    }

}
