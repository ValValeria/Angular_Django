import {Component} from '@angular/core';
import {IResponse, ISimpleResponse} from '../../interfaces/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import _ from 'lodash';

@Component({
  selector: 'app-slider-info-page',
  templateUrl: './slider-info-page.component.html'
})
export class SliderInfoPageComponent{
  public data = ['Отдельный товар', 'Главная', 'Продукты'];
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

  constructor(private snackBar: MatSnackBar) {
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
         const title = this.data[pageForFileIndex];
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
}
