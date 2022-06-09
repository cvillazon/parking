import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth/shared/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() drawer;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  openSidenav(){
    if (!this.drawer) return;
    this.drawer.toggle();
  }
  
  logout(){
    this.auth.logout();
  }

}
