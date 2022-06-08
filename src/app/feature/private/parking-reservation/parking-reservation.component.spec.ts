import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingReservationComponent } from './parking-reservation.component';

describe('ParkingReservationComponent', () => {
  let component: ParkingReservationComponent;
  let fixture: ComponentFixture<ParkingReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
