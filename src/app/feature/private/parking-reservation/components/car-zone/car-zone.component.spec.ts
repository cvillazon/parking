import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarZoneComponent } from './car-zone.component';

xdescribe('CarZoneComponent', () => {
  let component: CarZoneComponent;
  let fixture: ComponentFixture<CarZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarZoneComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
