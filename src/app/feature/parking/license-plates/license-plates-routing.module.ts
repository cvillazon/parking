import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicensePlatesComponent } from './license-plates.component';

const routes: Routes = [
  { path: '', component: LicensePlatesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicensePlateRoutingModule {}
