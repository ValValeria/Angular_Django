import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs/internal/Subject';
import {URL_PATH} from 'src/app/app.component';
import {IAd} from 'src/app/interfaces/interfaces';
import {HttpService} from 'src/app/services/http.service';

export const $CLOSE_SEARCH = new Subject<number>();

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @ViewChild('search', {read: ElementRef}) searchElem: ElementRef;
  results: IAd[] = [];
  message = '';
  hasMore: boolean;
  searchText = '';

  constructor(private http: HttpService, private diaglog: MatDialog) {
  }

  click(): void {
    const elem: HTMLInputElement = this.searchElem.nativeElement;

    this.searchText = encodeURIComponent(elem.value);

    this.message = ``;

    this.http.get<{ data: { results: IAd[] } }>
    (`${URL_PATH}api/search/?search=`
      + encodeURIComponent(elem.value))
      .subscribe(v => {
        this.results = v.data.results.slice(0, 10);

        if (v.data.results.length > 10) {
          this.hasMore = true;
        }

        if (this.results.length === 0) {
          this.message = 'Нет результатов';
        }
      });
  }

  close(): void {
    $CLOSE_SEARCH.next(0);
  }

  showMore(): void {
    this.diaglog.closeAll();
  }
}
