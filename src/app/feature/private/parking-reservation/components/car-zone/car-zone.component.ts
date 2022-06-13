import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Parking } from "../../../shared/model/parking";
import { ParkingService } from "../../../shared/services/parking.service";
import { CreateParkingModalComponent } from "../create-parking-modal/create-parking-modal.component";

@Component({
  selector: "app-car-zone",
  templateUrl: "./car-zone.component.html",
  styleUrls: ["./car-zone.component.scss"],
})
export class CarZoneComponent implements OnInit {
  @Input() basePrice: number;
  @Input() spots: number = 0;
  @Input() car: any | Parking;
  @Input() carsParked: Parking[] = [];
  public dateOpt: any = {
    timeStyle: "medium",
    dateStyle: "short",
  };
  public formatDateTime = new Intl.DateTimeFormat("en", this.dateOpt);
  constructor(public dialog: MatDialog, private parking: ParkingService) {}

  ngOnInit(): void {}

  get isReserved() {
    return typeof this.car == "object";
  }

  get extraDominical() {
    return [6, 0].includes(new Date().getDay()) ? this.basePrice * 0.5 : 0;
  }

  get extraOnDemand() {
    return this.carsParked.length / this.spots > 0.6
      ? this.basePrice * 0.25
      : 0;
  }
  
  get totalPriceReservation() {
    return this.basePrice+this.extraDominical+this.extraOnDemand;
  }

  get endTimeParking() {
    return this.formatDateTime.format(new Date(this.car.timeEnd)) ?? "";
  }
//hour
  openCreateReservation(): void {
    if (!this.isReserved) {
      let dialogRef = this.dialog.open(CreateParkingModalComponent, {
        width: '500px',
        data: {
          spot: this.isReserved ? this.car.spot : this.car,
          cars: this.carsParked,
          basePrice:this.basePrice,
          dominical:this.extraDominical,
          onDemand:this.extraOnDemand,
          total:this.totalPriceReservation
        },
        panelClass: 'popUp-generic',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(!result) return;
        this.car = result;
        this.carsParked.push(result)
      });
    }
  }

  cancelReservation() {
    if (!this.isReserved) return;
    this.parking.deleteReservation(this.car.id).subscribe((_: any) => {
      this.removeFromParking(this.car.id);
      this.car = this.car.spot;
    });
  }

  removeFromParking(carDeleted:number) {
    let idx:number=null;
    this.carsParked.find((car:Parking, id: number) =>{
      idx = id;
      return car.id === carDeleted;
    });

    if(idx){
      this.carsParked.splice(idx,1);
    }
  }
}
