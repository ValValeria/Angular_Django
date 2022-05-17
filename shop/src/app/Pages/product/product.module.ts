import {NgModule} from '@angular/core';

import {ProductComponent} from './product.component';
import {RouterModule, Routes} from '@angular/router';
import {MatSidenavModule} from "@angular/material/sidenav";
import {GridLayoutModule} from "../../Layouts/grid-layout/GridLayout.module";
import {CardSmallModule} from "../../Components/card-small/card-small.module";
import {CommonModule} from "@angular/common";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSliderModule} from "@angular/material/slider";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {path: 'product/:id', component: ProductComponent}
];

@NgModule({
  declarations: [ProductComponent],
  imports: [RouterModule.forChild(routes), MatSidenavModule, GridLayoutModule, CardSmallModule, CommonModule, MatTabsModule, MatSliderModule, MatProgressSpinnerModule, MatButtonModule]
})
export class ProductModule {}
