import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { Parking } from '../shared/model/parking';
import { ParkingService } from '../shared/services/parking.service';
import {of } from 'rxjs';
import { ParkingReservationComponent } from './parking-reservation.component';
import { CarZoneComponent } from './components/car-zone/car-zone.component';
import { MatDialogModule } from '@angular/material/dialog';
const activeParking: Parking[] = [
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
];

describe('ParkingReservationComponent', () => {
  let component: ParkingReservationComponent;
  let fixture: ComponentFixture<ParkingReservationComponent>;
  let parkingService: ParkingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingReservationComponent , CarZoneComponent],
      imports:[
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers:[ParkingService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingReservationComponent);
    component = fixture.componentInstance;
    parkingService = TestBed.inject(ParkingService);
    // fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    const SPOT_TOTAL = component.parkingSpot;
    expect(component).toBeTruthy();
    expect(component.parkingArray.length).toBe(SPOT_TOTAL);
  });
  
  it('should load the active parking', () => {
    spyOn(parkingService,'loadReservation').and.returnValue(of(activeParking));

    component.loadActiveReservation();

    expect(component.carsInParking.length).toBeGreaterThan(0);
    expect(component.carsInParking).toEqual(activeParking);
  });
  
  it('should get the information of the parked car', () => {
    component.carsInParking=activeParking;

    const res: Parking = component.getInfoParking(2);

    expect(res.spot).toEqual(2);
    expect(res.id).toEqual(2);
  });
  
  it('should get the id of the spot in the parking, if there is no cars in this parking zone', () => {
    component.carsInParking=activeParking;

    const res: Parking = component.getInfoParking(1);

    expect(res).toEqual(1);
  });


});
