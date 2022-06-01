import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import {CarouselModule} from 'primeng/carousel';

import {GridLayoutModule} from '../../Layouts/grid-layout/GridLayout.module';
import {HomePageComponent} from './home-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomePageComponent}
];

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule.forChild(routes),
    GridLayoutModule
  ],
  exports: [HomePageComponent]
})
export class HomePageModule {
}
