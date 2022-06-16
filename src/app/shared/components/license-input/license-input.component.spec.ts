import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LicenseInputComponent } from './license-input.component';

describe('LicenseInputComponent', () => {
  let component: LicenseInputComponent;
  let fixture: ComponentFixture<LicenseInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LicenseInputComponent],
      imports:[FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should emit the license plate, if the inputs are 3 numbers and 3 letters', () => {
    const LETTERS = 'HGT';
    const NUMBERS = 826;

    component.letters=LETTERS;
    component.numbers=NUMBERS;

    const spyEventEmitter = spyOn(component.licenseEvent,'emit').and.returnValue(null);
    
    component.onChange();
    expect(spyEventEmitter).toHaveBeenCalledWith(`${LETTERS}${NUMBERS}`);
  });
  
  it('should NOT emit the license plate, if the inputs are invalid', () => {
    const LETTERS = 'HG';
    const NUMBERS = 826;

    component.letters=LETTERS;
    component.numbers=NUMBERS;

    const spyEventEmitter = spyOn(component.licenseEvent,'emit').and.returnValue(null);
    
    component.onChange();
    expect(spyEventEmitter).not.toHaveBeenCalled();
  });
});
