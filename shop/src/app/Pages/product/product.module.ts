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

const routes: Routes = [
  {path: 'product/:id', component: ProductComponent}
];

@NgModule({
  declarations: [ProductComponent],
  imports: [
    RouterModule.forChild(routes),
    MatSidenavModule,
    GridLayoutModule, SharedModule,
    MatTabsModule, MatSliderModule,
    MatProgressSpinnerModule, MatButtonModule
  ]
})
export class ProductModule {
}
