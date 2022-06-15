import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ParkingReservationComponent } from "./parking-reservation.component";
import { ParkingReservationRoutingModule } from "./parking-reservation-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { CarZoneComponent } from "./components/car-zone/car-zone.component";
import { CreateParkingModalComponent } from "./components/create-parking-modal/create-parking-modal.component";

@NgModule({
  declarations: [
    ParkingReservationComponent,
    CarZoneComponent,
    CreateParkingModalComponent,
  ],
  imports: [
    ParkingReservationRoutingModule,
    CommonModule,
    MatSidenavModule,
    RouterModule,
    SharedModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ParkingReservationModule {}
