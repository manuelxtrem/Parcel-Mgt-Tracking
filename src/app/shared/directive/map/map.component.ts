import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Marker } from '../../model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() markers: Marker[];
  @Input() editMode: boolean;
  @Input() longitude = 0;
  @Input() latitude = 0;
  @Input() initialBounds: any;
  @Input() zoom = 15;

  @Output() mapClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.initialBounds == null) {
      // TODO should we limit the bounds?
      // this.initialBounds = {
      //     east: 6.769182971307491,
      //     north: 6.624266353009146,
      //     west: -1.7556136862106086,
      //     south: -1.5139144674606086
      // };
    }

    if (
      !this.latitude &&
      !this.longitude &&
      this.markers &&
      this.markers.length > 0
    ) {
      console.log('setting default location');
      this.latitude = +this.markers[0].latitude;
      this.longitude = +this.markers[0].longitude;
    }
  }

  clickedMarker(index: number) {}

  onBoundsChanged(bounds) {
    // console.log('bounds', bounds)
  }
}
