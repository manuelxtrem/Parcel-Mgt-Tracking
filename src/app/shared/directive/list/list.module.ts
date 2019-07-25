import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import {
  MatIconModule,
  MatPaginatorModule
} from '@angular/material';
import { SharedModule } from '../../shared.module';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { MainTemplateDirective } from './Directives/main-template.directive';
import { TemplateWrapperDirective } from './Directives/template-wrapper.directive';
import { DataViewLoadDirective } from './Directives/data-view-load.directive';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        MatIconModule,
        MatPaginatorModule,
        SharedModule

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
    ],
    declarations: [
        MainTemplateDirective,
        TemplateWrapperDirective,
        DataViewLoadDirective,
        ListComponent,
        ListItemComponent
    ],
    exports: [
        MainTemplateDirective,
        TemplateWrapperDirective,
        DataViewLoadDirective,
        ListComponent,
        ListItemComponent
    ]
})
export class ListModule { }
