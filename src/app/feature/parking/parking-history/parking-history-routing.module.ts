import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkingHistoryComponent } from './parking-history.component';

const routes: Routes = [{ path: '', component: ParkingHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingHistoryRoutingModule {}
