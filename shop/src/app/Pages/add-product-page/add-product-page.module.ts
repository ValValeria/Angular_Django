import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {AddProductPageComponent} from './add-product-page.component';
import {RouterModule, Routes} from '@angular/router';
import {AddProductFormComponent} from '../../Components/add-product-form/add-product-form.component';
import {AddCharacteristicsDialogComponent} from '../../Components/add-characteristics-dialog/add-characteristics-dialog.component';
import {SectionLayoutModule} from '../../Layouts/section-layout/section-layout.module';

const routes: Routes = [
  {path: 'profile/add-product', pathMatch: 'full', component: AddProductPageComponent}
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), SectionLayoutModule],
  declarations: [AddProductPageComponent, AddProductFormComponent, AddCharacteristicsDialogComponent],
  exports: [RouterModule]
})
export class AddProductPageModule{}
