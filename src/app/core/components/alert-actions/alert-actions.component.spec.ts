import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertActionsComponent } from './alert-actions.component';

class dialogRefMock {
  close() {}
}

describe('AlertActionComponent', () => {
  let component: AlertActionsComponent;
  let dialogRef: MatDialogRef<AlertActionsComponent>;
  let fixture: ComponentFixture<AlertActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertActionsComponent],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useClass: dialogRefMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            subtitle: 'message',
            message: 'SOS',
            text_button1: 'OK',
            icon: 'adn-error',
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertActionsComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    // fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.data.title).toBeFalsy();
    expect(component.data.message).toBeTruthy();
    expect(component.data.text_button1).toBeTruthy();
    expect(component.data.text_button2).toBeFalsy();
    expect(component.data.subtitle).toBeTruthy();
    expect(component.data.align_left).toBeFalsy();
  });

  it('should close the actionAlert', () => {
    fixture.detectChanges();
    const spyDialog = spyOn(dialogRef, 'close').and.callThrough();
    component.action(0);
    expect(spyDialog).toHaveBeenCalledWith(0);
    expect(component).toBeTruthy();
    expect(component.data.title).toBeFalsy();
    expect(component.data.message).toBeTruthy();
    expect(component.data.text_button1).toBeTruthy();
    expect(component.data.text_button2).toBeFalsy();
    expect(component.data.subtitle).toBeTruthy();
    expect(component.data.align_left).toBeFalsy();
  });

  it('all boolean variables should be falsy', () => {
    component.data.title = '';
    component.data.message = '';
    component.data.text_button1 = '';
    component.data.text_button2 = '';
    component.data.subtitle = '';
    component.data.align_left = false;

    expect(component.data.title).toBeFalsy();
    expect(component.data.message).toBeFalsy();
    expect(component.data.text_button1).toBeFalsy();
    expect(component.data.text_button2).toBeFalsy();
    expect(component.data.subtitle).toBeFalsy();
    expect(component.data.align_left).toBeFalsy();
  });

  it('given a default configuration some variables (btnOpt1, titleSub,msg) should be truthy', () => {
    fixture.detectChanges();
    expect(component.data.title).toBeFalsy();
    expect(component.data.message).toBeTruthy();
    expect(component.data.text_button1).toBeTruthy();
    expect(component.data.text_button2).toBeFalsy();
    expect(component.data.subtitle).toBeTruthy();
    expect(component.data.align_left).toBeFalsy();
  });
});
