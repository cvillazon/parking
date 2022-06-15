import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingReservationComponent } from './parking-reservation.component';
const routes: Routes = [
  { path: '', component: ParkingReservationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingReservationRoutingModule {}
