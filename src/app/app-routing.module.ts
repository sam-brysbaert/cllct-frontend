import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './user/auth.guard';
import { ManageCategoriesComponent } from './category/manage-categories/manage-categories.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: 'category/id/:id',
    canActivate: [AuthGuard],
    component: OverviewComponent,
  },
  {
    path: 'category/all',
    canActivate: [AuthGuard],
    component: OverviewComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'category/manage', component: ManageCategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
