import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  SummaryReport,
  Parcel,
  ParcelStatus,
  Result,
  Person
} from '../../../shared/model';
import { ReportService } from '../../../shared/service/report.service';
import { ParcelService } from '../../../shared/service/parcel.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { IconsService } from '../../../shared/service/icons.service';
import { PersonService } from '../../../shared/service/person.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  icons = ['users', 'routes', 'box', 'thumbstars'];
  topItemsCols = 4;
  loading = true;

  deliveriesAsync: Observable<Result<Parcel>>;
  driversAsync: Observable<Result<Person>>;
  summaryReport: SummaryReport;

  ratings: number[];

  constructor(
    private reportService: ReportService,
    private parcelService: ParcelService,
    private personService: PersonService,
    iconsService: IconsService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconsService.getSVGIcons().forEach(icon => {
      iconRegistry.addSvgIcon(
        icon,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${icon}.svg`)
      );
    });
    this.summaryReport = new SummaryReport();
  }

  ngOnInit() {
    this.ratings = [0, 0, 0, 0, 0];
    this.getSummaries();
  }

  getSummaries() {
    this.loading = true;
    this.reportService.getSummaryReport().subscribe(
      summaries => {
        this.summaryReport = summaries;
      },
      error => {
        // TODO
      },
      () => {
        this.loading = false;

        this.getDeliveries();

        this.ratings = [
          this.summaryReport.rating.rate1,
          this.summaryReport.rating.rate2,
          this.summaryReport.rating.rate3,
          this.summaryReport.rating.rate4,
          this.summaryReport.rating.rate5
        ];
      }
    );
  }

  getDeliveries() {
    this.deliveriesAsync = this.parcelService.getStatusParcels(
      ParcelStatus.TRANSPORTING,
      0,
      10
    );
    this.driversAsync = this.personService.getDriversOnTrack(0, 10);
    // this.arrivalsAsync = this.parcelService.getStatusParcels(
    //   ParcelStatus.ARRIVALS,
    //   0,
    //   10,
    //   ''
    // );
  }

  onParcelSelect(parcel) {
    // TODO
    // alert('STUB!');
  }
}
