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
import { LoginService } from '../../../../shared/service/login.service';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css']
})
export class DeliveryInfoComponent implements OnInit {
  typeAheadFilter: string;
  details: Parcel = new Parcel();
  todate: Date;
  recipientQRHash: any;

  constructor(
    public dialogRef: MatDialogRef<DeliveryInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public loginService: LoginService,
    private notyService: NotyService,
    private alertService: AlertService
  ) {
    this.details = data.parcel;
    this.todate = new Date();
  }

  ngOnInit() {
    // this.dialogRef.disableClose = true;
    this.dialogRef.updateSize('350px');
    this.dialogRef.beforeClose().subscribe(() => {
      this.notyService.dismissAll();
    });
  }

  getRecipientQRHash() {
    const outing =
      '{"mobile":"' +
      this.details.sender.mobileOne +
      '", "code":"' +
      this.details.sender.qrHash +
      '"}';
    console.log('outing', outing);
    return outing;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
