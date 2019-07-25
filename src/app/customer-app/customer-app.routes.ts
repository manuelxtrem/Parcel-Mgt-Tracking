import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../shared/guard';

import { CustomerAppComponent } from './customer-app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ParcelRoutes } from './pages/parcel/parcel.routes';
import { FeedbackRoutes } from './pages/feedback/feedback.routes';
import { DamageRoutes } from './pages/damage/damage.routes';

export const CustomerAppRoutes: Routes = [
  {
    path: 'customer',
    component: CustomerAppComponent,
    canActivate: [AuthGuard, AccessGuard],
    children: [
      {
        path: '',
        redirectTo: 'track',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      ...ParcelRoutes,
      ...FeedbackRoutes,
      ...DamageRoutes
    ]
  }
];
