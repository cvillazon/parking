import { Component, Input } from '@angular/core';
import { AuthService } from '@auth/shared/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  @Input() drawer;
  constructor(private auth: AuthService) { }

  openSidenav(){
    if (typeof this.drawer === 'object'){
      this.drawer.toggle();
    }
  }
  
  logout(){
    this.auth.logout();
  }

}
