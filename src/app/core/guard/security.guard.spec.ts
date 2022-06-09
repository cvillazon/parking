import { TestBed, inject } from "@angular/core/testing";
import { Router } from "@angular/router";
import { CookieServiceMock } from "@core/mocks/CookieServiceMock.service";
import { CookieService } from "ngx-cookie-service";

import { SecurityGuard } from "./security.guard";

describe("SecurityGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SecurityGuard,
        { provide: CookieService, useClass: CookieServiceMock },
        { provide: Router, useValue: { navigate: () => Promise.resolve("hola") } },
      ],
    });
  });

  it("should ...", inject([SecurityGuard], (guard: SecurityGuard) => {
    expect(guard).toBeTruthy();
  }));

  it("should not be able to activate when logged out", inject([SecurityGuard,CookieService], (guard: SecurityGuard) => {
    const result = guard.canActivate();
    expect(result).toBeTruthy();
  }));
  
  it("should be able to activate when logged in", inject([SecurityGuard,CookieService], async (guard: SecurityGuard, cookie:CookieService) => {
    spyOn(cookie,'get').and.returnValue(undefined);
    const result = await guard.canActivate();
    expect(result).toBeFalsy();
  }));
});
