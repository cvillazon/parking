import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parking-reservation',
  templateUrl: './parking-reservation.component.html',
  styleUrls: ['./parking-reservation.component.scss']
})
export class ParkingReservationComponent implements OnInit {

  public parkingSpot:number=20;
  public parkingArray;
  constructor() { }

  ngOnInit(): void {
    this.parkingArray = Array(this.parkingSpot).fill(0).map( (_,idx) => idx+1);
    console.log(this.parkingArray);
  }

}
