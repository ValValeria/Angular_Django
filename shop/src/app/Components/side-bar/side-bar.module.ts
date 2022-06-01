import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar.component';



@NgModule({
    declarations: [SideBarComponent],
    exports: [
        SideBarComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SideBarModule { }
