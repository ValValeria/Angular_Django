import {LikeComponent} from './Like.component';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [LikeComponent],
  exports: [LikeComponent],
  imports: [SharedModule]
})
export class LikeModule{}
