import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../../../shared/guard';
import { UserFeedbackComponent } from './user-feedback.component';

import { UserFeedbackListComponent } from './user-feedback-list/user-feedback-list.component';

export const UserFeedbackRoutes: Routes = [
    {
        path: 'feedback', component: UserFeedbackComponent,
        children: [
            {
                path: '',
                component: UserFeedbackListComponent,
                canActivate: [AuthGuard, AccessGuard]
            }
        ]
    }
];
