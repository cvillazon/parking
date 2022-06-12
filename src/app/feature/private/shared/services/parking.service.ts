import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(protected http:HttpService) { }

  createReservation(reservation:any){
    return this.http.doPost(`${environment.endpoint}/parking`,reservation);
  }

  deleteReservation(reservationId:number){
    return this.http.doDelete(`${environment.endpoint}/parking/${reservationId}`);
  }

  loadReservation(time:number){
    return this.http.doGet(`${environment.endpoint}/parking/?timeEnd_gte=${time}`);
  }
}
