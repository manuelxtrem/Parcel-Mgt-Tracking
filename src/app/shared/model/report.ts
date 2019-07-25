export class SummaryReport {
  delivery: Delivery;
  rating: Rating;

  constructor() {
    this.delivery = new Delivery();
    this.rating = new Rating();
  }
}

export class Delivery {
  satisfaction: number;
  deliveries: number;
  damages: number;
  damagesResolved: number;

  constructor() {
    this.satisfaction = 0;
    this.deliveries = 0;
    this.damages = 0;
    this.damagesResolved = 0;
  }
}

export class Rating {
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  total: number;

  constructor() {
    this.rate1 = 0;
    this.rate2 = 0;
    this.rate3 = 0;
    this.rate4 = 0;
    this.rate5 = 0;
    this.total = 0;
  }
}
