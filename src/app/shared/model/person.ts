export class Person {
  id: number;
  fullName: string;
  surname: string;
  othername: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  personType: string;
  mobileOne: string;
  mobileTwo: string;
  locationLat?: number;
  locationLong?: number;
  vehicleNo?: string;
  vehicleDescription?: string;
  qrHash?: string;
  trackingOn?: boolean;

  constructor() {
    this.id = 0;
    this.fullName = '';
    this.surname = '';
    this.othername = '';
    this.email = '';
    this.gender = '';
    this.dateOfBirth = new Date();
    this.address = '';
    this.city = '';
    this.personType = '';
    this.mobileOne = '';
    this.mobileTwo = '';
    this.vehicleNo = '';
    this.vehicleDescription = '';
    this.qrHash = '';
    this.trackingOn = false;
  }
}
