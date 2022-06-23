import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LicenseHistory } from '../model/license-history';
import { Parking } from '../model/parking';
import { formatDateGlobal } from '../utils/format-date';

@Injectable()
export class ParkingService {
  
  public formatDateTime = new Intl.DateTimeFormat('en', formatDateGlobal);
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
  
  loadAllReservation():Observable<Parking[]>{
    return this.http.doGet(`${environment.endpoint}/parking`);
  }

  loadAllLicensePlates():Observable<any[]>{
    return this.http.doGet(`${environment.endpoint}/parking`).pipe(
      map((parking:Parking[]) =>{
        return this.groupByLicensePlates(parking)
      })
    );
  }

  groupByLicensePlates(parking:Parking[]){
    const carGroupedArray: LicenseHistory[]=[];
    const carGrouped={};
    let aux: {position: number};
    
    parking.forEach((car: Parking)=>{
      aux =carGrouped[car.license];
      if(aux){
        const carStored: LicenseHistory = Object.assign({},carGroupedArray[aux.position]); 

        carStored.frecuency=carStored.frecuency+1;
        carStored.date=this.formatDateTime.format(new Date(Math.min(carStored.timeStart,car.timeStart)));
        carStored.hour=carStored.hour+car.hour;

        carGroupedArray[aux.position]=carStored;
      }else{
        carGrouped[car.license]={
          position:carGroupedArray.length
        };
        carGroupedArray.push({
          frecuency:1,
          date:car.date,
          timeStart:car.timeStart,
          owner:car.owner,
          hour:car.hour,
          license:car.license
        });
      }
    });

    return carGroupedArray;
  }
}
