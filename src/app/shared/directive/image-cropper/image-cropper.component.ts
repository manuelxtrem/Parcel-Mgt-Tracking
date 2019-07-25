import { Component, OnInit, EventEmitter, OnChanges, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CopperDialogComponent } from './shared/cropper-dialog/cropper-dialog.component';

@Component({
    selector: 'app-image-cropper',
    templateUrl: 'image-cropper.component.html',
    styleUrls: ['image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {

    @Input() image: string;
    @Input() circle: boolean;
    @Output() onImage: EventEmitter<string> = new EventEmitter<string>();
    @Input() member: boolean;
    // @Input() loading: boolean;

    dialogRef;

    constructor(public dialog: MatDialog
    ) {
        this.image = './assets/img/default_img.jpg';
    }

    ngOnInit() {
    }

    onFileChanged(event) {
        if (event.srcElement.files[0]) {
            // initialize Cropper with chosen image
            this.dialogRef = this.dialog.open(CopperDialogComponent);
            this.dialogRef.componentInstance.theFile = event.srcElement.files[0];

            this.dialogRef.afterClosed().subscribe(result => {
                // get image
                this.image = result;
                this.member = false;
                this.onImage.emit(result);
            });
        }
    }

}
