import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

declare var $: any;

@Component({
    selector: 'app-cropper-dialog',
    templateUrl: './cropper-dialog.component.html',
    styleUrls: ['./cropper-dialog.component.css']
})
export class CopperDialogComponent implements OnInit {

    cropperObj: any;
    image = '';
    theFile;
    cropReady: boolean;
    @ViewChild('cropHandle') cropHandle: ElementRef;

    constructor(public dialogRef: MatDialogRef<CopperDialogComponent>) {
    }

    ngOnInit() {
        this.cropperObj = $(this.cropHandle.nativeElement);
        this.initialize();
    }


    initialize() {
        this.cropperObj.cropper('destroy');
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.cropperObj.attr('src', e.target.result);
            this.cropReady = true;

            this.cropperObj.cropper({
                aspectRatio: 1 / 1,
                strict: false,
                responsive: true,
                dragCrop: false,
                minContainerWidth: 300,
                minContainerHeight: 200,
                cropBoxMovable: true,
                cropBoxResizable: true
            });
        };
        reader.readAsDataURL(this.theFile);
    }

    onRotateLClick() {
        if (this.cropperObj) {
            this.cropperObj.cropper('rotate', -45);
        }
    }

    onRotateRClick() {
        if (this.cropperObj) {
            this.cropperObj.cropper('rotate', 45);
        }
    }

    onZoomInClick() {
        if (this.cropperObj) {
            this.cropperObj.cropper('zoom', 0.1);
        }
    }

    onZoomOutClick() {
        if (this.cropperObj) {
            this.cropperObj.cropper('zoom', -0.1);
        }
    }

    onSaveClick() {
        if (this.cropperObj) {
            // get cropped image and resize
            this.image = this.cropperObj.cropper('getCroppedCanvas', {
                width: 400,
                height: 400
            }).toDataURL();
            this.cropperObj.cropper('destroy');
            this.dialogRef.close(this.image);
        } else {
            this.dialogRef.close();
        }
    }

    onCancelClick() {
        if (this.cropperObj) {
            // destroy cropper object
            this.cropperObj.cropper('destroy');
        }

        // close dialog
        this.dialogRef.close();
    }

}
