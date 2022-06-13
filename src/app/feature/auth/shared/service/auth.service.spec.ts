import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Credentials } from '../model/CredentialAuth';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let httpMock: HttpTestingController;
  let service: AuthService;
  const apiEndpointLogin = environment.endpoint+'/users?email=andres.villazon@ceiba.com&password=ceibaSoftware*123&_limit=1';
  const apiEndpointFail = environment.endpoint+'/users?email=andres.villazon@ceiba.com&password=test&_limit=1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[AuthService, HttpService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  xit('should allow the sign in', () => {
    const Credentials: Credentials={
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

    service.login(Credentials).subscribe((responseLogin: any) => {
      expect(responseLogin.length).toBe(1);
      expect(responseLogin).toEqual(dummyResponseLogin);
    });

    const req = httpMock.expectOne(apiEndpointLogin);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponseLogin);
  });

  it('should NOT allow the sign in with incorrect credentials', () => {
    const Credentials: Credentials={
      email:'andres.villazon@ceiba.com',
      password:'test',
    };

    const dummyResponseLogin = [];

    service.login(Credentials).subscribe((responseLogin: any) => {
      expect(responseLogin.length).toBe(0);
      expect(responseLogin).toEqual(dummyResponseLogin);
    });

    const req = httpMock.expectOne(apiEndpointFail);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponseLogin);
  });
});
