import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertActionsComponent } from './alert-actions.component';

class dialogRefMock{
  close(){

  }
}

describe('AlertActionComponent', () => {
  let component: AlertActionsComponent;
  let dialogRef: MatDialogRef<AlertActionsComponent>;
  let fixture: ComponentFixture<AlertActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertActionsComponent],
      imports:[
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useClass: dialogRefMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertActionsComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should close the actionAlert', () => {
    const spyDialog = spyOn(dialogRef,'close').and.callThrough();
    component.action(false);
    expect(spyDialog).toHaveBeenCalled();
  });

  it('all boolean variables should be falsy', () => {
    expect(component.title_start).toBeFalsy();
    expect(component.msg).toBeFalsy();
    expect(component.btn_opt1).toBeFalsy();
    expect(component.btn_opt2).toBeFalsy();
    expect(component.title_sub).toBeFalsy();
    expect(component.align_left).toBeFalsy();
  });  
});
