import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Parking } from '@parking/shared/model/parking';
import { ParkingService } from '@parking/shared/services/parking.service';
import { formatDateGlobal } from '@parking/shared/utils/format-date';
import { CreateParkingModalComponent } from '../create-parking-modal/create-parking-modal.component';


@Component({
  selector: 'app-car-zone',
  templateUrl: './car-zone.component.html',
  styleUrls: ['./car-zone.component.scss'],
})
export class CarZoneComponent {
  @Input() id: number;
  @Input() basePrice: number;
  @Input() spots = 0;
  @Input() car: Parking;
  @Input() carsParked: Parking[] = [];
  formatDateTime = new Intl.DateTimeFormat('en', formatDateGlobal);
  constructor(public dialog: MatDialog, private parking: ParkingService) {}

  get isReserved(): boolean {
    return typeof this.car == 'object';
  }

  get extraDominical(): number {
    const SUNDAY = 6;
    const SATURDAY = 0;
    const WEEKENDS = [SUNDAY,SATURDAY];
    const EXTRA_PAYMENT_WEEKENDS = 0.5;
    return WEEKENDS.includes(new Date().getDay()) ? this.basePrice * EXTRA_PAYMENT_WEEKENDS : 0;
  }

  get extraOnDemand(): number {
    const CONDITIONS =  0.6;
    const EXTRA_PAYMENT_ONDEMAND = 0.25;
    const CURRENT_VALUE: number = this.carsParked.length / this.spots;

    return CURRENT_VALUE >= CONDITIONS
      ? this.basePrice * EXTRA_PAYMENT_ONDEMAND
      : 0;
  }

  get endTimeParking() {
    if(!this.car.timeEnd){
      return '';
    }
    return this.formatDateTime.format(new Date(this.car?.timeEnd)) ?? '';
  }
  //hour
  openCreateReservation(): void {
    if (!this.isReserved) {
      const dialogRef = this.dialog.open(CreateParkingModalComponent, {
        width: '500px',
        data: {
          spot: this.car?this.car:this.id,
          cars: this.carsParked,
          basePrice:this.basePrice,
          dominical:this.extraDominical,
          onDemand:this.extraOnDemand,
        },
        panelClass: 'popUp-generic',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(typeof result === 'object') {
          this.car = result;
          this.carsParked.push(result);
        }
      });
    }
  }

  cancelReservation() {
    if (this.isReserved){
      this.parking.deleteReservation(this.car.id).subscribe((car: Parking) => {
        if(typeof car === 'object'){
          this.removeFromParking(this.car.id);
          this.car=null;
        }
      });
    }
  }

  removeFromParking(carDeleted: number) {
    let idx: number=null;
    this.carsParked.forEach((car: Parking, id: number) =>{
      idx = id;
      return car.id === carDeleted;
    });

    if(idx>=0){
      this.carsParked.splice(idx,1);
    }
  }
}
