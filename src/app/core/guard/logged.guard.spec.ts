import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { LoggedService } from './logged.guard';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJlcy52aWxsYXpvbkBjZWliYS5jb20uY28iLCJpZCI6IjEiLCJpYXQiOjE1MTYyMzkwMj';
describe('LoggedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggedService,
        {
          provide: Router,
          useValue: { navigate: () => Promise.resolve('return Promise!') },
        },
      ],
    });
  });

  it('should create', inject([LoggedService], (logged: LoggedService) => {
    expect(logged).toBeTruthy();
  }));

  it('should not be able to activate when logged in', inject([LoggedService,CookieService], async (logged: LoggedService,cookie: CookieService) => {
    spyOn(cookie,'get').and.returnValue(TOKEN);
    const result = await logged.canActivate();
    expect(result).toBeFalsy();
  }));
  
  it('should be able to activate when logged out', inject([LoggedService,CookieService], async (logged: LoggedService, cookie: CookieService) => {
    spyOn(cookie,'get').and.returnValue(undefined);
    const result = logged.canActivate();
    expect(result).toBeTruthy();
  }));
});
