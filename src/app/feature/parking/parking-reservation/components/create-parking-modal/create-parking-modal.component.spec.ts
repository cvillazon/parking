import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '@core/services/http.service';
import { CreateParkingModalComponent } from './create-parking-modal.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { LicenseInputComponent } from '@shared/components/license-input/license-input.component';
import { ParkingService } from '@parking/shared/services/parking.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class dialogRefMock {
  close() {}
}

const createReservation = {
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
};

describe('CreateParkingModalComponent', () => {
  let component: CreateParkingModalComponent;
  let fixture: ComponentFixture<CreateParkingModalComponent>;
  let parking: ParkingService;
  let dialogRef: MatDialogRef<CreateParkingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateParkingModalComponent, LicenseInputComponent],
      imports: [
        CommonModule,
        BrowserModule,
        MatDialogModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatInputModule
      ],
      providers: [
        ParkingService,
        HttpService,
        { provide: MatDialogRef, useClass: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParkingModalComponent);
    component = fixture.componentInstance;
    parking = TestBed.inject(ParkingService);
    dialogRef = TestBed.inject(MatDialogRef);
    // fixture.detectChanges();
  });

  it('should create', () => {
    const spyInitForm = spyOn(component,'initForm').and.callThrough();
    const spyISpot = spyOn(component,'setSpot').and.callThrough();
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(spyISpot).toHaveBeenCalled();
    expect(spyInitForm).toHaveBeenCalled();
  });

  it('should initialize the formGroup', () => {
    component.initForm();

    expect(component.formReservation).toBeTruthy();
  });

  it('should set the license number', () => {
    const license = 'jhg665';

    component.initForm();
    component.setLicenseNumber(license);

    expect(component.formReservation.get('license').value).toEqual(license);
  });

  it('should initialize the field of form with empty strings', () => {
    component.initForm();

    expect(component.formReservation.get('serviceOut').value).toEqual(false);
    expect(component.formReservation.get('spot').value).toEqual('');
    expect(component.formReservation.get('carType').value).toEqual('');
    expect(component.formReservation.get('owner').value).toEqual('');
    expect(component.formReservation.get('hour').value).toEqual('');
    expect(component.formReservation.get('license').value).toEqual('');
    expect(component.formReservation.get('dateEnd').value).toEqual('');
    expect(component.formReservation.get('timeStart').value).toEqual('');
    expect(component.formReservation.get('timeEnd').value).toEqual('');
    expect(component.formReservation.get('date').value.length).toBeGreaterThan(0);
  });

  it('should set the car in a specific zone (spot)', () => {
    component.initForm();
    const data = {
      spot: 10,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 0,
      onDemand: 0,
    };
    component.car = data;

    component.setSpot();

    expect(component.formReservation.get('spot').value).toBe(data.spot);
  });

  it('should set the car in a specific zone (spot)', () => {
    component.initForm();
    const data = {
      spot: 10,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 0,
      onDemand: 0,
    };
    component.car = data;

    component.setSpot();

    expect(component.formReservation.get('spot').value).toBe(data.spot);
    expect(typeof component.formReservation.get('spot').value).toEqual(
      'number'
    );
  });

  it('should set a random type car', () => {
    component.initForm();
    component.setCar();

    expect(component.formReservation.get('carType').value).toBeTruthy();
    expect(component.formReservation.get('carType').value).toContain('assets');
  });
  
  it('should return true if the license plate is already in the parking', () => {
    const data = {
      spot: 10,
      total: 0,
      cars: [createReservation],
      basePrice: 0,
      dominical: 0,
      onDemand: 500,
    };
    component.car = data;
    const isLicenseDuplicated = component.islicensePlateDuplicated(createReservation.license);


    expect(isLicenseDuplicated).toBe(true);
  });

  it('should return false if the license plate is NOT already in the parking', () => {
    const data = {
      spot: 10,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 0,
      onDemand: 500,
    };
    component.car = data;
    const isLicenseDuplicated = component.islicensePlateDuplicated(createReservation.license);


    expect(isLicenseDuplicated).toBe(false);
  });

  it('should return an extraOnDemand', () => {
    component.initForm();
    const HOUR = 2;
    const data = {
      spot: 10,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 0,
      onDemand: 500,
    };
    component.car = data;
    component.formReservation.get('hour').setValue(HOUR);
    const extraDemand = component.extraOnDemand;


    expect(extraDemand).toBe(HOUR*data.onDemand);
  });
  
  it('should return 0 as extraOnDemand, if is no weekends', () => {
    component.initForm();
    const HOUR = 2;
    const data = {
      spot: 2,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 0,
      onDemand: 0,
    };
    component.car = data;
    component.formReservation.get('hour').setValue(HOUR);
    const extraDemand = component.extraOnDemand;


    expect(extraDemand).toBe(0);
  });

  it('should return an extraWeekend', () => {
    component.initForm();
    const HOUR = 2;
    const data = {
      spot: 10,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 500,
      onDemand: 250,
    };
    component.car = data;
    component.formReservation.get('hour').setValue(HOUR);
    const extraWeekend = component.extraWeekend;

    expect(extraWeekend).toBe(HOUR*data.dominical);
  });

  it('should return 0 as extraDemand, if the capacity of the parking is less than 60%', () => {
    component.initForm();
    const HOUR = 2;
    const data = {
      spot: 2,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 0,
      onDemand: 0,
    };
    component.car = data;
    component.formReservation.get('hour').setValue(HOUR);
    const extraDemand = component.extraOnDemand;


    expect(extraDemand).toBe(0);
  });

  it('should set the dates start and final for the reservation', () => {
    component.initForm();
    const data = {
      spot: 10,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 0,
      onDemand: 0,
    };
    component.car = data;
    component.formReservation.get('hour').setValue(2);

    component.setDateTimes();

    const start = component.formReservation.get('timeStart').value;
    const final = component.formReservation.get('timeEnd').value;

    const expectResult =
      1000 * 60 * 60 * component.formReservation.get('hour').value;

    expect(final - start).toBe(expectResult);
  });

  it('should create the reservation', () => {    
    const PARKING_CREATE = {
      spot: 10,
      cars: [],
      basePrice: 1000,
      dominical: 250,
      onDemand: 500,
    };

    component.car = PARKING_CREATE;
    component.initForm();
    component.formReservation.reset(createReservation);

    const spyDialog = spyOn(dialogRef,'close').and.callThrough();
    const spyCreate = spyOn(parking, 'createReservation').and.returnValue(of([]));
    const spyLicenseDuplicated = spyOn(component,'islicensePlateDuplicated').and.callThrough();
    const spyIsTheFormInvalid = spyOnProperty(component,'isTheFormInvalid').and.callThrough();
    
    spyOnProperty(component,'extraOnDemand').and.returnValue(500*createReservation.hour);
    spyOnProperty(component,'extraWeekend').and.returnValue(250*createReservation.hour);
    
    component.generateReservation();

    expect(spyCreate).toHaveBeenCalled();
    expect(spyDialog).toHaveBeenCalledWith([]);
    expect(spyLicenseDuplicated).toHaveBeenCalled();
    expect(spyIsTheFormInvalid).toHaveBeenCalled();
    expect(component.basePrice).toBe(PARKING_CREATE.basePrice*createReservation.hour);
    expect(component.totalPrice).toBe(component.basePrice+component.extraOnDemand+component.extraWeekend);
    // expect(component.totalPrice).toBe(PARKING_CREATE.basePrice*createReservation.hour)
  });
});
