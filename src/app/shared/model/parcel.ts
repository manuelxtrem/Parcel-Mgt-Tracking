import { Route, Person } from './';

export class Parcel {
  id: number;
  description: string;
  date: Date;
  status: string;
  sender?: Person;
  senderId?: number;
  recipient?: Person;
  recipientId?: number;
  driverId?: number;
  driver?: Person;
  eta: number;
  routeId?: number;
  route?: Route;
  weight: number;
  value: number;
  insurance: number;
  charge: number;
  dateCreated?: Date;
  dateModified?: Date;
}

export class ParcelStatus {
  public static get ALL(): string {
    return 'all';
  }
  public static get NEW(): string {
    return 'new';
  }
  public static get ARRIVALS(): string {
    return 'arrivals';
  }
  public static get TRANSPORTING(): string {
    return 'transporting';
  }
  public static get DELIVERED(): string {
    return 'delivered';
  }
}
