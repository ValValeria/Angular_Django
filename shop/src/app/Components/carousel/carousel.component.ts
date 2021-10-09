import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IAllCarouselResponse, ICarouselResponse} from '../../interfaces/interfaces';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpService} from '../../Services/Http.service';
import { image } from '../../Pages/slider-info-page/slider-info-page.component';
import { Router } from '@angular/router';

type pageType = 'home' | 'product' | 'products';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnChanges{
    @Input() pageType: pageType;
    @Output() errorLoading = new EventEmitter<Error>();
    readonly carouselImages: image<string>[] = [];
    carouselImageError = false;
    active = 0;

    constructor(private httpService: HttpService,
    private router: Router) {
    }

    prevImage(): void {
        if (this.active) {
            this.active -= 1;
        }
    }

    nextImage(): void {
        if (this.active < this.carouselImages.length - 1) {
            this.active += 1;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.httpService.get<IAllCarouselResponse>(`/api/carousel/${this.pageType}`)
        .pipe(
          catchError((e) => of({data: {images: []}}))
        )
        .subscribe(v => {
          if (v.data.images.length){
            this.carouselImages.push(...v.data.images);
            this.carouselImageError = false;
          } else {
            this.carouselImageError = true;
            this.errorLoading.emit(new Error());
          }
        });
    }

    async navigateToPage(data: image<string>): Promise<void> {
       await this.router.navigateByUrl(data.postUrl);
    }
}
