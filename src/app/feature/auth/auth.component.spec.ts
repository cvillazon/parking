import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of, throwError } from 'rxjs';

import { AuthComponent } from './auth.component';
import { AuthService } from './shared/service/auth.service';
import { HomeComponent } from '@home/home.component';
import { Users } from './shared/model/Users';

const loginSuccesfullyResult = (): Users[] => {
  return [
    {
      id: 1,
      email: 'andres.villazon@ceiba.com',
      password:'',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJlcy52aWxsYXpvbkBjZWliYS5jb20uY28iLCJpZCI6IjEiLCJpYXQiOjE1MTYyMzkwMjJ9.PU9kIdBC_9CGttcUGe5BpGHKD75Sxfdbr495ZevNQ4s',
    },
  ];
};

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {path:'home', component:HomeComponent}
        ]),
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
      ],
      providers: [AuthService, HttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when validating the credentials and they are empty, it should return false', () => {
    component.loginCredentials = {
      email: '',
      password: '',
    };

    const resultValidation = component.validateCredentials();

    expect(resultValidation).toBeFalse();
  });

  it('when validating the credentials and they are filled, it should return true', () => {
    component.loginCredentials = {
      email: 'andres.villazon@ceiba.com',
      password: 'ceibaSofwtare',
    };

    const resultValidation = component.validateCredentials();

    expect(resultValidation).toBeTrue();
  });

  it('if the credentials are passed correctly, it should called the login service', () => {
    component.loginCredentials = {
      email: 'andres.villazon@ceiba.com',
      password: 'ceibaSofwtare',
    };
    const resultLogin = loginSuccesfullyResult();
    const spyLogin = spyOn(authService, 'login').and.returnValue(of(resultLogin[0]));

    component.login();

    expect(spyLogin).toHaveBeenCalled();
  });

  it('if the login is succesfully, it should redirect to private pages', () => {
    component.loginCredentials = {
      email: 'andres.villazon@ceiba.com',
      password: 'ceibaSofwtare',
    };
    const resultLogin = loginSuccesfullyResult();
    spyOn(authService, 'login').and.returnValue(of(resultLogin[0]));
    const spyRedirect = spyOn(router, 'navigate');

    component.login();

    expect(spyRedirect).toHaveBeenCalled();
  });

  it('if the login failed, it should show an alert', () => {
    component.loginCredentials = {
      email: 'andres.villazon@ceiba.com',
      password: 'ceibaSofwtare',
    };
    spyOn(window,'alert').and.callFake(()=>console.log('ejecuto alert auth'));
    spyOn(authService, 'login').and.returnValue(throwError(() => ({status:404, message:'Usuario no econtrado'})));

    component.login();

    expect(window.alert).toHaveBeenCalled();
  });
});
