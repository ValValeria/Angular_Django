import {AfterViewInit, Component, ElementRef, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatDrawer} from '@angular/material/sidenav';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {fromEvent} from 'rxjs';
import {URL_PATH} from 'src/app/app.component';
import {ProductPageImageComponent} from 'src/app/Components/product-page-image/product-page-image.component';
import {IAd, IResponse} from 'src/app/interfaces/interfaces';
import {HttpService} from 'src/app/services/http.service';
import {USER_AUTH, UserService} from 'src/app/services/user.service';
import {HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs/internal/Subject';
import {filter, map, mergeMap} from 'rxjs/operators';
import {ProductService} from '../../services/product.service';
import {CharactaricticsComponent} from '../../Components/Charactarictics/Charactarictics.component';
import _ from 'lodash';
import {IProductResponse} from '../../guards/product.resolver';


export const handleClose$ = new Subject();
export const DELETE_PRODUCT$ = new Subject<void>();


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit, AfterViewInit {
  postId: number;
  post: IAd;
  pageIndex = 1;
  charactarictics: [string, string][];
  count = 1;
  maxCount = 0;
  @ViewChild('drawer', {read: MatDrawer}) drawer: MatDrawer;
  @ViewChild('image', {read: ElementRef}) image: ElementRef<HTMLImageElement>;
  @ViewChildren('editable', {read: ElementRef}) editable: QueryList<ElementRef>;
  @ViewChild('hot_ads', {read: ElementRef}) hotAds: ElementRef;
  @ViewChild(CharactaricticsComponent) charactaricticsComponent: CharactaricticsComponent;
  products: IAd[] = [];
  otherPosts: IAd[] = [];
  showDrawer = false;
  manufactureInfo: [string, string][];

  constructor(private http: HttpService,
              private route: ActivatedRoute,
              private router: Router,
              @SkipSelf() public user: UserService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private productService: ProductService,
  ) {

    this.route.paramMap.subscribe(v => {
      this.postId = Number(v.get('id'));
    });
    this.charactarictics = [];
    this.post = {...this.productService};
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(v => v.get('id')),
        mergeMap(v => this.http.get(`${URL_PATH}api/product/${v}`))
      )
      .subscribe(async (data) => {
        const v = data as IProductResponse;

        this.post = v.data;
        this.charactarictics = this.post.characterictics.split(';').map(str => {
          const array = str.split(':');
          return [array[0], array[1]];
        });
        this.manufactureInfo = [
          ['Изготовитель', this.post.brand],
          ['Категория товара', this.post.category],
        ];

        this.http.get<{ data: IAd[] }>(`${URL_PATH}api/products?page=1&exclude=${this.post.id}`, {}).subscribe(v1 => {
          if ((v1.data || []).length) {
            this.products = v1.data;
          }
        });
      });

    handleClose$.subscribe(v => {
      this.dialog.closeAll();
    });
  }

  ngAfterViewInit(): void {
    const footer = document.querySelector('footer');
    const func = () => {
      const sidebar: HTMLElement = document.querySelector('.product__sidebar ');

      if (sidebar) {
        const header = Array.from(document.querySelectorAll('header')).find(v => {
          return getComputedStyle(v).display !== 'none' && !v.hidden;
        });
        const headerHeight = header.getBoundingClientRect().height;
        const docElem = document.documentElement;
        const elem = document.elementFromPoint(0, docElem.clientHeight - docElem.clientTop - 1);

        if (elem.tagName.toLowerCase() === 'footer') {
          sidebar.style.top = headerHeight + 'px';
          sidebar.style.height = `${Math.abs(footer.offsetTop - pageYOffset - headerHeight)}px`;
        } else {
          sidebar.style.height = '100%';
        }
      }
    };

    fromEvent(window, 'scroll').subscribe(func);

    func();

    USER_AUTH.pipe(filter(v => v)).subscribe(v1 => {
      this.http.get<{ data: { count: number } }>(`/api/product-count?product_id=` + this.postId).subscribe(v => {
        this.maxCount = v.data.count;
      });

      this.setContentEditable();
    });
  }

  setContentEditable(): void {
    if (this.user.isSuperUser()) {
      const elements = [...this.editable];

      elements.forEach(v => {
        (v.nativeElement as HTMLElement).setAttribute('contenteditable', '');
      });
    }
  }

  async buyItem(): Promise<void> {
    if (!this.user.is_auth) {
      await this.router.navigateByUrl('/authenticate');
    } else {
      if (this.count) {
        this.http.get<{ messages: string[], data: string[], status: string }>(`${URL_PATH}api/addorder?product_id=${this.postId}&count=${this.count}`)
          .subscribe(v => {
            if (v.status === 'ok') {
              this.snackBar.open('Товар добавлен в корзину', 'Закрыть', {
                duration: 5000
              });
            } else {
              this.snackBar.open('Похоже, этот товар закончился', 'Закрыть', {
                duration: 10000
              });
            }
          });
      } else {
        this.snackBar.open('Выбирите нужное количество товара', 'Закрыть', {
          duration: 5000
        });
      }
    }
  }

  showImages(): void {
    if (this.post.image.length) {
      this.dialog.open(ProductPageImageComponent, {
        data: {src: this.post.image},
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw'
      });
    }
  }

  async showOtherBrands(): Promise<void> {
    try {
      const config = {
        params: new HttpParams().set('brand', this.post.brand).set('page', '1')
      };
      const response: IResponse = await this.http.get('/api/sort/', config).toPromise() as IResponse;
      const data = response?.data.result || [];

      this.otherPosts.push(...data);
      this.showDrawer = true;
    } catch (e) {
      console.warn('Http error ...');
    }
  }

  async saveChanges(): Promise<void> {
    this.productService.characterictics = this.charactarictics.map(v => v.join(':')).join(';');
    this.productService.brand = this.manufactureInfo[0][1];
    this.productService.category = this.manufactureInfo[1][1];
    this.productService.id = this.post.id;

    const forbiddenRoles = ['image', 'characterictics', 'uploadedFile'];
    const formData = new FormData();

    this.editable.forEach((v) => {
      const element = v.nativeElement as HTMLElement;
      const role = (v.nativeElement as HTMLElement).dataset.role;

      if (!forbiddenRoles.includes(role)) {
        if (Object.keys(this.productService).includes(role)) {
          this.productService[role] = element.textContent;
        }
      }
    });

    Object.entries(this.productService).forEach(([k, v]) => {
      formData.append(k, v);
    });

    if (this.productService.uploadedFile && this.productService.uploadedFile instanceof File) {
      formData.set('image', this.productService.uploadedFile, this.productService.uploadedFile.name);
    } else if (this.post.image) {
      const response = await fetch(this.post.image);
      const img = await response.blob();
      const randomInt = Math.random() * 2999 + 1;
      const originalFilename = _.last(this.post.image.split('/'));
      const fileName = randomInt.toString().concat(originalFilename);

      formData.set('image', img, fileName);
    }

    formData.set('price', this.post.price.toString());
    formData.set('rating', this.post.rating.toString());

    this.http.post(`/api/change-product/`, formData)
      .subscribe(v => {
        this.snackBar.open('The product is updated', 'Close');
      });
  }

  deleteProduct(): void {
    this.http.get(`/api/delete-product/?id=${this.post.id}`).subscribe(v => {
      setTimeout(async () => {
        this.snackBar.open('The product is deleted', 'Close');

        await this.router.navigateByUrl('/products');

        DELETE_PRODUCT$.next();
      }, 1000);
    });
  }

  uploadImage(files: FileList): void {
    const file = files.item(0);

    if (file) {
      this.post.image = URL.createObjectURL(file);
      this.productService.uploadedFile = file;

      setTimeout(() => {
        this.image.nativeElement.src = this.post.image;
      });
    }
  }

  async navigateToAuthPage(): Promise<void> {
    await this.router.navigateByUrl('/authenticate?isLogin=true');
  }
}
