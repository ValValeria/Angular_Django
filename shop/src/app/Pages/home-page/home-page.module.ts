import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomePageComponent} from './home-page.component';
import {CarouselModule} from 'primeng/carousel';
import {CommonModule} from '@angular/common';
import {GridLayoutModule} from '../../Layouts/grid-layout/GridLayout.module';
import {CardSmallModule} from '../../Components/card-small/card-small.module';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomePageComponent}
];

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule.forChild(routes),
    GridLayoutModule,
    CardSmallModule
  ],
  exports: [HomePageComponent]
})
export class HomePageModule {
}
