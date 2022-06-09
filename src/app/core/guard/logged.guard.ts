import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  constructor(protected cookieService:CookieService, private router:Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.cookieService.get('token');

    if (!token) {
      return true;
    }

    return this.router.navigate(["/private/home"]).then(() => false)
  }
}
