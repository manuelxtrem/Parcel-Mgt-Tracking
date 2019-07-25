import { MapPopup } from './map-popup';

export class Location {
  coords: Coords | null;
  timestamp: number | null;

  constructor() {
    this.coords = new Coords();
    this.timestamp = null;
  }
}

export class Route {
  id?: number;
  details?: string;
  source: string;
  sourceLat: number;
  sourceLong: number;
  destination: string;
  destinationLat: number;
  destinationLong: number;

  constructor() {
    this.id = 0;
    this.details = '';
    this.source = '';
    this.sourceLat = 0;
    this.sourceLong = 0;
    this.destination = '';
    this.destinationLat = 0;
    this.destinationLong = 0;
  }
}

export class Coords {
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  latitude: number;
  longitude: number;
  speed?: number | null;

  constructor() {
    this.accuracy = 0;
    this.altitude = 0;
    this.altitudeAccuracy = 0;
    this.heading = 0;
    this.latitude = 0;
    this.longitude = 0;
    this.speed = 0;
  }
}

export class GPSLocation {
  place?: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;

  constructor() {
    this.place = '';
    this.latitude = 0;
    this.longitude = 0;
    this.altitude = 0;
    this.accuracy = 0;
  }
}

export class Marker {
  label: string;
  latitude: number;
  longitude: number;
  icon?: string;
  popupDetails?: MapPopup;

  constructor() {
    this.label = '';
    this.latitude = 0;
    this.longitude = 0;
    this.icon = '';
    this.popupDetails = new MapPopup();
  }
}
