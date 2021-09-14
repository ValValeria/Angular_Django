import {Component} from '@angular/core';

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

  uploadFile(title: string, $event: File): void {
    const index = this.data.indexOf(title);
    const url = URL.createObjectURL($event);

    this.photos[index].push(url);
  }
}
