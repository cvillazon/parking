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

  openCreateReservation(): void {
    this.dialog.open(CreateParkingModalComponent, {
      width: '500px',
      // height:'300px',
      panelClass:'popUp-generic'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
