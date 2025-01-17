import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

import {ProductComponent} from './product.component';
import {SharedModule} from '../../shared/shared.module';
import {GridLayoutModule} from '../../Layouts/grid-layout/GridLayout.module';
import {CardModule} from 'primeng/card';
import {SectionLayoutModule} from '../../Layouts/section-layout/section-layout.module';

const routes: Routes = [
  {path: '', component: ProductComponent, pathMatch: 'exact'}
];

@NgModule({
  declarations: [ProductComponent],
  imports: [
    RouterModule.forChild(routes),
    MatSidenavModule,
    GridLayoutModule, SharedModule,
    MatTabsModule, MatSliderModule,
    MatProgressSpinnerModule, MatButtonModule,
    CardModule, SectionLayoutModule
  ]
})
export class ProductModule {
}
