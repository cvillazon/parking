import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedService } from '@auth/shared/guard/logged.service';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [
  { path: '', redirectTo: 'private/home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule), canActivate:[LoggedService] },
  { path: 'private', loadChildren: () => import('./feature/private/private.module').then(m => m.PrivateModule) , canActivate: [SecurityGuard]  },
  { path: "**", redirectTo: 'private/home', pathMatch: 'full',  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
