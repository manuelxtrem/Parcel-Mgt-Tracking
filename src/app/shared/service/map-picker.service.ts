import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { MapPickerComponent } from '../directive/map-picker/map-picker.component';
import { GPSLocation } from '../model';

@Injectable()
export class MapPickerService {

    constructor(
        public dialog: MatDialog) {
    }

    open(location: GPSLocation): Observable<GPSLocation> {
        const dialogRef = this.dialog.open(MapPickerComponent, {
            data: location
        });
        return dialogRef.afterClosed();
    }

    close() {
        this.dialog.closeAll();
    }

}
