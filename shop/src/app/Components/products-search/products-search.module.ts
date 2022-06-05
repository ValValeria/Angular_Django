import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsSearchComponent} from './products-search.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  declarations: [ProductsSearchComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule
  ],
  exports: [ProductsSearchComponent]
})
export class ProductsSearchModule {
}
