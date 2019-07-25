import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule
} from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { StickyModule } from 'ng2-sticky-kit';

import { ParcelService } from '../../../shared/service/parcel.service';

import { ListModule } from '../../../shared/directive/list/list.module';

import { ParcelComponent } from './parcel.component';
import { ParcelListComponent } from './parcel-list/parcel-list.component';
import { ParcelInfoComponent } from './parcel-info/parcel-info.component';
// import { FarmerListComponent } from './farmer-list/farmer-list.component';
// import { FarmerDetailsComponent } from './farmer-details/farmer-details.component';

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
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatChipsModule,
        MatSidenavModule,
        MatTooltipModule,
        MatSnackBarModule,
        StickyModule,
        ListModule
    ],
    declarations: [
        ParcelComponent,
        ParcelListComponent,
        ParcelInfoComponent
        // FarmerListComponent,
        // FarmerDetailsComponent
    ],
    entryComponents: [
      ParcelInfoComponent
    ],
    providers: [
        ParcelService,
        // EducationService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ParcelModule { }
