import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
} from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { StickyModule } from 'ng2-sticky-kit';

import { FeedbackService } from '../../../shared/service/feedback.service';

import { ListModule } from '../../../shared/directive/list/list.module';

import { FeedbackComponent } from './feedback.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressBarModule,
        StickyModule,
        ListModule
    ],
    declarations: [
        FeedbackComponent,
        FeedbackListComponent,
        FeedbackDetailsComponent
    ],
    entryComponents: [
        FeedbackDetailsComponent
    ],
    providers: [
        FeedbackService,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class FeedbackModule { }
