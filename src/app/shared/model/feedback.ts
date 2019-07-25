import { Person } from './';

export class Feedback {
    id: number;
    customer?: Person;
    customerId: number;
    rating: number;
    comment: string;
    dateCreated?: Date;
}
