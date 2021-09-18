import {OrdersLikes} from './OrdersLikes.component';
import {SharedModule} from '../../shared/shared.module';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [SharedModule],
  declarations: [OrdersLikes],
  exports: [OrdersLikes]
})
export class OrdersLikesModule{}
