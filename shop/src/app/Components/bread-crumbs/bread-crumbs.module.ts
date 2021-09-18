import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {BreadCrumbsComponent} from './bread_crumbs.component';

@NgModule({
  imports: [SharedModule],
  declarations: [BreadCrumbsComponent],
  exports: [BreadCrumbsComponent]
})
export class BreadCrumbsModule{}
