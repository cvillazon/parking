export class Parking {
  spot: number;
  carType: string;
  owner: string;
  hour: number;
  license: string;
  date: string;
  dateEnd: string;
  timeStart: number;
  timeEnd: number;
  id?: number;
  serviceOut = false;
  frecuency?: any;
  totalPrice?: number;
}