import {NgModule} from '@angular/core';

import {CardSmallComponent} from './card-small.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {SliceStringPipe} from '../../pipes/slice-string.pipe';

@NgModule({
  declarations: [CardSmallComponent, SliceStringPipe],
  imports: [SharedModule, RouterModule, ButtonModule],
  exports: [CardSmallComponent]
})
export class CardSmallModule {
}
