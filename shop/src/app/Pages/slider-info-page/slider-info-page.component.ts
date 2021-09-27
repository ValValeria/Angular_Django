import {Component, OnInit} from '@angular/core';
import {ISimpleResponse} from '../../interfaces/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpService} from '../../Services/Http.service';
import {from} from 'rxjs';
import {map, mergeAll} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import _ from 'lodash';

type tuple = [string, string, string];

@Component({
  selector: 'app-slider-info-page',
  templateUrl: './slider-info-page.component.html'
})
export class SliderInfoPageComponent{
  public data: tuple = ['Отдельный товар', 'Главная', 'Продукты'];
  public pageType: tuple = ['product', 'home', 'products'];
  public photos: {[prop in number]: string[]} = {
    0: [],
    1: [],
    2: []
  };
  public photosFile: {[prop in number]: File[]} = {
    0: [],
    1: [],
    2: []
  };

  constructor(private snackBar: MatSnackBar,
              private httpService: HttpService
              ) {
  }

  uploadFile(title: string, $event: File): void {
    const index = this.data.indexOf(title);

    if (index !== -1){
      const url = URL.createObjectURL($event);

      this.photos[index].push(url);
      this.photosFile[index].push($event);
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
      const file = filesText[index];
      const pageForFileIndex = Object.values(this.photosFile).findIndex(value => value.includes(file));

      if (pageForFileIndex !== -1){
         const title = this.pageType[pageForFileIndex];
         formData.append(title, v, file.name);
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

  loadPrevImages($event: string[], type: string): void{
    from($event)
      .pipe(
        map(v => {
          return this.httpService.get<any>(v, {responseType: 'blob', observe: 'response'});
        }),
        mergeAll()
      )
      .subscribe((v: HttpResponse<Blob>) => {
        const fileName = _.last(v.url.split('/')) ?? 'image.png';
        const file = new File([v.body], fileName, {type: v.body.type, lastModified: Date.now()});
        const index = this.pageType.indexOf(type);

        this.photosFile[index].push(file);
      });
  }
}
