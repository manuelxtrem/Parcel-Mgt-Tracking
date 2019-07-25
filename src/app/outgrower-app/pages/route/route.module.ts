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
    MatTooltipModule,
    MatSpinner,
    MatProgressSpinnerModule
} from '@angular/material';
import {
    MatDialogModule,
    MatDialog,
    MatDialogRef
} from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { StickyModule } from 'ng2-sticky-kit';

import { ListModule } from '../../../shared/directive/list/list.module';

import { RouteComponent } from './route.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteService } from '../../../shared/service/route.service';
import { RouteDetailsComponent } from './route-details/route-details.component';

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
        MatTooltipModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        StickyModule,
        ListModule
    ],
    declarations: [
        RouteComponent,
        RouteListComponent,
        RouteDetailsComponent
    ],
    entryComponents: [
        RouteDetailsComponent
    ],
    providers: [
        RouteService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class RouteModule { }
