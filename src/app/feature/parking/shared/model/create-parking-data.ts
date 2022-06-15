import { Parking } from "./parking";

export class CreateParking {
  spot: number;
  cars: Parking[];
  basePrice: number;
  dominical: number;
  onDemand: number;

  base(hours: number) {
    return this.basePrice * hours ?? 0;
  }
  extraOnDemand(hours: number) {
    return this.onDemand * hours ?? 0;
  }

  extraWeekend(hours: number) {
    return this.dominical * hours ?? 0;
  }

  totalPrice(hours) {
    return (
      this.basePrice + this.extraOnDemand(hours) + this.extraWeekend(hours)
    );
  }
}
