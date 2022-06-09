import { Injectable } from '@angular/core';
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
    return this.http.doGet(`${environment.endpoint}/users?email=${credentials.email}&password=${credentials.password}&_limit=1`)
      .pipe(tap((user: Users[]) =>{
        if(!user){
          return throwError(() => ({status:404, message:'Usuario no econtrado'}));
        }
        this.cookie.set('token',user[0].token);
      }));
  }

  logout(){
    this.cookie.delete('token');
    this.redirectTo();
  }

  redirectTo(path='/login'){
    this.router.navigate([path]);
  }
}
