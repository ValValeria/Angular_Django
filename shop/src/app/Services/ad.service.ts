import { Injectable } from '@angular/core';
import {IAd} from '../Interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdService implements IAd{
  constructor() { }

  brand: string;
  category: string;
  characterictics: string;
  count: number;
  descr: string;
  id: number;
  image: string;
  // tslint:disable-next-line:variable-name
  long_description: string;
  price: number;
  // tslint:disable-next-line:variable-name
  short_description: string;
  status: 'limited' | 'unlimited';
  title: string;
}
