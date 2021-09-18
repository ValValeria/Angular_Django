import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from '../admin-page/admin-page.component';

const routes: Routes = [
  {path: 'profile/users', pathMatch: 'full', component: AdminPageComponent}
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageModule{}
