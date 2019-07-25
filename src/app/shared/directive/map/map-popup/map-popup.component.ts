import { Component, OnInit, Input } from '@angular/core';
import { MapPopup } from '../../../model';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css']
})
export class MapPopupComponent implements OnInit {
  @Input() details: MapPopup;

  constructor() {
    this.details = new MapPopup();
  }

  ngOnInit() {}
}
