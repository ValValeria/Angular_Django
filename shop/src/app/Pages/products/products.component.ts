import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IAd, IProductsResponse, ProductsBrand} from 'src/app/interfaces/interfaces';
import {HttpService} from 'src/app/services/http.service';
import {HttpParams} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {URL_PATH} from 'src/app/app.component';
import {tap} from 'rxjs/operators';
import {DELETE_PRODUCT$} from '../product/product.component';

interface IResponse {
  data: IAd[];
  has_next: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        query('.card-sm', [
          style({
            opacity: 0
          }),
          stagger('250ms', [
            animate('1.2s ease-out', style({
              opacity: 1
            }))]
          )
        ])
      ]),
    ])
  ]
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('productsElem', {read: ElementRef})
  productsElem: ElementRef;
  @ViewChild('mediaSearch', {read: TemplateRef})
  matMediaSearchContainer: TemplateRef<any>;

  @Input()
  isSearch = false;
  @Input()
  isCategoryPage = false;
  @Input()
  searchText = '';

  maxPrice = 0;
  brands: string[];
  activeCategory: string;
  activeBrand: string;
  page = 1;
  hasNext = false;
  isEmpty: boolean;
  sentHttp: boolean;
  maxPriceValue = 4000;
  readonly MIN_WIDTH: number = 950;
  showModel = false;
  minPrice = 0;
  urls: [string, string][];

  products: IAd[];
  disabled = true;
  panelOpenState = false;
  categories: string[];

  constructor(
    private http: HttpService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.products = [];
    this.categories = [];
  }

  ngOnInit(): void {
    this.sentHttp = true;

    if (this.isSearch) {
      this.urls = [['/', 'Home'], ['/products', 'Products'], ['/search', 'Search']];
    } else if (this.isCategoryPage) {
      this.urls = [['/', 'Home'], ['/category', 'Categories']];
    } else {
      this.urls = [['/', 'Home'], ['/products', 'Products']];
    }

    this.route.data
      .pipe(
        tap((v) => {
          const data: IProductsResponse = v.productsInfo;
          this.categories = data.categories;
          this.maxPrice = data.maxPrice;
          this.maxPriceValue = data.maxPriceValue;
        })
      )
      .subscribe(v => {
        if (this.isCategoryPage) {
          this.route.paramMap.subscribe(v2 => {
            setTimeout(() => {
              this.activeCategory = v2.get('category');
              this.formRequest(false);
            }, 0);
          });
        } else {
          this.formRequest(false);
        }
      });

    DELETE_PRODUCT$.subscribe(v => {
      this.formRequest(false);
    });
  }

  undoCategory(): void {
    this.undoSearch();
  }

  showMenu(): void {
    this.dialog.open(this.matMediaSearchContainer, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw'
    });

    document.body.classList.add('overflow-hidden');

    this.dialog.afterAllClosed.subscribe(v => {
      document.body.classList.remove('overflow-hidden');
    });
  }

  checkData(): void {
    this.isEmpty = !this.products.length;
    this.sentHttp = false;
  }

  ngAfterViewInit(): void {

    this.getBrands({value: ''});

    const onScroll = () => {
      const func = () => {
        const width = document.documentElement.clientWidth;

        this.showModel = width < this.MIN_WIDTH;

        this.dialog.afterOpened.subscribe(v => {
          const matSearchContainer = document.querySelector('.product__search-wrap');
          matSearchContainer.classList.add('shadow-none');

          const matDialog = document.querySelector('mat-dialog-container');
          matDialog.classList.add('bg-white');
        });

        this.dialog.afterAllClosed.subscribe(v => {
          const matSearchContainer = document.querySelector('.product__search-wrap');
          if (matSearchContainer) {
            matSearchContainer.classList.remove('shadow-none');
          }
        });
      };
      setTimeout(func.bind(this), 0);
    };

    window.onresize = onScroll.bind(this);

    onScroll();
  }

  getBrands($event: { value: string }): void {
    setTimeout(() => {
      this.activeCategory = $event.value || '';

      let url = `${URL_PATH}api/getbrands/?category=` + encodeURIComponent(this.activeCategory);

      if (this.isSearch) {
        url += '&search=' + encodeURIComponent(this.searchText);
      }

      this.http.get<ProductsBrand>(url)
        .subscribe((v) => {
          this.brands = v.data.brands;
        });
    }, 0);
  }

  sort(next = false): void | null {
    this.sentHttp = true;

    this.dialog.closeAll();

    if (this.minPrice === this.maxPrice) {
      this.snackBar.open('Минимальная цена не должна равняться максимальной', 'Close');
      return;
    }

    if (this.minPrice > this.maxPrice) {
      this.snackBar.open('Минимальная цена не должна быть  больше максимальной', 'Close');
      return;
    }

    this.dialog.afterAllClosed.subscribe(this.formRequest.bind(this, next));
  }

  formRequest(next): void {
    if (!next) {
      this.page = 1;
      this.products = [];
    }
    const config = {
      params: new HttpParams().set('min', this.minPrice.toString())
        .set('max', this.maxPrice.toString())
        .set('category', this.activeCategory || '')
        .set('brand', this.activeBrand || '')
        .set('page', String(this.page))
    };

    const url = `${URL_PATH}api/sort/`;

    if (this.isSearch) {
      config.params.set('search', this.searchText);
    }

    this.http.get<IResponse>(url, config).subscribe(v => {
      if (v.data.length) {

        v.data.forEach(element => {
          const index = this.products.findIndex(v1 => Number(v1.id) === Number(element.id));

          if (index === -1) {
            this.products.push(element);
          }
        });

        this.hasNext = v.has_next;
      }
      this.checkData();
    });
  }

  changeBrand($event): void {
    this.activeBrand = $event.value;
  }

  showNext(): void {
    this.page = this.page + 1;
    this.sort(true);
  }

  undoSearch(): void {
    this.router.navigateByUrl('/products').then(r => console.log('navigated'));
  }

  activePrice(): string {
    return `Товары от ${this.minPrice}грн до ${this.maxPrice}грн`;
  }

  close(): void {
    this.dialog.closeAll();
  }
}
