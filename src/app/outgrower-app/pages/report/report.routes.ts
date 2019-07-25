import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../../../shared/guard';
import { ReportComponent } from './report.component';
import { ReportPersonComponent } from './report-person/report-person.component';
import { ReportMainComponent } from './report-main/report-main.component';
import { ReportRouteComponent } from './report-route/report-route.component';
import { ReportParcelComponent } from './report-parcel/report-parcel.component';
import { ReportFeedbackComponent } from './report-feedback/report-feedback.component';

export const ReportRoutes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    children: [
      {
        path: '',
        component: ReportMainComponent,
        canActivate: [AuthGuard, AccessGuard]
      },
      {
        path: 'parcel',
        component: ReportParcelComponent,
        canActivate: [AuthGuard, AccessGuard]
      },
      {
        path: 'person',
        component: ReportPersonComponent,
        canActivate: [AuthGuard, AccessGuard]
      },
      {
        path: 'feedback',
        component: ReportFeedbackComponent,
        canActivate: [AuthGuard, AccessGuard]
      },
      {
        path: 'route',
        component: ReportRouteComponent,
        canActivate: [AuthGuard, AccessGuard]
      }
    ]
  }
];
