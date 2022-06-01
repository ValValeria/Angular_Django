import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {IAd} from 'src/app/interfaces/interfaces';
import {HttpService} from 'src/app/services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public ads: IAd[] = [];
  public error = false;
  public items: { link: string, image: string }[];
  public responsiveOptions;

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService
  ) {
    this.items = [
      {
        link: '/product/1',
        image: 'https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg'
      },
      {
        link: '/product/1',
        image: 'https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg'
      },
      {
        link: '/product/1',
        image: 'https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg'
      }
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  public ngOnInit(): void {
    this.httpService.get<{ data: IAd[] }>(`/api/products?page=1`)
      .subscribe(v => {
        if (Array.isArray(v.data) && v.data?.length){
          this.ads = v.data;
        }
      });
  }

  async navigateToTheProduct(id: number): Promise<void> {
    this.router.navigateByUrl(`/product/${id}`);
  }
}
