import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

import { SecurityGuard } from './security.guard';

describe('SecurityGuard', () => {
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers: [
        SecurityGuard,
        { provide: Router, useValue: { navigate: () => Promise.resolve('hola') } },
      ],
    });

    router = TestBed.inject(Router);
  });

  it('should ...', inject([SecurityGuard], (guard: SecurityGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should not be able to activate when NOT exist token', inject([SecurityGuard,CookieService], async (guard: SecurityGuard, cookie: CookieService) => {
    const cookieSpy = spyOn(cookie,'get').and.returnValue(undefined);
    const routerSpy = spyOn(router, 'navigate').and.callThrough();

    const result = await guard.canActivate();
    
    expect(cookieSpy).toHaveBeenCalledWith('token'); 
    expect(routerSpy).toHaveBeenCalledWith(['/login']); 
    expect(result).toBe(false);
  }));
  
  it('should be able to activate when exist token', inject([SecurityGuard,CookieService], async (guard: SecurityGuard, cookie: CookieService) => {
    const cookieSpy = spyOn(cookie,'get').and.returnValue('akljlkjalja');

    const result = guard.canActivate();
    
    expect(cookieSpy).toHaveBeenCalledWith('token');
    expect(result).toBe(true);
  }));
});
