import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  Result,
  Parcel,
  ParcelStatus,
  TypeAhead
} from '../../../../shared/model';
import { ReportService } from '../../../../shared/service/report.service';
import { ParcelService } from '../../../../shared/service/parcel.service';
import { PersonService } from '../../../../shared/service/person.service';
import { MatDatepickerInputEvent, MatSelectChange } from '@angular/material';
import { AlertService } from '../../../../shared/service/alert.service';

@Component({
  selector: 'app-report-parcel',
  templateUrl: './report-parcel.component.html',
  styleUrls: ['./report-parcel.component.css']
})
export class ReportParcelComponent implements OnInit {
  deliveriesAsync: Observable<Result<Parcel>>;
  dateFrom = new Date();
  dateTo = new Date();
  parcels: Parcel[];
  parcelType = 'all';
  driverId = 0;
  driverName = '';
  driverloading: boolean;
  driverList: TypeAhead[];
  pageIndex = 0;
  pageSize = 100;
  parcelTypes = [
    { value: 'all', viewValue: 'All' },
    { value: 'new', viewValue: 'New' },
    { value: 'transporting', viewValue: 'Transporting' },
    { value: 'delivered', viewValue: 'Delivered' },
    { value: 'arrival', viewValue: 'Arrived' },
    { value: 'damaged', viewValue: 'Damaged' }
  ];

  constructor(
    private alertService: AlertService,
    private reportService: ReportService,
    private personService: PersonService,
    private parcelService: ParcelService
  ) {
    this.dateFrom.setDate(this.dateFrom.getDate() - 7);
  }

  ngOnInit() {
    this.getDeliveries();
  }

  getDeliveries() {
    this.deliveriesAsync = this.reportService.getParcelsReport(
      this.driverId,
      this.pageIndex,
      this.pageSize,
      this.parcelType,
      this.dateFrom,
      this.dateTo
    );

    this.deliveriesAsync.subscribe(
      result => {
        this.parcels = result.data;
      }
    );
  }

  onParcelType(data: MatSelectChange) {
    console.log('parcel type changed', data);
    this.parcelType = data.value;
    this.getDeliveries();
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

  onDriverTypedAhead(item: TypeAhead): void {
    this.driverId = item.id;
    this.driverName = item.value;
    this.getDeliveries();
  }

  dateChanged(event: MatDatepickerInputEvent<Date>): void {
    console.log('newDate', event);
    if (this.dateFrom > this.dateTo) {
      this.alertService.alert({
        title: 'Warning',
        message: 'The Start Date cannot be a date after the End Date.'
      });
    } else {
      this.getDeliveries();
    }
  }
}
