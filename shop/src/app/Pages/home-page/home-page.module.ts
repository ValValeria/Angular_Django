import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import {CarouselModule} from 'primeng/carousel';

import {GridLayoutModule} from '../../Layouts/grid-layout/GridLayout.module';
import {HomePageComponent} from './home-page.component';
import {SectionLayoutModule} from '../../Layouts/section-layout/section-layout.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ProductCardModule} from '../../Components/product-card/product-card.module';
import {IAd} from '../../interfaces/interfaces';

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
    SectionLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ProductCardModule
  ],
  exports: [HomePageComponent]
})
export class HomePageModule {
}
