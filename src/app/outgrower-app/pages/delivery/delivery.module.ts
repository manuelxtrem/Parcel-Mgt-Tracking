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
  MatProgressSpinnerModule,
  MatChipsModule
} from '@angular/material';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { StickyModule } from 'ng2-sticky-kit';
import { QRCodeModule } from 'angularx-qrcode';

import { ListModule } from '../../../shared/directive/list/list.module';

import { DeliveryComponent } from './delivery.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { ParcelService } from '../../../shared/service/parcel.service';
import { MapPickerService } from '../../../shared/service/map-picker.service';

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
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    StickyModule,
    QRCodeModule,
    ListModule
  ],
  declarations: [
    DeliveryComponent,
    DeliveryListComponent,
    DeliveryDetailsComponent,
    DeliveryInfoComponent
  ],
  entryComponents: [DeliveryDetailsComponent, DeliveryInfoComponent],
  providers: [ParcelService, MapPickerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryModule {}
