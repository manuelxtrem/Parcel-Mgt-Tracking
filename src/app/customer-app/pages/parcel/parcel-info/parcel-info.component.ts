import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotyService } from '../../../../shared/service/noty.service';
import { AlertService } from '../../../../shared/service/alert.service';
import { ParcelService } from '../../../../shared/service/parcel.service';
import {
  Parcel,
  Person,
  TypeAhead,
  GPSLocation
} from '../../../../shared/model';
import { PersonService } from '../../../../shared/service/person.service';
import { MapPickerService } from '../../../../shared/service/map-picker.service';
import { RouteService } from '../../../../shared/service/route.service';

@Component({
  selector: 'app-parcel-info',
  templateUrl: './parcel-info.component.html',
  styleUrls: ['./parcel-info.component.css']
})
export class ParcelInfoComponent implements OnInit {
  personId: number;
  typeAheadFilter: string;
  details: Parcel = new Parcel();

  constructor(
    public dialogRef: MatDialogRef<ParcelInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notyService: NotyService,
    private alertService: AlertService
  ) {
    console.log('data', data);
    this.personId = data.personId;
    this.details = data.parcel;
  }

  ngOnInit() {
    // this.dialogRef.disableClose = true;
    this.dialogRef.updateSize('350px');
    this.dialogRef.beforeClose().subscribe(() => {
      this.notyService.dismissAll();
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
