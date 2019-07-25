import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../../../shared/guard';
import { RouteComponent } from './route.component';

import { RouteListComponent } from './route-list/route-list.component';
// import { RouteDetailsComponent } from './route-details/route-details.component';

export const RouteRoutes: Routes = [
    {
        path: 'route', component: RouteComponent,
        children: [
            {
                path: '',
                component: RouteListComponent,
                canActivate: [AuthGuard, AccessGuard]
            // },
            // {
            //     path: 'details/:id',
            //     component: RouteDetailsComponent,
            //     canActivate: [AuthGuard, AccessGuard]
            }
        ]
    }
];
