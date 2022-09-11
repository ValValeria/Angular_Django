import {Component, Input} from '@angular/core';
import {IAd} from '../../interfaces/interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input()
  product!: IAd;

  constructor(private readonly router: Router) {
  }

  navigateToProductPage($event: Event): void {
    $event.preventDefault();
    this.router.navigateByUrl(`product/${this.product.id}`).catch(e => console.error(e));
  }
}
