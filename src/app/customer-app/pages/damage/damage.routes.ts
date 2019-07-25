import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../../../shared/guard';
import { DamageComponent } from './damage.component';
import { DamageListComponent } from './damage-list/damage-list.component';

export const DamageRoutes: Routes = [
    {
        path: 'damage',
        component: DamageComponent,
        canActivate: [AuthGuard, AccessGuard],
        children: [
            {
                path: '',
                component: DamageListComponent,
                canActivate: [AuthGuard, AccessGuard]
            }
        ]
    }
];
