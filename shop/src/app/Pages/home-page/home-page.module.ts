import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomePageComponent} from './home-page.component';
import {CarouselModule} from 'primeng/carousel';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomePageComponent}
];

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule.forChild(routes)
  ],
  exports: [HomePageComponent]
})
export class HomePageModule {
}
