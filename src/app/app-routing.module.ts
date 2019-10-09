import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OAuth2RedirectHandlerComponent } from './oauth2-redirect-handler/oauth2-redirect-handler.component';
import { HomeModule } from './home/home.module';
import { GroupDetailModule } from './group-detail/group-detail.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './authgaurd/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => HomeModule, canActivate: [AuthGuard]},
  { path: 'groupdetail/:id', loadChildren: () => GroupDetailModule, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'oauth2/redirect', component: OAuth2RedirectHandlerComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
