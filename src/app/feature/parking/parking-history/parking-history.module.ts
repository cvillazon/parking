import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingHistoryRoutingModule } from './parking-history-routing.module';
import { ParkingHistoryComponent } from './parking-history.component';

@NgModule({
  declarations: [ParkingHistoryComponent],
  imports: [
    CommonModule,
    ParkingHistoryRoutingModule
  ]
})
export class ParkingHistoryModule { }
