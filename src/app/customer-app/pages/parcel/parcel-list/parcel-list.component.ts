import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/service/alert.service';
import { ParcelService } from '../../../../shared/service/parcel.service';
import { NotyService } from '../../../../shared/service/noty.service';
import {
  Result,
  Parcel,
  ParcelStatus,
  ResponsiveButton
} from '../../../../shared/model';
import { Observable } from 'rxjs/Rx';
import { LoginService } from '../../../../shared/service/login.service';
import { MatDialog } from '@angular/material';
import { ParcelInfoComponent } from '../parcel-info/parcel-info.component';
import { DamageDetailsComponent } from '../../damage/damage-details/damage-details.component';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.css']
})
export class ParcelListComponent implements OnInit, OnDestroy {
  loading: boolean;
  pageIndex = 0;
  pageSize = 10;
  personId: number;
  filter: string;
  selectedGroupId: number;
  selectedGroupName: string;
  parcelsAsync: Observable<Result<Parcel>>;
  actionButtons: ResponsiveButton[];
  deliveredButtons: ResponsiveButton[];
  timer: any;

  @ViewChild('filterInput') filterInput: ElementRef;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private aRoute: ActivatedRoute,
    public loginService: LoginService,
    public parcelService: ParcelService,
    public notyService: NotyService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.personId = this.loginService.getUserProfile().id;

    this.actionButtons = [
      {
        title: 'Details',
        icon: 'info_outline',
        callback: (data: Parcel) => {
          this.onParcelSelect(data);
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
      },
      {
        title: 'Report',
        icon: 'cancel_circle',
        callback: (data: Parcel) => {
          this.onParcelDamaged(data);
        }
      }
    ];

    this.aRoute.params.subscribe(params => {
      this.getParcels();
    });

    this.timer = setInterval(() => {
      this.getParcels();
    }, 30000);

    Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(() => {
        this.filter = this.filterInput.nativeElement.value;
        this.getParcels();
      });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getInitials(parcel: Parcel): string {
    return parcel.id + ''.charAt(0);
  }

  onParcelSelect(parcel: Parcel) {
    const dialogRef = this.dialog.open(ParcelInfoComponent, {
      width: '350px',
      data: {
        personId: this.loginService.getUserProfile().id,
        parcel: JSON.parse(JSON.stringify(parcel))
      }
    });
  }

  onParcelDamaged(parcel: Parcel) {
    const dialogRef = this.dialog.open(DamageDetailsComponent, {
      width: '350px',
      data: {
        damage: {
          customerId: this.loginService.getUserProfile().id,
          parcel: JSON.parse(JSON.stringify(parcel)),
          parcelId: parcel.id,
          comment: ''
        }
      }
    });
  }

  getParcels() {
    this.parcelsAsync = this.parcelService.getParcels(
      this.personId,
      this.pageIndex,
      this.pageSize,
      this.filter
    );
  }

  getETA(seconds: number) {
    console.log('seconds', seconds);
    return '50 mins';
  }

  onPage(event) {
    this.pageIndex = +event.pageIndex;
    this.pageSize = +event.pageSize;
    this.getParcels();
  }
}
