import {NgModule} from '@angular/core';
import {SideBarComponent} from './side-bar.component';
import {MatListModule} from '@angular/material/list';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [SideBarComponent],
  exports: [
    SideBarComponent
  ],
  imports: [
    SharedModule,
    MatListModule
  ]
})
export class SideBarModule {
}
