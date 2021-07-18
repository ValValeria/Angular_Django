import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';

export const ADD_CHARACTERISTICS_DIALOG$ = new Subject<[string, string]>();

@Component({
  selector: 'app-add-characteristics-dialog',
  templateUrl: './add-characteristics-dialog.component.html',
  styleUrls: ['./add-characteristics-dialog.component.scss']
})
export class AddCharacteristicsDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<AddCharacteristicsDialogComponent>) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(40)]),
      info: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(40)
      ])
    });
  }

  submit($event): void{
    $event.preventDefault();

    if (this.formGroup.valid){
      const data: [string, string] = [this.formGroup.get('title').value, this.formGroup.get('info').value];
      ADD_CHARACTERISTICS_DIALOG$.next(data);
      this.dialogRef.close();
    } else {
      this.snackBar.open('Please, check the validity of the fields', 'Close');
    }
  }
}
