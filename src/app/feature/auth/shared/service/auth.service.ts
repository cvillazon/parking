import {Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../model/CredentialAuth';
import { Users } from '../model/Users';

@Injectable()
export class AuthService {

  constructor(protected http: HttpService, private cookie: CookieService, private router: Router) { }

  login(credentials: Credentials){
    credentials.token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJlcy52aWxsYXpvbkBjZWliYS5jb20uY28iLCJpZCI6IjEiLCJpYXQiOjE1MTYyMzkwMjJ9.PU9kIdBC_9CGttcUGe5BpGHKD75Sxfdbr495ZevNQ4s';

    // throw Error('HOLA SOY EL ERROR');
    return this.http.doPost(`${environment.endpoint}/users`,credentials)
      .pipe(tap((user: Users) =>{
        if(!user){
          return throwError(() => ({status:404, message:'Usuario no econtrado'}));
        }
        this.cookie.set('token',user.token);
      }));
  }

  logout(){
    this.cookie.delete('token','/');
    this.redirectTo();
  }

  redirectTo(path='/login/'){
    this.router.navigate([path]);
  }
}
