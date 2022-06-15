import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedService } from '@core/guard/logged.guard';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule), canActivate:[LoggedService] },
  { path: '', loadChildren: () => import('./feature/parking/private.module').then(m => m.PrivateModule) , canActivate: [SecurityGuard]  },
  { path: '**', redirectTo: 'home', pathMatch: 'full',  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
