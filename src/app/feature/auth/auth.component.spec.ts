import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "@core/services/http.service";
import { loginSuccesfullyResult } from "mocks/AuthDataMock";
import { of, throwError } from "rxjs";
import { PrivateComponent } from "../private/private.component";

import { AuthComponent } from "./auth.component";
import { AuthService } from "./shared/service/auth.service";

describe("AuthComponent", () => {
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
          {path:"private", component:PrivateComponent}
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
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("when validating the credentials and they are empty, it should return false", () => {
    component.loginCredentials = {
      email: "",
      password: "",
    };

    let resultValidation = component.validateCredentials();

    expect(resultValidation).toBeFalse();
  });

  it("when validating the credentials and they are filled, it should return true", () => {
    component.loginCredentials = {
      email: "andres.villazon@ceiba.com",
      password: "ceibaSofwtare",
    };

    let resultValidation = component.validateCredentials();

    expect(resultValidation).toBeTrue();
  });

  it("if the credentials are passed correctly, it should called the login service", () => {
    component.loginCredentials = {
      email: "andres.villazon@ceiba.com",
      password: "ceibaSofwtare",
    };
    let resultLogin = loginSuccesfullyResult()
    let spyLogin = spyOn(authService, "login").and.returnValue(of(resultLogin));

    component.login();

    expect(spyLogin).toHaveBeenCalled();
  });

  it("if the login is succesfully, it should redirect to private pages", () => {
    component.loginCredentials = {
      email: "andres.villazon@ceiba.com",
      password: "ceibaSofwtare",
    };
    let resultLogin = loginSuccesfullyResult()
    spyOn(authService, "login").and.returnValue(of(resultLogin));
    let spyRedirect = spyOn(router, "navigate");

    component.login();

    expect(spyRedirect).toHaveBeenCalled();
  });

  it("if the login failed, it should show an alert", () => {
    component.loginCredentials = {
      email: "andres.villazon@ceiba.com",
      password: "ceibaSofwtare",
    };
    spyOn(window, 'alert').and.callFake(()=>console.log('ejecuto alert auth'));
    spyOn(authService, "login").and.returnValue(throwError(() => ({status:404, message:"Usuario no econtrado"})));

    component.login();

    expect(window.alert).toHaveBeenCalled();
  });
});
