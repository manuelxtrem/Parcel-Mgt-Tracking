export class MapPopup {
  title: string;
  details: PopupDetails[];

  constructor() {
    this.title = '';
    this.details = [];
  }
}

export class PopupDetails {
  key: string;
  value: string;
}
