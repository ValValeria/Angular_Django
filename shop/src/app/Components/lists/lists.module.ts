import {NgModule} from '@angular/core';
import {ListsComponent} from './lists.component';
import {SharedModule} from '../../shared/shared.module';

const exports = [ListsComponent];

@NgModule({
  declarations: [...exports],
  exports: [...exports],
  imports: [SharedModule]
})
export class ListsModule{}
