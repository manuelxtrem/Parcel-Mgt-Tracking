import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
} from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { StickyModule } from 'ng2-sticky-kit';

import { FeedbackService } from '../../../shared/service/feedback.service';

import { ListModule } from '../../../shared/directive/list/list.module';

import { UserFeedbackComponent } from './user-feedback.component';
import { UserFeedbackDetailsComponent } from './user-feedback-details/user-feedback-details.component';
import { UserFeedbackListComponent } from './user-feedback-list/user-feedback-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatListModule,
        MatFormFieldModule,
        MatButtonModule,
        StickyModule,
        ListModule
    ],
    declarations: [
        UserFeedbackComponent,
        UserFeedbackListComponent,
        UserFeedbackDetailsComponent
    ],
    providers: [
        FeedbackService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class UserFeedbackModule { }
