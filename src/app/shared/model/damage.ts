import { Person, Parcel } from './';

export class Damage {
  id: number;
  customer?: Person;
  customerId: number;
  parcel?: Parcel;
  parcelId: number;
  comment: string;
  resolved: boolean;
  dateCreated?: Date;
}
