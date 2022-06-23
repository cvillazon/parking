import { Component, OnInit } from '@angular/core';
import { LicenseHistory } from './../shared/model/license-history';
import { Parking } from '../shared/model/parking';
import { ParkingService } from '../shared/services/parking.service';
import { formatDateGlobal } from '../shared/utils/format-date';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-license-plates',
  templateUrl: './license-plates.component.html',
  styleUrls: ['./license-plates.component.scss']
})
export class LicensePlatesComponent implements OnInit {

  public formatDateTime = new Intl.DateTimeFormat('en', formatDateGlobal);
  public historyParked: Parking[];
  public groupByLicense: Observable<LicenseHistory[]>;
  constructor(private parking: ParkingService) { }

  ngOnInit(): void {
    this.groupByLicense= this.parking.loadAllLicensePlates();
  }
}
