import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../shared/model/parking';
import { ParkingService } from '../shared/services/parking.service';

@Component({
  selector: 'app-parking-history',
  templateUrl: './parking-history.component.html',
  styleUrls: ['./parking-history.component.scss']
})
export class ParkingHistoryComponent implements OnInit {

  public parkingObservable: Observable<Parking[]>;
  constructor(private parking: ParkingService) { }

  ngOnInit(): void {
    this.parkingObservable = this.parking.loadAllReservation();
  }
}
