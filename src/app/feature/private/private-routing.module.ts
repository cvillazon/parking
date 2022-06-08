import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LicensePlatesComponent } from "./license-plates/license-plates.component";
import { ParkingHistoryComponent } from "./parking-history/parking-history.component";
import { ParkingReservationComponent } from "./parking-reservation/parking-reservation.component";
import { PrivateComponent } from "./private.component";

const routes: Routes = [
  { path: "", component: PrivateComponent,
    children:[
      { path: "home", component: HomeComponent},
      { path: "parking", component: ParkingReservationComponent},
      { path: "historical", component: ParkingHistoryComponent},
      { path: "license-plates", component: LicensePlatesComponent},
      { path: "**", redirectTo: 'private/home', pathMatch: 'full',  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
