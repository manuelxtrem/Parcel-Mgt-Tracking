import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../../../shared/guard';
import { FarmerComponent } from './farmer.component';

import { FarmerListComponent } from './farmer-list/farmer-list.component';
import { FarmerDetailsComponent } from './farmer-details/farmer-details.component';
import { FarmerAddComponent } from './farmer-add/farmer-add.component';

export const FarmerRoutes: Routes = [
  {
    path: 'people',
    component: FarmerComponent,
    children: [
      {
        path: ':personType',
        component: FarmerListComponent,
        canActivate: [AuthGuard, AccessGuard]
      },
      {
        path: ':personType/details/add',
        component: FarmerAddComponent,
        canActivate: [AuthGuard, AccessGuard]
      },
      {
        path: ':personType/details/:id',
        component: FarmerDetailsComponent,
        canActivate: [AuthGuard, AccessGuard]
      }
    ]
  }
];
