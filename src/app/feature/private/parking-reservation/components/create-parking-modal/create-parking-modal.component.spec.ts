import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParkingModalComponent } from './create-parking-modal.component';

xdescribe('CreateParkingModalComponent', () => {
  let component: CreateParkingModalComponent;
  let fixture: ComponentFixture<CreateParkingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParkingModalComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParkingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
