import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { LicensePlatesComponent } from './license-plates/license-plates.component';
import { ParkingReservationComponent } from './parking-reservation/parking-reservation.component';
import { ParkingHistoryComponent } from './parking-history/parking-history.component';
import { CarZoneComponent } from './parking-reservation/components/car-zone/car-zone.component';
import { CreateParkingModalComponent } from './parking-reservation/components/create-parking-modal/create-parking-modal.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    PrivateComponent,
    HomeComponent,
    LicensePlatesComponent,
    ParkingReservationComponent,
    ParkingHistoryComponent,
    CarZoneComponent,
    CreateParkingModalComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatSidenavModule,
    RouterModule,
    SharedModule,
    MatDialogModule,
    HttpClientModule,
  ]
})
export class PrivateModule { }
