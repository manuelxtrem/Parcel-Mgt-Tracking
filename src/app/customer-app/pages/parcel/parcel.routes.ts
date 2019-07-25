import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../../../shared/guard';
import { ParcelComponent } from './parcel.component';
import { ParcelListComponent } from './parcel-list/parcel-list.component';

export const ParcelRoutes: Routes = [
    {
        path: 'track',
        component: ParcelComponent,
        canActivate: [AuthGuard, AccessGuard],
        children: [
            {
                path: 'list',
                component: ParcelListComponent,
                canActivate: [AuthGuard, AccessGuard]
            }
        ]
    }
];
