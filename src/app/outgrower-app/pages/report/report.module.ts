import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSpinner,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { StickyModule } from 'ng2-sticky-kit';

import { ListModule } from '../../../shared/directive/list/list.module';

import { ReportComponent } from './report.component';
import { ReportService } from '../../../shared/service/report.service';
import { ReportRouteComponent } from './report-route/report-route.component';
import { ReportFeedbackComponent } from './report-feedback/report-feedback.component';
import { ReportParcelComponent } from './report-parcel/report-parcel.component';
import { ReportPersonComponent } from './report-person/report-person.component';
import { ReportMainComponent } from './report-main/report-main.component';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    CdkTableModule,
    MatDatepickerModule,
    MatMenuModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    StickyModule,
    ListModule
  ],
  declarations: [
    ReportComponent,
    ReportPersonComponent,
    ReportParcelComponent,
    ReportRouteComponent,
    ReportFeedbackComponent,
    ReportMainComponent
  ],
  providers: [ReportService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportModule {}
