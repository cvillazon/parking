import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpService } from "@core/services/http.service";
import { ParkingService } from "../../../shared/services/parking.service";
import { CreateParkingModalComponent } from "./create-parking-modal.component";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { MatInputModule } from "@angular/material/input";
import { LicenseInputComponent } from "@shared/components/license-input/license-input.component";

class dialogRefMock {
  close() {}
}

const createReservation = {
  serviceOut: false,
  spot: 1,
  carType: "./assets/svg/taxi-icon.svg",
  owner: "andres villazon",
  hour: 2,
  license: "oiy644",
  date: "6/12/22, 8:04:48 PM",
  dateEnd: "6/12/22, 10:04:59 PM",
  timeStart: 1655082299569,
  timeEnd: 1655089499569,
  totalPrice: 75000,
};

describe("CreateParkingModalComponent", () => {
  let component: CreateParkingModalComponent;
  let fixture: ComponentFixture<CreateParkingModalComponent>;
  let parking: ParkingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateParkingModalComponent, LicenseInputComponent],
      imports: [
        CommonModule,
        BrowserModule,
        MatDialogModule,
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
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize the formGroup", () => {
    component.initForm();

    expect(component.formReservation).toBeTruthy();
  });

  it("should set the license number", () => {
    let license = "jhg665";

    component.initForm();
    component.setLicenseNumber(license);

    expect(component.formReservation.get("license").value).toEqual(license);
  });

  it("should set the car in a specific zone (spot)", () => {
    component.initForm();
    let data = {
      spot: 10,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 0,
      onDemand: 0,
    };
    component.car = data;

    component.setSpot();

    expect(component.formReservation.get("spot").value).toBe(data.spot);
  });

  it("should set the car in a specific zone (spot)", () => {
    component.initForm();
    let data = {
      spot: 10,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 0,
      onDemand: 0,
    };
    component.car = data;

    component.setSpot();

    expect(component.formReservation.get("spot").value).toBe(data.spot);
    expect(typeof component.formReservation.get("spot").value).toEqual(
      "number"
    );
  });

  it("should set a random type car", () => {
    component.initForm();
    component.setCar();

    expect(component.formReservation.get("carType").value).toBeTruthy();
    expect(component.formReservation.get("carType").value).toContain("assets");
  });

  it("should set the dates start and final for the reservation", () => {
    component.initForm();
    let data = {
      spot: 10,
      total: 0,
      cars: [],
      basePrice: 0,
      dominical: 0,
      onDemand: 0,
    };
    component.car = data;
    component.formReservation.get("hour").setValue(2);

    component.setDateTimes();

    const start = component.formReservation.get("timeStart").value;
    const final = component.formReservation.get("timeEnd").value;

    const expectResult =
      1000 * 60 * 60 * component.formReservation.get("hour").value;

    expect(final - start).toBe(expectResult);
  });

  it("should create the reservation", () => {
    component.initForm();
    component.formReservation.reset(createReservation);
    let data = {
      spot: 10,
      total: 0,
      cars: [],
      basePrice: 20000,
      dominical: 0,
      onDemand: 0,
    };
    component.car = data;

    let spyCreate = spyOn(parking, "createReservation").and.returnValue(of());
    component.generateReservation();

    expect(spyCreate).toHaveBeenCalled();
  });
});
