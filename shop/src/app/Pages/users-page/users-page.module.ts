import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import { UsersPageComponent } from './users-page.component';

const routes: Routes = [
  { path: '', component: UsersPageComponent}
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageModule{}
