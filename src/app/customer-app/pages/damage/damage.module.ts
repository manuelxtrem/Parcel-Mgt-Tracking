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

import { DamageService } from '../../../shared/service/damage.service';

import { ListModule } from '../../../shared/directive/list/list.module';

import { DamageComponent } from './damage.component';
import { DamageListComponent } from './damage-list/damage-list.component';
import { DamageDetailsComponent } from './damage-details/damage-details.component';

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
        DamageComponent,
        DamageListComponent,
        DamageDetailsComponent
    ],
    entryComponents: [
        DamageDetailsComponent
    ],
    providers: [
        DamageService,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DamageModule { }
