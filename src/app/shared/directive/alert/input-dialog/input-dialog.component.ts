import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-input-dialog',
    templateUrl: './input-dialog.component.html',
    styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent implements OnInit {

    title: string;
    message: string;
    placeholder: string;
    input: string;
    confirmText = 'OK';
    confirmColor = 'primary';
    cancelText = 'Cancel';

    constructor(public dialogRef: MatDialogRef<InputDialogComponent>) {
    }

    ngOnInit() {
    }

    onConfirm() {
        this.dialogRef.close(this.input);
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    onKey() {
        this.onConfirm();
    }

}
