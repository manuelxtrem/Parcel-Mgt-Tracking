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
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatGridListModule,
    MatExpansionModule,
    MatNativeDateModule
} from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { StickyModule } from 'ng2-sticky-kit';

import { PersonService } from '../../../shared/service/person.service';
import { EducationService } from '../../../shared/service/education.service';

import { ListModule } from '../../../shared/directive/list/list.module';

import { FarmerComponent } from './farmer.component';
import { FarmerListComponent } from './farmer-list/farmer-list.component';
import { FarmerDetailsComponent } from './farmer-details/farmer-details.component';
import { FarmerAddComponent } from './farmer-add/farmer-add.component';

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
        MatSidenavModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatGridListModule,
        MatExpansionModule,
        MatNativeDateModule,
        StickyModule,
        ListModule
    ],
    declarations: [
        FarmerComponent,
        FarmerListComponent,
        FarmerDetailsComponent,
        FarmerAddComponent
    ],
    providers: [
        PersonService,
        EducationService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class FarmerModule { }
