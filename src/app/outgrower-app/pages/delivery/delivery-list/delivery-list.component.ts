import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/service/alert.service';
import { ParcelService } from '../../../../shared/service/parcel.service';
import { NotyService } from '../../../../shared/service/noty.service';
import {
  Result,
  Parcel,
  ResponsiveButton,
  ParcelStatus,
  Route,
  Person
} from '../../../../shared/model';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeliveryDetailsComponent } from '../delivery-details/delivery-details.component';
import { LoginService } from '../../../../shared/service/login.service';
import { DeliveryInfoComponent } from '../delivery-info/delivery-info.component';
import { QrScannerService } from '../../../../shared/service/qr-scanner.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {
  loading: boolean;
  showFab: boolean;
  driverId: number;
  qrCodeConcat = 'thisistheparcelidtoobescannedfordatatoberetrievedonit:';
  pageIndex = 0;
  pageSize = 10;
  fabOpen = false;
  filter: string;
  parcelStatus: string;
  selectedGroupId: number;
  selectedGroupName: string;
  parcels: Parcel[];
  deliveriesAsync: Observable<Result<Parcel>>;
  // actionButtons: ResponsiveButton[];
  newButtons: ResponsiveButton[];
  arrivalButtons: ResponsiveButton[];
  deliveredButtons: ResponsiveButton[];
  transportingButtons: ResponsiveButton[];

  @ViewChild('filterInput') filterInput: ElementRef;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private dialog: MatDialog,
    public parcelService: ParcelService,
    public loginService: LoginService,
    private qrScanner: QrScannerService,
    public noty: NotyService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.arrivalButtons = [
      {
        title: 'Details',
        icon: 'info_outline',
        callback: (data: Parcel) => {
          this.onParcelSelect(data);
        }
      },
      {
        title: 'Deliver',
        icon: 'check_circle',
        callback: data => {
          this.onParcelDelivered(data);
        }
      }
    ];
    this.deliveredButtons = [
      {
        title: 'Details',
        icon: 'info_outline',
        callback: (data: Parcel) => {
          this.onParcelSelect(data);
        }
      }
    ];

    this.transportingButtons = [
      {
        title: 'Details',
        icon: 'info_outline',
        callback: (data: Parcel) => {
          this.onParcelSelect(data);
        }
      }
    ];

    this.newButtons = [
      {
        title: 'Details',
        icon: 'info_outline',
        callback: (data: Parcel) => {
          this.onParcelSelect(data);
        }
      },
      {
        title: 'Delete',
        icon: 'delete_forever',
        color: 'warning',
        callback: (data: Parcel) => {
          this.onParcelDelete(data);
        }
      }
    ];

    this.aRoute.params.subscribe(params => {
      // if user is driver then set id
      if (this.loginService.isDriver()) {
        this.driverId = this.loginService.getUserProfile().id;
        // this.actionButtons = [];
      } else {
        // when driverId is set ...
        if (+params['driverId']) {
          this.driverId = +params['driverId'];

          // remove delivered button
          //   if (this.actionButtons.length > 2) {
          //     this.actionButtons.splice(1, 1);
          //   }
        } else {
          // use parcel type
          this.parcelStatus = params['parcelStatus'];

          if (
            this.parcelStatus === ParcelStatus.ARRIVALS &&
            this.loginService.isAdmin()
          ) {
            // if (this.actionButtons.length === 2) {
            //   this.actionButtons.splice(1, 0, this.arrivalDeliveryButton);
            // }
          } else {
            // if (this.actionButtons.length > 2) {
            //   this.actionButtons.splice(1, 1);
            // }
          }
        }
      }

      this.getDeliveries();
    });

    Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(() => {
        this.filter = this.filterInput.nativeElement.value;
        this.getDeliveries();
      });
  }

  getParcelType() {
    if (this.driverId) {
      return 'for driver';
    } else {
      return (
        this.parcelStatus.charAt(0).toUpperCase() + this.parcelStatus.substr(1)
      );
    }
  }

  getDeliveries() {
    if (this.driverId) {
      this.deliveriesAsync = this.parcelService.getDriverParcels(
        this.driverId,
        this.pageIndex,
        this.pageSize,
        this.filter
      );
    } else {
      this.deliveriesAsync = this.parcelService.getStatusParcels(
        this.parcelStatus,
        this.pageIndex,
        this.pageSize,
        this.filter
      );
    }

    this.deliveriesAsync.subscribe(result => {
      this.parcels = result.data;
    });
  }

  onPage(event) {
    console.log('onPage-event', event);
    this.pageIndex = +event.pageIndex;
    this.pageSize = +event.pageSize;
    this.getDeliveries();
  }

  onParcelSelect(parcel: Parcel) {
    if (!this.loginService.isAdmin()) {
      return;
    }

    const dialogRef = this.dialog.open(DeliveryInfoComponent, {
      width: '350px',
      data: {
        parcel: JSON.parse(JSON.stringify(parcel))
      }
    });
  }

  onParcelDelete(parcel: Parcel) {
    // confirm delete
    this.alertService.confirm({
      title: 'Are you sure',
      message: 'Do you want to delete this delivery?',
      confirmText: 'DELETE',
      confirmColor: 'warn',
      callback: result => {
        if (result) {
          this.deleteParcel(parcel.id);
        }
      }
    });
  }

  deleteParcel(Id: number) {
    let response;
    this.loading = true;

    // delete delivery
    this.parcelService.deleteParcel(Id).subscribe(
      data => (response = data),
      error => {
        console.log(error);
        this.loading = false;
        // confirm retry delete
        this.alertService.confirm({
          title: 'An error occurred',
          message: 'Try to delete again?',
          callback: status => {
            if (status) {
              this.deleteParcel(Id);
            }
          }
        });
      },
      () => {
        this.loading = false;
        this.noty.alert(`The delivery has been deleted successfully`);
        this.getDeliveries();
      }
    );
  }

  onParcelDelivered(parcel: Parcel) {
    // confirm delete
    this.alertService.confirm({
      title: 'Are you sure',
      message: 'Do you want to set this as DELIVERED?',
      confirmText: 'YES',
      confirmColor: 'warn',
      cancelText: 'NO',
      callback: result => {
        if (result) {
          this.deliverParcel(parcel.id);
        }
      }
    });
  }

  deliverParcel(parcelId) {
    this.loading = true;
    this.parcelService.editParcelDelivered(parcelId).subscribe(
      result => {},
      error => {
        console.error(error);
        this.loading = false;
        this.alertService.confirm({
          title: 'An error occurred',
          message:
            'Could not set this parcel as delivered! Do you want to try again.',
          confirmText: 'RETRY',
          callback: result => {
            if (result) {
              this.onParcelDelivered(parcelId);
            }
          }
        });
      },
      () => {
        this.loading = false;
        this.getDeliveries();
        this.noty.alert(`The parcel has been set as delivered.`);
      }
    );
  }

  onAddClick() {
    const dialogRef = this.dialog.open(DeliveryDetailsComponent, {
      width: '350px',
      data: {
        editMode: false,
        parcel: {
          id: 0,
          description: '',
          date: new Date(),
          status: ParcelStatus.TRANSPORTING,
          senderId: 0,
          sender: new Person(),
          recipientId: 0,
          recipient: new Person(),
          driverId: this.driverId,
          driver: new Person(),
          eta: 0,
          routeId: 0,
          route: new Route()
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDeliveries();
      }
    });
  }

  startQRDelivery() {
    this.qrScanner.open().subscribe(code => {
      console.log('resulting code', code);
      if (code) {
        this.onScanResult(code);
      }
    });
  }

  onScanResult(id: string) {
    console.log('entered parcel scan');

    // logic
    if (id && id.indexOf(this.qrCodeConcat) !== -1) {
      id.replace(this.qrCodeConcat, '');
    }

    const parcelId = +id;

    console.log('decode2', id);

    if (parcelId === 0) {
      this.alertService.alert({
        title: 'Warning',
        message: 'This code is invalid. Please scan a different code.'
      });
      return;
    }

    this.deliverParcel(parcelId);
  }

  generateParcelQR(parcelId: number) {
    return this.qrCodeConcat + parcelId;
  }
}
