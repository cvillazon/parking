import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from './shared/model/CredentialAuth';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public loginCredentials: Credentials={
    email:'', password:''
  };

  constructor(private auth: AuthService, private router: Router) { }

  validateCredentials(){
    if(this.loginCredentials.email!=='' && this.loginCredentials.password!==''){
      return true;
    }
    return false;
  }

  login(){
    if(this.validateCredentials()){
      this.auth.login(this.loginCredentials).subscribe({
        next: () =>{
          this.router.navigate(['home']);
        },
        error:() =>{
          alert('Credenciales invalidas');
        }
      });
    }
  }

}
