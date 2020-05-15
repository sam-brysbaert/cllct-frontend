import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './user/auth.guard';
import { ManageCategoriesComponent } from './category/manage-categories/manage-categories.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // use authguard on all the following components:
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'category/id/:id',
        component: OverviewComponent,
      },
      {
        path: '',
        redirectTo: 'category/all',
        pathMatch: 'full',
      },
      {
        path: 'category/all',
        component: OverviewComponent,
      },
      {
        path: 'category/manage',
        component: ManageCategoriesComponent,
      },
    ],
  },
  // 404 for all other (non-existent pages)
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
