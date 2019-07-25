import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../shared/guard';

import { OutgrowerAppComponent } from './outgrower-app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DriversMapComponent } from './pages/drivers-map/drivers-map.component';
import { DashboardDriverComponent } from './pages/dashboard-driver/dashboard-driver.component';
import { FarmerRoutes } from './pages/farmer/farmer.routes';
import { GroupComponent } from './pages/group/group.component';
import { UserFeedbackRoutes } from './pages/user-feedback/user-feedback.routes';
import { DeliveryRoutes } from './pages/delivery/delivery.routes';
import { RouteRoutes } from './pages/route/route.routes';
import { DamageRoutes } from './pages/damage/damage.routes';
import { ReportRoutes } from './pages/report/report.routes';

export const OutgrowerAppRoutes: Routes = [
  {
    path: 'manage',
    component: OutgrowerAppComponent,
    // canActivate: [AuthGuard, AccessGuard], TODO
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'map',
        component: DriversMapComponent
      },
      {
        path: 'group',
        component: GroupComponent
      },
      ...FarmerRoutes,
      ...UserFeedbackRoutes,
      ...DeliveryRoutes,
      ...RouteRoutes,
      ...DamageRoutes,
      ...ReportRoutes
    ]
  },
  {
    path: 'driver',
    component: OutgrowerAppComponent,
    // canActivate: [AuthGuard, AccessGuard], TODO
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardDriverComponent
      },
      ...DeliveryRoutes
    ]
  }
];
