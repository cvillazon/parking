import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpService } from "@core/services/http.service";
import { lastValueFrom, of } from "rxjs";
import { ParkingService } from "../shared/services/parking.service";

import { LicensePlatesComponent } from "./license-plates.component";

const historicalParking = [
  {
    frecuency: 1,
    date: "6/12/22, 8:04:48 PM",
    timeStart: 1655082299569,
    owner: "andres villazon",
    hour: 2,
    license: "oiy644",
  },
  {
    frecuency: 1,
    date: "6/12/22, 8:05:00 PM",
    timeStart: 1655082311265,
    owner: "valerir villazon",
    hour: 2,
    license: "mkl918",
  },
  {
    frecuency: 2,
    date: "6/12/22, 8:05:28 PM",
    timeStart: 1655082328948,
    owner: "karen perez",
    hour: 2,
    license: "gfy716",
  },
  {
    frecuency: 1,
    date: "6/12/22, 8:05:30 PM",
    timeStart: 1655082342578,
    owner: "hector villazon",
    hour: 5,
    license: "hgs764",
  },
  {
    frecuency: 2,
    date: "6/12/22, 8:09:04 PM",
    timeStart: 1655082544468,
    owner: "hector villazon",
    hour: 2,
    license: "MKL918",
  },
  {
    frecuency: 1,
    date: "6/12/22, 8:11:37 PM",
    timeStart: 1655082716551,
    owner: "Rafael mana",
    hour: 1,
    license: "hju917",
  }
];

describe("LicensePlatesComponent", () => {
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

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load all history of parkings", async () => {
    spyOn(parkingService, "loadAllLicensePlates").and.returnValue(
      of(historicalParking)
    );

    fixture.detectChanges();
    
    const licenseHistory = await lastValueFrom(component.groupByLicense);
    expect(licenseHistory.length).toBeGreaterThan(0);
  });
});
