import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../../../shared/guard';
import { DeliveryComponent } from './delivery.component';

import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';

export const DeliveryRoutes: Routes = [
    {
        path: 'parcel', component: DeliveryComponent,
        children: [
            {
                path: ':parcelStatus',
                component: DeliveryListComponent,
                canActivate: [AuthGuard, AccessGuard]
            },
            {
                path: 'driver',
                component: DeliveryListComponent,
                canActivate: [AuthGuard, AccessGuard]
            },
            {
                path: 'driver/:driverId',
                component: DeliveryListComponent,
                canActivate: [AuthGuard, AccessGuard]
            }
        ]
    }
];
