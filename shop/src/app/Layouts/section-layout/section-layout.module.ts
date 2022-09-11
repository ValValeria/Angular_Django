import {NgModule} from '@angular/core';
import {SectionLayoutComponent} from './section-layout.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [SectionLayoutComponent],
  exports: [SectionLayoutComponent],
  imports: [SharedModule]
})
export class SectionLayoutModule{}
