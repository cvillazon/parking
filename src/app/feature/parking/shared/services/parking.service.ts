import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Parking } from '../model/parking';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(protected http: HttpService) { }

  createReservation(reservation: Parking){
    return this.http.doPost(`${environment.endpoint}/parking`,reservation);
  }

  deleteReservation(reservationId: number){
    return this.http.doPatch(`${environment.endpoint}/parking/${reservationId}`,{serviceOut:true});
  }

  loadReservation(time: number){
    return this.http.doGet(`${environment.endpoint}/parking/?timeEnd_gte=${time}&serviceOut_ne=true`);
  }
  
  loadAllReservation(){
    return this.http.doGet(`${environment.endpoint}/parking`);
  }
}
