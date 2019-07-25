import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAppComponent } from './customer-app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { ParcelModule } from './pages/parcel/parcel.module';
import { FeedbackModule } from './pages/feedback/feedback.module';
import { DamageModule } from './pages/damage/damage.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatCardModule,
        MatProgressSpinnerModule,
        ParcelModule,
        FeedbackModule,
        DamageModule
    ],
    declarations: [
        CustomerAppComponent,
        DashboardComponent
    ]
})
export class CustomerAppModule { }
