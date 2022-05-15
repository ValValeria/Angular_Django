import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs';
import {IProductsResponse, ProductsInfo} from '../interfaces/interfaces';
import {map} from 'rxjs/operators';
import {HttpService} from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataResolver implements Resolve<IProductsResponse> {
  constructor(private http: HttpService){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<IProductsResponse> {
    const url = '/api/info-products/';

    return this.http.get<ProductsInfo>(url).pipe(map(v => {
      const categories = v.data.categories;
      const maxPrice = v.data.price[1].max_price;
      const maxPriceValue = v.data.price[1].max_price;
      const obj: IProductsResponse = {categories, maxPrice, maxPriceValue};

      return obj;
    }));
  }
}
