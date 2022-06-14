import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { ParkingService } from '../../../shared/services/parking.service';

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

describe('CarZoneComponent', () => {
  let component: CarZoneComponent;
  let fixture: ComponentFixture<CarZoneComponent>;
  let dialog:MatDialog
  let dialogRefSpyObj = jasmine.createSpyObj({afterClosed: of(), close:null});
  let dialogRefSpyObjCreated = jasmine.createSpyObj({afterClosed: of(result), close:null});
  let parkingService:ParkingService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarZoneComponent ],
      imports:[
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers:[ParkingService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarZoneComponent);
    component = fixture.componentInstance;
    dialog= TestBed.inject(MatDialog);
    parkingService= TestBed.inject(ParkingService);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should open modal to create a reservation', () => {
    component.car=10;
    let spyDialog = spyOn(dialog,'open').and.returnValue(dialogRefSpyObj);

    component.openCreateReservation();

    expect(spyDialog).toHaveBeenCalled();
    expect(component.car).toBe(10);
    expect(component.carsParked.length).toBe(0);
  });
  
  it('should open modal to create a reservation and successfully created', () => {
    component.car=10;
    let spyDialog = spyOn(dialog,'open').and.returnValue(dialogRefSpyObjCreated);

    component.openCreateReservation();

    expect(spyDialog).toHaveBeenCalled();
    expect(component.car).toBe(result);
    expect(component.carsParked.length).toBe(1);
  });
  
  it('should cancel a reservation (failed)', () => {
    component.car={id:1};
    component.carsParked=[result];
    let spyDelete = spyOn(parkingService,'deleteReservation').and.callFake(() =>{
      return of();
    });

    component.cancelReservation();

    expect(typeof component.car).toEqual('object');
    expect(spyDelete).toHaveBeenCalled();
    expect(component.carsParked.length).toBe(1);
  });

  it('should cancel a reservation (successfully)', () => {
    component.car={id:1, spot:6};
    component.carsParked=[result];
    const patchResult = result;
    patchResult.serviceOut = true;
    let spyDelete = spyOn(parkingService,'deleteReservation').and.callFake(() =>{
      return of(patchResult);
    });

    component.cancelReservation();

    expect(typeof component.car).toEqual('number');
    expect(spyDelete).toHaveBeenCalled();
    expect(component.carsParked.length).toBe(0);
  });
});
