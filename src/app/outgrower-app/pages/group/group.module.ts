import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
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
    MatNativeDateModule
} from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';

import { GroupService } from '../../../shared/service/group.service';
import { SubgroupService } from '../../../shared/service/subgroup.service';

import { GroupComponent } from './group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { SubgroupListComponent } from './subgroup-list/subgroup-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
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
    ],
    declarations: [
        GroupComponent,
        GroupListComponent,
        SubgroupListComponent
    ],
    providers: [
        GroupService,
        SubgroupService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class GroupModule { }
