import {SliderInfoPageComponent} from './slider-info-page.component';
import {SharedModule} from '../../shared/shared.module';
import {NgModule} from '@angular/core';
import {SliderInfoContentComponent} from '../../Components/slider-info-content/slider-info-content.component';
import {SectionLayoutModule} from '../../Layouts/section-layout/section-layout.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: SliderInfoPageComponent}
];

@NgModule({
  declarations: [SliderInfoPageComponent,  SliderInfoContentComponent],
  imports: [SharedModule, SectionLayoutModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SliderInfoPageModule{}
