import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-loading-dialog',
    templateUrl: './loading-dialog.component.html',
    styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<LoadingDialogComponent>) {
    }

    ngOnInit() {
    }

}
