import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { LicenseHistory } from '../model/license-history';
import { Parking } from '../model/parking';

import { ParkingService } from './parking.service';

const historicalLiecenseParking = [
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

const historicalReservations = [
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
  {
    serviceOut: true,
    spot: 4,
    carType: './assets/svg/prison-bus-icon.svg',
    owner: 'hector villazon',
    hour: 1,
    license: 'MKL918',
    date: '6/12/22, 8:08:48 PM',
    dateEnd: '6/12/22, 9:09:04 PM',
    timeStart: 1655082544468,
    timeEnd: 1655086144468,
    totalPrice: 37500,
    id: 6,
  },
  {
    serviceOut: true,
    spot: 4,
    carType: './assets/svg/police-icon.svg',
    owner: 'andres villazon',
    hour: 1,
    license: 'MKL918',
    date: '6/12/22, 8:09:37 PM',
    dateEnd: '6/12/22, 9:09:45 PM',
    timeStart: 1655082585761,
    timeEnd: 1655086185761,
    totalPrice: 37500,
    id: 7,
  },
  {
    serviceOut: false,
    spot: 10,
    carType: './assets/svg/car1-icon.svg',
    owner: 'Rafael mana',
    hour: 1,
    license: 'hju917',
    date: '6/12/22, 8:11:37 PM',
    dateEnd: '6/12/22, 9:11:56 PM',
    timeStart: 1655082716551,
    timeEnd: 1655086316551,
    totalPrice: 37500,
    id: 8,
  },
  {
    serviceOut: false,
    spot: 7,
    carType: './assets/svg/bus-icon.svg',
    owner: 'Laura flores',
    hour: 3,
    license: 'pou816',
    date: '6/12/22, 8:12:00 PM',
    dateEnd: '6/12/22, 11:12:14 PM',
    timeStart: 1655082734132,
    timeEnd: 1655093534132,
    totalPrice: 112500,
    id: 9,
  },
  {
    serviceOut: true,
    spot: 1,
    carType: './assets/svg/taxi-icon.svg',
    owner: 'andres villazon',
    hour: 2,
    license: 'jku917',
    date: '6/13/22, 9:46:05 AM',
    dateEnd: '6/13/22, 11:46:15 AM',
    timeStart: 1655131575926,
    timeEnd: 1655138775926,
    totalPrice: 20000,
    id: 10,
  },
  {
    serviceOut: true,
    spot: 2,
    carType: './assets/svg/excavator1-icon.svg',
    owner: 'hector villazon',
    hour: 2,
    license: 'ppp111',
    date: '6/13/22, 9:54:15 AM',
    dateEnd: '6/13/22, 11:54:26 AM',
    timeStart: 1655132066359,
    timeEnd: 1655139266359,
    totalPrice: 20000,
    id: 11,
  },
  {
    serviceOut: true,
    spot: 3,
    carType: './assets/svg/prison-bus-icon.svg',
    owner: 'valerir  villazon',
    hour: 3,
    license: 'ppp222',
    date: '6/13/22, 9:54:27 AM',
    dateEnd: '6/13/22, 12:54:53 PM',
    timeStart: 1655132093442,
    timeEnd: 1655142893442,
    totalPrice: 30000,
    id: 12,
  },
  {
    serviceOut: true,
    spot: 4,
    carType: './assets/svg/car2-icon.svg',
    owner: 'patricia villarreal',
    hour: 1,
    license: 'ppp223',
    date: '6/13/22, 9:54:54 AM',
    dateEnd: '6/13/22, 10:55:15 AM',
    timeStart: 1655132115182,
    timeEnd: 1655135715182,
    totalPrice: 10000,
    id: 13,
  },
  {
    serviceOut: true,
    spot: 2,
    carType: './assets/svg/excavator1-icon.svg',
    owner: 'andres villazon',
    hour: 2,
    license: 'ppp111',
    date: '6/13/22, 10:21:09 AM',
    dateEnd: '6/13/22, 12:21:18 PM',
    timeStart: 1655133678508,
    timeEnd: 1655140878508,
    totalPrice: 20000,
    id: 14,
  },
  {
    serviceOut: true,
    spot: 3,
    carType: './assets/svg/police-icon.svg',
    owner: 'patricia villarreal',
    hour: 2,
    license: 'ppp999',
    date: '6/13/22, 10:21:21 AM',
    dateEnd: '6/13/22, 12:21:32 PM',
    timeStart: 1655133692317,
    timeEnd: 1655140892317,
    totalPrice: 20000,
    id: 15,
  },
  {
    serviceOut: true,
    spot: 4,
    carType: './assets/svg/bus-icon.svg',
    owner: 'andres villazon',
    hour: 1,
    license: 'ooo888',
    date: '6/13/22, 10:22:58 AM',
    dateEnd: '6/13/22, 11:23:09 AM',
    timeStart: 1655133789172,
    timeEnd: 1655137389172,
    totalPrice: 10000,
    id: 16,
  },
  {
    serviceOut: false,
    spot: 9,
    carType: './assets/svg/excavator2-icon.svg',
    owner: 'andres villazon',
    hour: 2,
    license: 'jjj871',
    date: '6/13/22, 10:24:04 AM',
    dateEnd: '6/13/22, 12:24:16 PM',
    timeStart: 1655133856917,
    timeEnd: 1655141056917,
    totalPrice: 20000,
    id: 17,
  },
  {
    serviceOut: false,
    spot: 7,
    carType: './assets/svg/cab-icon.svg',
    owner: 'Laura flores',
    hour: 1,
    license: 'jjj872',
    date: '6/13/22, 10:24:22 AM',
    dateEnd: '6/13/22, 11:24:37 AM',
    timeStart: 1655133877887,
    timeEnd: 1655137477887,
    totalPrice: 10000,
    id: 18,
  },
];

describe('ParkingService', () => {
  let service: ParkingService;
  let httpMock: HttpTestingController;
  const apiEndpointLoadReservations = `${environment.endpoint}/parking`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParkingService, HttpService],
    });
    service = TestBed.inject(ParkingService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list all historical reservation', () => {
    const dummyReservations = historicalReservations;

    service.loadAllReservation().subscribe((reservation: Parking[]) => {
      expect(reservation.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(apiEndpointLoadReservations);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReservations);
  });
  
  it('should list all license historical reservation', () => {
    const dummyReservations = historicalLiecenseParking;

    service.loadAllLicensePlates().subscribe((license: LicenseHistory[]) => {
      expect(license.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(apiEndpointLoadReservations);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReservations);
  });

  it('should list all active reservation', () => {
    const dummyActiveReservations = historicalReservations.splice(0, 2);
    const time = 1655146450862;

    service.loadReservation(time).subscribe((reservation: Parking[]) => {
      expect(reservation.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(`${apiEndpointLoadReservations}/?timeEnd_gte=1655146450862&serviceOut_ne=true`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyActiveReservations);
  });

  it('should No list reservation, when there is not cars in the parking', () => {
    const dummyActiveReservations = [];
    const time = 1655146450862;

    service.loadReservation(time).subscribe((reservation: Parking[]) => {
      expect(reservation.length).toBe(0);
    });

    const req = httpMock.expectOne(`${apiEndpointLoadReservations}/?timeEnd_gte=${time}&serviceOut_ne=true`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyActiveReservations);
  });

  it('should create a new reservation', () => {
    const dummyReservation: Parking = {
      serviceOut: false,
      spot: 7,
      carType: './assets/svg/cab-icon.svg',
      owner: 'Laura flores',
      hour: 1,
      license: 'tes123',
      date: '6/13/22, 10:24:22 AM',
      dateEnd: '6/13/22, 11:24:37 AM',
      timeStart: 1655133877887,
      timeEnd: 1655137477887,
      totalPrice: 10000,
    };

    service
      .createReservation(dummyReservation)
      .subscribe((reservation: Parking) => {
        expect(reservation).toEqual(dummyReservation);
        expect(reservation.id).toBeTruthy();
      });

    const req = httpMock.expectOne(apiEndpointLoadReservations);
    expect(req.request.method).toBe('POST');
    dummyReservation.id=900;
    req.flush(dummyReservation);
  });

  it('should delete a reservation (change serviceOut to true)', () => {
    const dummyDeleteresReservation = {
      serviceOut: true,
      spot: 3,
      carType: './assets/svg/car3-icon.svg',
      owner: 'hector villazon',
      hour: 1,
      license: 'nhy716',
      date: '6/13/22, 2:07:54 PM',
      dateEnd: '6/13/22, 3:08:01 PM',
      timeStart: 1655147281985,
      timeEnd: 1655150881985,
      totalPrice: 10000,
      id: 20,
    };

    const dummyDeleteIdReservation = 20;

    service
      .deleteReservation(dummyDeleteIdReservation)
      .subscribe((reservation: Parking) => {
        expect(reservation).toEqual(dummyDeleteresReservation);
        expect(reservation.serviceOut).toEqual(true);
      });

    const req = httpMock.expectOne(`${apiEndpointLoadReservations}/${dummyDeleteIdReservation}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(dummyDeleteresReservation);
  });
});
