import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { LoggedService } from './logged.guard';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJlcy52aWxsYXpvbkBjZWliYS5jb20uY28iLCJpZCI6IjEiLCJpYXQiOjE1MTYyMzkwMj';
describe('LoggedService', () => {
  let router: Router;
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

    router = TestBed.inject(Router);
  });

  it('should create', inject([LoggedService], (logged: LoggedService) => {
    expect(logged).toBeTruthy();
  }));

  it('should not be able to activate when exist token', inject([LoggedService,CookieService], async (logged: LoggedService,cookie: CookieService) => {
    const spyCookie = spyOn(cookie,'get').and.returnValue(TOKEN);
    const routerSpy = spyOn(router, 'navigate').and.callThrough();

    const result = await logged.canActivate();
    expect(result).toBe(false);
    expect(spyCookie).toHaveBeenCalledWith('token');
    expect(routerSpy).toHaveBeenCalledWith(['/home']); 
  }));
  
  it('should be able to activate when NOT exist token', inject([LoggedService,CookieService], async (logged: LoggedService, cookie: CookieService) => {
    const spyCookie = spyOn(cookie,'get').and.returnValue(undefined);
    const result = logged.canActivate();
    expect(result).toBe(true);
    expect(spyCookie).toHaveBeenCalledWith('token');
  }));
});
