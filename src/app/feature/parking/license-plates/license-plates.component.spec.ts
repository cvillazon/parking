import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { ParkingService } from '../shared/services/parking.service';

import { LicensePlatesComponent } from './license-plates.component';

const historicalParking = [
  {
    serviceOut: false,
    spot: 1,
    carType: './assets/svg/taxi-icon.svg',
    owner: 'andres villazon',
    hour: 2,
    license: 'oiy644',
    date: '6/12/22, 8:04:48 PM',
    dateEnd: '6/12/22, 10:04:59 PM',
    timeStart: 1655082299569,
    timeEnd: 1655089499569,
    totalPrice: 75000,
    id: 1,
  },
  {
    serviceOut: false,
    spot: 2,
    carType: './assets/svg/car1-icon.svg',
    owner: 'valerir  villazon',
    hour: 2,
    license: 'mkl918',
    date: '6/12/22, 8:05:00 PM',
    dateEnd: '6/12/22, 10:05:11 PM',
    timeStart: 1655082311265,
    timeEnd: 1655089511265,
    totalPrice: 75000,
    id: 2,
  },
  {
    serviceOut: false,
    spot: 3,
    carType: './assets/svg/car1-icon.svg',
    owner: 'karen perez',
    hour: 1,
    license: 'gfy716',
    date: '6/12/22, 8:05:12 PM',
    dateEnd: '6/12/22, 9:05:28 PM',
    timeStart: 1655082328948,
    timeEnd: 1655085928948,
    totalPrice: 37500,
    id: 3,
  },
  {
    serviceOut: false,
    spot: 5,
    carType: './assets/svg/cab-icon.svg',
    owner: 'hector villazon',
    hour: 5,
    license: 'hgs764',
    date: '6/12/22, 8:05:30 PM',
    dateEnd: '6/13/22, 1:05:42 AM',
    timeStart: 1655082342578,
    timeEnd: 1655100342578,
    totalPrice: 187500,
    id: 4,
  },
  {
    serviceOut: true,
    spot: 4,
    carType: './assets/svg/car2-icon.svg',
    owner: 'patricia villarreal',
    hour: 1,
    license: 'gfy716',
    date: '6/12/22, 8:06:24 PM',
    dateEnd: '6/12/22, 9:06:37 PM',
    timeStart: 1655082397355,
    timeEnd: 1655085997355,
    totalPrice: 37500,
    id: 5,
  },
];

describe('LicensePlatesComponent', () => {
  let component: LicensePlatesComponent;
  let fixture: ComponentFixture<LicensePlatesComponent>;
  let parkingService: ParkingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LicensePlatesComponent],
      imports: [HttpClientTestingModule],
      providers: [ParkingService, HttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensePlatesComponent);
    component = fixture.componentInstance;
    parkingService = TestBed.inject(ParkingService);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all history of parkings', () => {
    spyOn(parkingService, 'loadAllLicensePlates').and.returnValue(of(historicalParking));
    component.getAllLicensePlates();

    expect(component.historyParked.length).toBeGreaterThan(0);
    expect(component.historyParked).toEqual(historicalParking);
  });
  
  it('should group history parking by license plates', () => {
    component.historyParked=historicalParking;
    component.groupByLicensePlates();

    expect(component.groupByLicense.length).toBeGreaterThan(0);
    expect(component.groupByLicense.length).toBeLessThanOrEqual(historicalParking.length);
  });
});
