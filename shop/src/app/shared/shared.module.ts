import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {ChartsModule} from 'ng2-charts';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';


const modules = [
  MatCardModule,
  MatButtonModule, CommonModule,
  MatProgressSpinnerModule, MatCardModule,
  ReactiveFormsModule, MatFormFieldModule,
  MatIconModule, FormsModule,
  MatSliderModule, MatSidenavModule,
  MatInputModule, MatSelectModule,
  MatSlideToggleModule, MatStepperModule,
  MatExpansionModule, MatSnackBarModule,
  MatDividerModule, MatTabsModule,
  MatSortModule, MatTableModule,
  ChartsModule, MatCheckboxModule,
  MatChipsModule, MatProgressBarModule,
  MatDialogModule,
  MatListModule,
  MatRadioModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedModule{}
