import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateUserInfoComponent } from './components/update-user-info/update-user-info.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: MainComponent, canActivate: [LoginGuard] },
  { path: 'maps', component: MapComponent, canActivate: [LoginGuard] },
  { path: 'update', component: UpdateUserInfoComponent, canActivate: [LoginGuard] },
  { path: "**", pathMatch: "full", redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
