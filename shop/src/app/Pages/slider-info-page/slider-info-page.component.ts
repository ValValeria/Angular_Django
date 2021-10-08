import {Component, OnInit} from '@angular/core';
import {ISimpleResponse} from '../../interfaces/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpService} from '../../Services/Http.service';
import {from} from 'rxjs';
import {map, mergeAll} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import _ from 'lodash';

type tuple = [string, string, string];
export type image<T> = { postUrl: string, file: T, id?: number };

@Component({
  selector: 'app-slider-info-page',
  templateUrl: './slider-info-page.component.html'
})
export class SliderInfoPageComponent{
  public data: tuple = ['Отдельный товар', 'Главная', 'Продукты'];
  public pageType: tuple = ['product', 'home', 'products'];

  constructor(private snackBar: MatSnackBar,
              private httpService: HttpService
              ) {
  }
}
