import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from '@core/services/http.service';
import { ParkingService } from '@parking/shared/services/parking.service';
import { of } from 'rxjs';

import { CarZoneComponent } from './car-zone.component';

const result = {
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
};

const parked = [
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
];

describe('CarZoneComponent', () => {
  let component: CarZoneComponent;
  let fixture: ComponentFixture<CarZoneComponent>;
  let dialog: MatDialog;
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of(),
    close: null,
  });
  const dialogRefSpyObjCreated = jasmine.createSpyObj({
    afterClosed: of(result),
    close: null,
  });
  let parkingService: ParkingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarZoneComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        CommonModule,
        BrowserModule,
      ],
      providers: [ParkingService, HttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarZoneComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    parkingService = TestBed.inject(ParkingService);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal to create a reservation', () => {
    component.car = 10;
    const spyDialog = spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.openCreateReservation();

    expect(spyDialog).toHaveBeenCalled();
    expect(component.car).toBe(10);
    expect(component.carsParked.length).toBe(0);
  });

  it('should open modal to create a reservation and successfully created', () => {
    component.car = 10;
    const spyDialog = spyOn(dialog, 'open').and.returnValue(
      dialogRefSpyObjCreated
    );

    component.openCreateReservation();

    expect(spyDialog).toHaveBeenCalled();
    expect(component.car).toBe(result);
    expect(component.carsParked.length).toBe(1);
  });

  it('should cancel a reservation (failed)', () => {
    component.car = { id: 1 };
    component.carsParked = [result];
    const spyDelete = spyOn(parkingService, 'deleteReservation').and.callFake(
      () => {
        return of();
      }
    );

    component.cancelReservation();

    expect(typeof component.car).toEqual('object');
    expect(spyDelete).toHaveBeenCalled();
    expect(component.carsParked.length).toBe(1);
  });

  it('should cancel a reservation (successfully)', () => {
    component.car = { id: 1, spot: 6 };
    component.carsParked = [result];
    const patchResult = result;
    patchResult.serviceOut = true;
    const spyDelete = spyOn(parkingService, 'deleteReservation').and.callFake(
      () => {
        return of(patchResult);
      }
    );

    component.cancelReservation();

    expect(typeof component.car).toEqual('number');
    expect(spyDelete).toHaveBeenCalled();
    expect(component.carsParked.length).toBe(0);
  });

  it('should increase the price on weekends', () => {

    component.basePrice = 1000;
    const dateMock = new Date(1655043926363); //Sun
    jasmine.clock().mockDate(dateMock);

    const extraPayment = component.extraDominical;

    expect(extraPayment).toBe(500);
  });
  
  it('should not increase the price on weekends', () => {

    component.basePrice = 1000;
    const dateMock = new Date(1655222912188); //Tuesday
    jasmine.clock().mockDate(dateMock);

    const extraPayment = component.extraDominical;

    expect(extraPayment).toBe(0);
  });

  it('should increase the price on extraOnDemand', () => {
    component.spots = 5;
    component.carsParked=parked;
    component.basePrice = 1000;

    const extraPayment = component.extraOnDemand;

    expect(extraPayment).toBe(250);
  });
});
