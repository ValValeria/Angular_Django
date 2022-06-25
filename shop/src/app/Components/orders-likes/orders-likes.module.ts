import {OrdersLikesComponent} from './orders-likes.component';
import {SharedModule} from '../../shared/shared.module';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [SharedModule],
  declarations: [OrdersLikesComponent],
  exports: [OrdersLikesComponent]
})
export class OrdersLikesModule {
}
