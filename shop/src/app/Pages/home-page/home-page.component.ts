import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {IAd} from 'src/app/interfaces/interfaces';
import {HttpService} from 'src/app/services/http.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public ads: IAd[] = [];
  public error = false;
  public searchFormControl: FormControl;

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService
  ) {
    this.searchFormControl = new FormControl('');
  }

  public ngOnInit(): void {
    this.httpService.get<{ data: IAd[] }>(`/api/products?page=1`)
      .subscribe(v => {
        if (Array.isArray(v.data) && v.data?.length) {
          this.ads = v.data;
        }
      });

    this.searchFormControl.markAsDirty();
  }

  async navigateToTheProduct(id: number): Promise<void> {
    await this.router.navigateByUrl(`/product/${id}`);
  }
}
