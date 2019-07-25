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
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css']
})
export class DeliveryDetailsComponent implements OnInit {
  typeAheadFilter: string;
  details: Parcel = new Parcel();
  driverList: TypeAhead[];
  personsList: TypeAhead[];
  routesList: TypeAhead[];
  editMode: boolean;
  loading: boolean;
  years: Date[];
  levels: string[];

  routeloading: boolean;
  driverloading: boolean;
  customerloading: boolean;

  constructor(
    public dialogRef: MatDialogRef<DeliveryDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private parcelService: ParcelService,
    private personService: PersonService,
    private routeService: RouteService,
    private mapPicker: MapPickerService,
    private notyService: NotyService,
    private alertService: AlertService
  ) {
    console.log('data', data);
    this.details = data.parcel;
    this.editMode = data.editMode;
  }

  ngOnInit() {
    // this.dialogRef.disableClose = true;
    this.dialogRef.updateSize('350px');
    this.dialogRef.beforeClose().subscribe(() => {
      this.notyService.dismissAll();
    });

    this.getDriverAhead('');
    this.getPersonAhead('');
    this.getRouteAhead('');
  }

  getPersonAhead(filter: string) {
    this.customerloading = true;
    this.personService
      .getTypeAhead(PersonService.PERSON_CUSTOMER, filter)
      .subscribe(data => {
        this.customerloading = false;
        this.personsList = data;
      });
  }

  getDriverAhead(filter: string) {
    this.driverloading = true;
    this.personService
      .getTypeAhead(PersonService.PERSON_DRIVER, filter)
      .subscribe(data => {
        this.driverloading = false;
        this.driverList = data;
      });
  }

  getRouteAhead(filter: string) {
    this.routeloading = true;
    this.routeService.getTypeAhead(filter).subscribe(data => {
      this.routeloading = false;
      this.routesList = data;
    });
  }

  onDriverTypedAhead(item: TypeAhead): void {
    this.details.driverId = item.id;
  }

  onSenderTypedAhead(item: TypeAhead): void {
    this.details.senderId = item.id;
  }

  onRecipientTypedAhead(item: TypeAhead): void {
    this.details.recipientId = item.id;
  }

  onRouteTypedAhead(item: TypeAhead): void {
    this.details.routeId = item.id;
  }

  onSourceSelect() {
    this.mapPicker
      .open({
        latitude: this.details.route.sourceLat,
        longitude: this.details.route.sourceLong
      })
      .subscribe((result: GPSLocation) => {
        console.log('GPS result', result);
        if (result) {
        }
      });
  }

  onDestinationSelect() {}

  formValid(): boolean {
    return (
      this.details.driverId &&
      this.details.senderId &&
      this.details.recipientId &&
      this.details.routeId &&
      this.details.routeId &&
      this.details.weight &&
      this.details.charge &&
      this.details.insurance &&
      this.details.description.length > 0
    );
  }

  onSave() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.notyService.dismissAll();
    let result;

    if (this.editMode) {
      // we're saving edited chages
      this.parcelService.editParcel(this.details).subscribe(
        res => (result = res),
        error => {
          this.loading = false;
          this.alertService.confirm({
            title: 'An error occurred',
            message: 'Could not save changes. Do you want to retry?',
            confirmText: 'RETRY',
            confirmColor: 'warn',
            callback: ans => {
              if (ans) {
                this.onSave();
              }
            }
          });
        },
        () => {
          this.loading = false;
          this.notyService.alert('Changes have been saved successfully.');
          this.dialogRef.close(true);
        }
      );
    } else {
      // we're adding new details
      this.parcelService.addParcel(this.details).subscribe(
        res => (result = res),
        error => {
          this.loading = false;
          this.alertService.confirm({
            title: 'An error occurred',
            message: 'Could not save changes. Do you want to retry?',
            confirmText: 'RETRY',
            confirmColor: 'warn',
            callback: ans => {
              if (ans) {
                this.onSave();
              }
            }
          });
        },
        () => {
          this.loading = false;
          this.notyService.alert('The entry has been saved successfully.');

          // print receipt
          this.dialogRef.close(true);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
