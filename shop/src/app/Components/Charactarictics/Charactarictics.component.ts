import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {UserService} from '../../Services/User.service';
import {find, remove, isEqual} from 'lodash';
import {MatDialog} from '@angular/material/dialog';
import {
  ADD_CHARACTERISTICS_DIALOG$,
  AddCharacteristicsDialogComponent
} from '../add-characteristics-dialog/add-characteristics-dialog.component';
import {stringArray} from '../../Interfaces/Interfaces';


@Component({
    selector: 'app-charactarictics',
    templateUrl: './Charactarictics.component.html',
    styleUrls: ['./Charactarictics.component.scss']
})
export class CharactaricticsComponent {
    fullData: stringArray;
    @Input('data') set data(value: stringArray){
       value.forEach((v, index, array) => {
         if (!find(this.fullData, v)){
            this.fullData.push(v);
         }
       });
    }

    constructor(public user: UserService,
                private dialog: MatDialog
                ){
      this.fullData = [];
    }

    getClasses(): string[]{
      const classes = ['characteristics', 'w-100'];

      if (this.user.isSuperUser()){
        classes.push('center', 'justify-content-between', 'align-items-start');
      }

      return classes;
    }

    addNewCharactarictics(): void{
       const dialogRef = this.dialog.open(AddCharacteristicsDialogComponent, {
         width: '100vw',
         height: '100vh',
         maxWidth: '100vw'
       });

       const obj = ADD_CHARACTERISTICS_DIALOG$.subscribe(v => {
         this.fullData.push(v);
       });

       dialogRef.afterClosed().subscribe(v => {
         obj.unsubscribe();
       });
    }

    deleteCharacterictics(data: [string, string]): void{
       remove(this.fullData, (value) => {
          if (isEqual(value, data)){
            return true;
          }

          return false;
       });
    }
}
