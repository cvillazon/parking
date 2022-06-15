import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  { path: '', component: PrivateComponent,
    children:[
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
      { path: 'parking', loadChildren: () => import('./parking-reservation/parking-reservation.module').then(m => m.ParkingReservationModule)},
      { path: 'historical', loadChildren: () => import('./parking-history/parking-history.module').then(m => m.ParkingHistoryModule)},
      { path: 'license-plates', loadChildren: () => import('./license-plates/license-plates.module').then(m => m.LicensePlatesModule)},
      { path: '**', redirectTo: 'home', pathMatch: 'full',  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
