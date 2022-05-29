import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CardSmallComponent} from './card-small.component';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {SliceStringPipe} from '../../pipes/slice-string.pipe';

@NgModule({
  declarations: [CardSmallComponent, SliceStringPipe],
  imports: [SharedModule, RouterModule.forChild([]), ButtonModule],
  exports: [CardSmallComponent]
})
export class CardSmallModule {
}
