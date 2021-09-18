import {NgModule} from '@angular/core';
import {GridLayoutComponent} from './GridLayout.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [GridLayoutComponent],
    imports: [SharedModule],
    exports: [GridLayoutComponent]
})
export class GridLayoutModule{}
