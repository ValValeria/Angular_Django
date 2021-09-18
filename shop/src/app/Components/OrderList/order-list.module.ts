import {NgModule} from '@angular/core';
import {OrderListComponent} from './OrderList.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [OrderListComponent],
  exports: [OrderListComponent],
  imports: [SharedModule]
})
export class OrderListModule{}
