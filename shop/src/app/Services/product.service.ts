import { Injectable } from '@angular/core';
import {IAd} from '../Interfaces/Interfaces';

@Injectable()
export class ProductService implements IAd{

  constructor() {
     this.brand = '';
     this.category = '';
     this.characterictics = '';
     this.count = 0;
     this.descr = '';
     this.id = 0;
     this.image = '';
     this.price = 0;
     this.short_description = '';
     this.long_description = '';
     this.status = 'unlimited';
     this.title = '';
  }

  brand: string;
  category: string;
  characterictics: string;
  count: number;
  descr: string;
  id: number;
  image: string;
  long_description: string;
  price: number;
  short_description: string;
  status: 'limited' | 'unlimited';
  title: string;
}
