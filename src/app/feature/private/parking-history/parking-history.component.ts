import { Component, OnInit } from '@angular/core';
import { Parking } from '../shared/model/parking';
import { ParkingService } from '../shared/services/parking.service';

@Component({
  selector: 'app-parking-history',
  templateUrl: './parking-history.component.html',
  styleUrls: ['./parking-history.component.scss']
})
export class ParkingHistoryComponent implements OnInit {

  public parkingHistory:Parking[];
  constructor(private parking:ParkingService) { }

  ngOnInit(): void {
    this.loadAllParking();
  }

  loadAllParking(){
    this.parking.loadAllReservation().subscribe((parking:Parking[])=>{
      console.log(parking);
      this.parkingHistory=parking;
    });
  }

}
