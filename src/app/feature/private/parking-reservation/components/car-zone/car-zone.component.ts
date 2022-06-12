import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateParkingModalComponent } from '../create-parking-modal/create-parking-modal.component';

@Component({
  selector: 'app-car-zone',
  templateUrl: './car-zone.component.html',
  styleUrls: ['./car-zone.component.scss']
})
export class CarZoneComponent implements OnInit {

  @Input() car:any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  get isReserved(){
    return typeof this.car == 'object';
  }

  getReservation(){

  }

  openCreateReservation(): void {
    if(!this.isReserved){
      let dialogRef = this.dialog.open(CreateParkingModalComponent, {
        width: '500px',
        data:{spot:this.car},
        // height:'300px',
        panelClass:'popUp-generic'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.car = result;
      });
    }
  }
}
