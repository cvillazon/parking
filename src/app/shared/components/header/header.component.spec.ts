import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/shared/service/auth.service';
import { HttpService } from '@core/services/http.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[AuthService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    service=TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should logout', () => {
    const spyLogout = spyOn(service,'logout').and.returnValue(null);
    component.logout();
    expect(spyLogout).toHaveBeenCalled();
  });

  it('should open the sidenav', () => {
    component.drawer = {toggle:()=>{}};
    const spyDrawer = spyOn(component.drawer,'toggle').and.callThrough();
    component.openSidenav();
    expect(spyDrawer).toHaveBeenCalled();
  });
});
