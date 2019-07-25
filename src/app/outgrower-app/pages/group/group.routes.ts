import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../../../shared/guard';
import { GroupComponent } from './group.component';

import { GroupListComponent } from './group-list/group-list.component';

export const GroupRoutes: Routes = [
    {
        path: 'group', component: GroupComponent,
        children: [
            {
                path: '',
                component: GroupListComponent,
                canActivate: [AuthGuard, AccessGuard]
            }
        ]
    }
];
