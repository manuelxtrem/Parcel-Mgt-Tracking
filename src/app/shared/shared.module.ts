import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatCardModule,
  MatIconModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatPaginatorModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatProgressSpinner
} from '@angular/material';
import { CameraService } from './service/camera.service';
import { LoginService } from './service/login.service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AuthService } from './service/auth.service';
import { AccessGuard, AuthGuard, PermissionGuard } from './guard';
import { LayoutComponent } from './directive/layout/layout.component';
import {
  AlertDialogComponent,
  ConfirmDialogComponent,
  InputDialogComponent,
  LoadingDialogComponent
} from './directive/alert';
import { DataTableComponent } from './directive/datatable/datatable.component';
import { AlertService } from './service/alert.service';
import { ResponsiveButtonsComponent } from './directive/responsive-buttons/responsive-buttons.component';
import { NotyService } from './service/noty.service';
import { PersonDetailComponent } from './directive/person-detail/person-detail.component';
import { PersonFamilyComponent } from './directive/person-family/person-family.component';
import { PersonEduComponent } from './directive/person-edu/person-edu.component';
import { PersonEduEditComponent } from './directive/person-edu/person-edu-edit/person-edu-edit.component';
import { PersonFamilyEditComponent } from './directive/person-family/person-family-edit/person-family-edit.component';
import { LoadingOverlayComponent } from './directive/loading-overlay/loading-overlay.component';
import { ImageCropperComponent } from './directive/image-cropper/image-cropper.component';
import { CopperDialogComponent } from './directive/image-cropper/shared/cropper-dialog/cropper-dialog.component';
import { ImgComponent } from './directive/img/img.component';
import { DoubleLayoutComponent } from './directive/double-layout/double-layout.component';
import { DefaultPlaceholderComponent } from './directive/default-placeholder/default-placeholder.component';
import { MapComponent } from './directive/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { InitialsAvatarComponent } from './directive/initials-avatar/initials-avatar.component';
import { CapitalizePipe } from './pipe/capitalize.pipe';
import { SecondsTimePipe } from './pipe/secondstime.pipe';
import { FabComponent } from './directive/fab/fab.component';
import { StarComponent } from './directive/star/star.component';
import { CircleProgressComponent } from './directive/circle-progress/circle-progress.component';
import { PersonLoginComponent } from './directive/person-login/person-login.component';
import { TypeaheadComponent } from './directive/typeahead/typeahead.component';
import { MapPickerComponent } from './directive/map-picker/map-picker.component';
import { IconsService } from './service/icons.service';
import { GPSService } from './service/gps.service';
import { PrinterComponent } from './directive/printer/printer.component';
import { QrScannerComponent } from './directive/qr-scanner/qr-scanner.component';
import { QrScannerService } from './service/qr-scanner.service';
import { MapPopupComponent } from './directive/map/map-popup/map-popup.component';
import { SmdFabSpeedDialTrigger, SmdFabSpeedDialActions, SmdFabSpeedDialComponent } from './directive/smd-fab-speed-dial';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2RupriZn_reNJ1dRcuPNh4kf0oUGANnQ',
      libraries: ['places']
    }),
    ZXingScannerModule.forRoot(),
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatNativeDateModule
  ],
  declarations: [
    LayoutComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    InputDialogComponent,
    LoadingDialogComponent,
    DataTableComponent,
    ResponsiveButtonsComponent,
    PersonDetailComponent,
    PersonFamilyComponent,
    PersonEduComponent,
    PersonEduEditComponent,
    PersonFamilyEditComponent,
    LoadingOverlayComponent,
    ImageCropperComponent,
    CopperDialogComponent,
    ImgComponent,
    DoubleLayoutComponent,
    DefaultPlaceholderComponent,
    MapComponent,
    InitialsAvatarComponent,
    CapitalizePipe,
    SecondsTimePipe,
    FabComponent,
    StarComponent,
    CircleProgressComponent,
    PersonLoginComponent,
    TypeaheadComponent,
    MapPickerComponent,
    PrinterComponent,
    QrScannerComponent,
    MapPopupComponent,
    SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    LayoutComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    InputDialogComponent,
    LoadingDialogComponent,
    DataTableComponent,
    ResponsiveButtonsComponent,
    PersonDetailComponent,
    PersonFamilyComponent,
    PersonEduComponent,
    PersonEduEditComponent,
    PersonFamilyEditComponent,
    LoadingOverlayComponent,
    ImageCropperComponent,
    CopperDialogComponent,
    ImgComponent,
    DoubleLayoutComponent,
    DefaultPlaceholderComponent,
    MapComponent,
    InitialsAvatarComponent,
    CapitalizePipe,
    SecondsTimePipe,
    FabComponent,
    StarComponent,
    CircleProgressComponent,
    PersonLoginComponent,
    TypeaheadComponent,
    MapPickerComponent,
    PrinterComponent,
    QrScannerComponent,
    MapPopupComponent,
    SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent,
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    InputDialogComponent,
    LoadingDialogComponent,
    PersonEduEditComponent,
    PersonFamilyEditComponent,
    CopperDialogComponent,
    MapPickerComponent,
    QrScannerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard, AccessGuard, PermissionGuard]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        LoginService,
        GPSService,
        IconsService,
        AuthService,
        AlertService,
        CameraService,
        NotyService,
        QrScannerService
      ]
    };
  }
}
