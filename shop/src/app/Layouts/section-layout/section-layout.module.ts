import {NgModule} from '@angular/core';
import {SectionLayoutComponent} from './section-layout.component';
import {SharedModule} from '../../shared/shared.module';

/**
 * exports - массив компонентов, директив и фильтров, которыми пользуются другие модули, если они импортируют текущий;
 */
@NgModule({
  declarations: [SectionLayoutComponent],
  exports: [SectionLayoutComponent],
  imports: [SharedModule]
})
export class SectionLayoutModule{}
