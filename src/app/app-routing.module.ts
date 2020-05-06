import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'overview', canActivate: [AuthGuard], component: OverviewComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
