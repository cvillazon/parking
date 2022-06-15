import { Component, OnInit } from '@angular/core';
import { Parking } from '../shared/model/parking';
import { ParkingService } from '../shared/services/parking.service';

@Component({
  selector: 'app-parking-reservation',
  templateUrl: './parking-reservation.component.html',
  styleUrls: ['./parking-reservation.component.scss']
})
export class ParkingReservationComponent implements OnInit {

  public parkingSpot=20;
  public carsInParking: Parking[];
  public parkingArray;
  constructor(private parking: ParkingService) { }

  ngOnInit(): void {
    this.loadActiveReservation();
    this.parkingArray = Array(this.parkingSpot).fill(0).map( (_,idx) => idx+1);
  }

  loadActiveReservation(){
    const time: number=new Date().getTime();
    this.parking.loadReservation(time).subscribe((parking: Parking[])=>{
      this.carsInParking=parking;
    });
  }

  getInfoParking(idx: number){
    return this.carsInParking?.find((cars: any)=>cars.spot===idx) ?? idx;
  }

}