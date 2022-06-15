import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Parking } from '../../../shared/model/parking';
import { ParkingService } from '../../../shared/services/parking.service';
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
  @Input() car: any | Parking;
  @Input() carsParked: Parking[] = [];
  dateOpt: any = {
    timeStyle: 'medium',
    dateStyle: 'short',
  };
  formatDateTime = new Intl.DateTimeFormat('en', this.dateOpt);
  constructor(public dialog: MatDialog, private parking: ParkingService) {}

  get isReserved() {
    return typeof this.car == 'object';
  }

  get extraDominical() {
    const WEEKENDS = [6,0];
    const EXTRA_PAYMENT_WEEKENDS = 0.5;
    return WEEKENDS.includes(new Date().getDay()) ? this.basePrice * EXTRA_PAYMENT_WEEKENDS : 0;
  }

  get extraOnDemand() {
    const CONDITIONS =  0.6;
    const EXTRA_PAYMENT_ONDEMAND = 0.25;

    return this.carsParked.length / this.spots >= CONDITIONS
      ? this.basePrice * EXTRA_PAYMENT_ONDEMAND
      : 0;
  }
  
  get totalPriceReservation() {
    return this.basePrice+this.extraDominical+this.extraOnDemand;
  }

  get endTimeParking() {
    if(!this.car.timeEnd){
      return ''
    };
    return this.formatDateTime.format(new Date(this.car?.timeEnd)) ?? '';
  }
  //hour
  openCreateReservation(): void {
    if (!this.isReserved) {
      const dialogRef = this.dialog.open(CreateParkingModalComponent, {
        width: '500px',
        data: {
          spot: this.car,
          cars: this.carsParked,
          basePrice:this.basePrice,
          dominical:this.extraDominical,
          onDemand:this.extraOnDemand,
          total:this.totalPriceReservation
        },
        panelClass: 'popUp-generic',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.car = result;
          this.carsParked.push(result);
        }
      });
    }
  }

  cancelReservation() {
    if (this.isReserved){
      this.parking.deleteReservation(this.car.id).subscribe((car: Parking) => {
        if(car){
          this.removeFromParking(this.car.id);
          this.car = this.car.spot;
        }
      });
    };
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
