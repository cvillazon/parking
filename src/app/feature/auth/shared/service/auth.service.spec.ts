import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthComponent } from '@auth/auth.component';
import { HttpService } from '@core/services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Credentials } from '../model/CredentialAuth';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let httpMock: HttpTestingController;
  let service: AuthService;
  let router: Router;
  let cookie: CookieService;
  const apiEndpointLogin = environment.endpoint+'/users';
  // const apiEndpointFail = environment.endpoint+'/users?email=andres.villazon@ceiba.com&password=test&_limit=1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [
            {path:'login', component: AuthComponent}
          ]
        )
      ],
      providers:[AuthService, HttpService,CookieService]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    cookie = TestBed.inject(CookieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should allow the sign in', () => {
    const cred: Credentials={
      email:'andres.villazon@ceiba.com',
      password:'ceibaSoftware*123',
    };

    const dummyResponseLogin = [
      {
        'id': 1,
        'name': 'Andres Villazon',
        'email': 'andres.villazon@ceiba.com',
        'password': 'ceibaSoftware*123',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJlcy52aWxsYXpvbkBjZWliYS5jb20uY28iLCJpZCI6IjEiLCJpYXQiOjE1MTYyMzkwMjJ9.PU9kIdBC_9CGttcUGe5BpGHKD75Sxfdbr495ZevNQ4s'
      }
    ];

    const spyCookie = spyOn(cookie,'set').and.callThrough();

    service.login(cred).subscribe((responseLogin: any) => {
      expect(responseLogin).toEqual(dummyResponseLogin);
      expect(spyCookie).toHaveBeenCalledWith('token',dummyResponseLogin['token']);
    });

    const req = httpMock.expectOne(apiEndpointLogin);
    expect(req.request.method).toBe('POST');
  
    req.flush(dummyResponseLogin);
  });

  // it('should NOT allow the sign in with incorrect credentials', () => {
  //   const cred: Credentials={
  //     email:'andres.villazon@ceiba.com',
  //     password:'test',
  //   };

  //   const dummyResponseLogin = [];

  //   service.login(cred).subscribe((responseLogin: any) => {
  //     expect(responseLogin.length).toBe(0);
  //     expect(responseLogin).toEqual(dummyResponseLogin);
  //   });

  //   const req = httpMock.expectOne(apiEndpointFail);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(dummyResponseLogin);
  // });

  it('should redirectTo', () => {
    

    const spyRouter = spyOn(router,'navigate').and.callFake(() =>{
      return null;
    });
    service.redirectTo();

    expect(spyRouter).toHaveBeenCalledOnceWith(['/login/']);
    
  });
  
  it('should close sesion', () => {
    const spyCookie = spyOn(cookie,'delete').and.callFake(() =>{
      return null;
    });
    service.logout();

    expect(spyCookie).toHaveBeenCalledWith('token','/');
  });
});
