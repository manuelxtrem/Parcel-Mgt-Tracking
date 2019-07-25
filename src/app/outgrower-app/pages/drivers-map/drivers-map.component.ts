import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Marker,
  Person,
  Result,
  ResponsiveButton
} from '../../../shared/model';
import { PersonService } from '../../../shared/service/person.service';
import { Manipulation } from '../../../shared/codes/manipulation';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-drivers-map',
  templateUrl: './drivers-map.component.html',
  styleUrls: ['./drivers-map.component.css']
})
export class DriversMapComponent implements OnInit, OnDestroy {
  latitude = 0;
  longitude = 0;
  filter: string;
  markers: Marker[];
  pageIndex = 0;
  pageSize = 50;
  loading = false;
  timer: any;
  driversAsync: Observable<Result<Person>>;
  actionButtons: ResponsiveButton[];

  @ViewChild('filterInput') filterInput: ElementRef;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.actionButtons = [
      {
        title: 'Show On Map',
        icon: 'location_on',
        callback: (data: number) => {
          this.showDriver(data);
        }
      }
    ];

    this.timer = setInterval(() => {
      this.getDriversOnTrack();
    }, 30 * 1000);

    this.getDriversOnTrack();

    Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(() => {
        this.filter = this.filterInput.nativeElement.value;
        this.getDriversOnTrack();
      });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getDriversOnTrack() {
    this.loading = true;
    this.driversAsync = this.personService.getDriversOnTrack(
      this.pageIndex,
      this.pageSize,
      this.filter
    );
    this.driversAsync.subscribe(
      result => {
        // generate markers with popup details
        this.markers = [];
        let i = 0;
        result.data.forEach(driver => {
          this.markers.push({
            label: this.getInitials(i),
            latitude: driver.locationLat,
            longitude: driver.locationLong,
            icon: '',
            popupDetails: {
              title: driver.fullName,
              details: [
                {
                  key: 'Vehicle Number',
                  value: driver.vehicleNo
                },
                {
                  key: 'Vehicle Description',
                  value: driver.vehicleDescription
                }
              ]
            }
          });

          // increment
          i++;
        });
        console.log('markers', this.markers);
      },
      error => {
        console.log('error', error);
      },
      () => {
        this.loading = false;
      }
    );
  }

  getInitials(i: number) {
    return Manipulation.getCharAtIndex(i);
  }

  onPage(event) {
    console.log('onPage-event', event);
    this.pageIndex = +event.pageIndex;
    this.pageSize = +event.pageSize;
    this.getDriversOnTrack();
  }

  showDriver(index: number) {
    // TODO show on map
    this.latitude = this.markers[index].latitude;
    this.longitude = this.markers[index].longitude;
  }
}
