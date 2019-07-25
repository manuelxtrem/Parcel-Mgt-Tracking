import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OutgrowerAppComponent } from './outgrower-app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatDialogModule,
  MatButtonModule,
  MatListModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from '../shared/shared.module';
import { FarmerModule } from './pages/farmer/farmer.module';
import { GroupModule } from './pages/group/group.module';
import { UserFeedbackModule } from './pages/user-feedback/user-feedback.module';
import { DeliveryModule } from './pages/delivery/delivery.module';
import { RouteModule } from './pages/route/route.module';
import { DashboardDriverComponent } from './pages/dashboard-driver/dashboard-driver.component';
import { LocationService } from '../shared/service/location.service';
import { DamageModule } from './pages/damage/damage.module';
import { TransportNoticeComponent } from './pages/dashboard-driver/transport-notice/transport-notice.component';
import { ReportModule } from './pages/report/report.module';
import { ListModule } from '../shared/directive/list/list.module';
import { DriversMapComponent } from './pages/drivers-map/drivers-map.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatDialogModule,
    RouterModule,
    SharedModule,
    NgCircleProgressModule.forRoot({
      maxPercent: 100,
      outerStrokeColor: '#4882c2',
      innerStrokeColor: '#e7e8ea',
      showInnerStroke: true,
      animation: false,
      backgroundOpacity: 0,
      radius: 60,
      space: -15,
      outerStrokeWidth: 15,
      innerStrokeWidth: 15,
      animateTitle: false,
      animationDuration: 1000,
      showUnits: true,
      showSubtitle: true,
      showBackground: false,
      clockwise: true
    }),
    ListModule,
    FarmerModule,
    GroupModule,
    UserFeedbackModule,
    DeliveryModule,
    RouteModule,
    DamageModule,
    ReportModule
  ],
  declarations: [
    OutgrowerAppComponent,
    DashboardComponent,
    DashboardDriverComponent,
    TransportNoticeComponent,
    DriversMapComponent
  ],
  entryComponents: [TransportNoticeComponent],
  providers: [LocationService]
})
export class OutgrowerAppModule {}
