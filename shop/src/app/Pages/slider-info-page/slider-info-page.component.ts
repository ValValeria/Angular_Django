import {Component, OnInit} from '@angular/core';
import {ISimpleResponse} from '../../interfaces/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpService} from '../../Services/Http.service';
import {from} from 'rxjs';
import {map, mergeAll} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import _ from 'lodash';

type tuple = [string, string, string];
export type image<T> = { postUrl: string, file: T };

@Component({
  selector: 'app-slider-info-page',
  templateUrl: './slider-info-page.component.html'
})
export class SliderInfoPageComponent{
  public data: tuple = ['Отдельный товар', 'Главная', 'Продукты'];
  public pageType: tuple = ['product', 'home', 'products'];
  public photos: {[prop in number]: image<string>[]} = {
    0: [],
    1: [],
    2: []
  };
  public photosFile: {[prop in number]: image<File>[]} = {
    0: [],
    1: [],
    2: []
  };
  public isEmpty = true;

  constructor(private snackBar: MatSnackBar,
              private httpService: HttpService
              ) {
  }

  uploadFile(title: string, $event: image<File>): void {
    const index = this.pageType.indexOf(title);

    if (index !== -1){
      const url = URL.createObjectURL($event.file);

      this.photos[index].push({ postUrl: $event.postUrl, file: url });
      this.photosFile[index].push($event);
      this.isEmpty = false;
    }
  }

  async handleSubmit(): Promise<void>{
    const formData = new FormData();
    const response = await fetch('/api/sliders/download', {
      method: 'POST',
      body: formData
    });
    const filesText = _.flattenDeep(Object.values(this.photosFile));
    const filesTextResult: string[] = await Promise.all(filesText.map(v => v.text()));

    filesTextResult.forEach((v, index) => {
      const file: File = filesText[index];
      const pageForFileIndex = Object.values(this.photosFile).findIndex(value => value.includes(file));

      if (pageForFileIndex !== -1){
        const title = this.pageType[pageForFileIndex];
        const blob = new Blob([v], { type: file.type })
        formData.append(title, blob, file.name);
      }
    });

    let message = '';

    if (response.ok && response.status === 200){
       const json: ISimpleResponse = await response.json();

       if (json.status === 'ok'){
          message = 'Your files has been uploaded successfully';
       } else{
          message = 'Your files has not been uploaded successfully. PLease, try again';
       }
    } else {
       message = 'Some errors has occurred';
    }

    this.snackBar.open(message, 'Close');
  }
}
