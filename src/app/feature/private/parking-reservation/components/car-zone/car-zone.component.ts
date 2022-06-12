import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingService } from '../../../shared/services/parking.service';
import { CreateParkingModalComponent } from '../create-parking-modal/create-parking-modal.component';

@Component({
  selector: 'app-car-zone',
  templateUrl: './car-zone.component.html',
  styleUrls: ['./car-zone.component.scss']
})
export class CarZoneComponent implements OnInit {

  @Input() car:any;
  public dateOpt: any = {
    timeStyle: "medium",
    dateStyle: "short",
  };
  public formatDateTime = new Intl.DateTimeFormat("en", this.dateOpt);
  constructor(public dialog: MatDialog, private parking:ParkingService) { }

  ngOnInit(): void {
  }

  get isReserved(){
    return typeof this.car == 'object';
  }

  get endTimeParking(){
    return this.formatDateTime.format(new Date(this.car.timeEnd)) ?? "";
  }

  openCreateReservation(): void {
    if(!this.isReserved){
      let dialogRef = this.dialog.open(CreateParkingModalComponent, {
        width: '500px',
        data:{spot:this.isReserved?this.car.spot:this.car},
        panelClass:'popUp-generic'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.car = result;
      });
    }
  }

  cancelReservation(){
    if(!this.isReserved)return;
    this.parking.deleteReservation(this.car.id).subscribe((_:any)=>{
      this.car=this.car.spot;
    })
  }
}
