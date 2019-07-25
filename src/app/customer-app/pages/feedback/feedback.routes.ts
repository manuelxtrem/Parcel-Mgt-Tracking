import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AccessGuard } from '../../../shared/guard';
import { FeedbackComponent } from './feedback.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';

export const FeedbackRoutes: Routes = [
    {
        path: 'feedback',
        component: FeedbackComponent,
        canActivate: [AuthGuard, AccessGuard],
        children: [
            {
                path: '',
                component: FeedbackListComponent,
                canActivate: [AuthGuard, AccessGuard]
            }
        ]
    }
];
