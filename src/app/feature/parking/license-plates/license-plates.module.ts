import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicensePlatesComponent } from './license-plates.component';
import { LicensePlateRoutingModule } from './license-plates-routing.module';

@NgModule({
  declarations: [LicensePlatesComponent],
  imports: [
    CommonModule,
    LicensePlateRoutingModule,
  ]
})
export class LicensePlatesModule { }
