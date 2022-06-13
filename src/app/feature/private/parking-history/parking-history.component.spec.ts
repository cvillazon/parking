import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpService } from "@core/services/http.service";
import { Parking } from "../shared/model/parking";
import { ParkingService } from "../shared/services/parking.service";
import { of } from 'rxjs';

import { ParkingHistoryComponent } from "./parking-history.component";

const activeParking: Parking[] = [
  {
    serviceOut: false,
    spot: 2,
    carType: "./assets/svg/car1-icon.svg",
    owner: "valerir  villazon",
    hour: 2,
    license: "mkl918",
    date: "6/12/22, 8:05:00 PM",
    dateEnd: "6/12/22, 10:05:11 PM",
    timeStart: 1655082311265,
    timeEnd: 1655089511265,
    totalPrice: 75000,
    id: 2,
  },
  {
    serviceOut: false,
    spot: 3,
    carType: "./assets/svg/car1-icon.svg",
    owner: "karen perez",
    hour: 1,
    license: "gfy716",
    date: "6/12/22, 8:05:12 PM",
    dateEnd: "6/12/22, 9:05:28 PM",
    timeStart: 1655082328948,
    timeEnd: 1655085928948,
    totalPrice: 37500,
    id: 3,
  },
  {
    serviceOut: false,
    spot: 5,
    carType: "./assets/svg/cab-icon.svg",
    owner: "hector villazon",
    hour: 5,
    license: "hgs764",
    date: "6/12/22, 8:05:30 PM",
    dateEnd: "6/13/22, 1:05:42 AM",
    timeStart: 1655082342578,
    timeEnd: 1655100342578,
    totalPrice: 187500,
    id: 4,
  },
];

describe("ParkingHistoryComponent", () => {
  let component: ParkingHistoryComponent;
  let fixture: ComponentFixture<ParkingHistoryComponent>;
  let parkingService: ParkingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingHistoryComponent],
      imports: [HttpClientTestingModule],
      providers: [ParkingService, HttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingHistoryComponent);
    component = fixture.componentInstance;
    parkingService = TestBed.inject(ParkingService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load all history parking", () => {
    spyOn(parkingService,'loadAllReservation').and.returnValue(
      of(activeParking)
    )

    component.loadAllParking();

    expect(component.parkingHistory).toEqual(activeParking);
  });
});
