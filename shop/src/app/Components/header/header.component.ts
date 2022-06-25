import {animate, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {HttpService} from 'src/app/services/http.service';
import {UserService} from 'src/app/services/user.service';
import {$DELETE_ITEMS, $ORDER_COUNT} from '../OrderList/OrderList.component';
import {$CLOSE_SEARCH, SearchFormComponent} from '../search-form/search-form.component';
import {Subject} from 'rxjs/internal/Subject';
import {SubjectsService} from '../../services/subjects.service';

export const MEDIA$ = new Subject<boolean>();

@Component({
  selector: 'app-header-main',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fade', [
      transition('enter=>leave', [
        style({opacity: 0}),
        animate('1s', style({opacity: 1}))
      ]),
      transition('leave=>enter', [
        animate('1s', style({opacity: 0}))
      ]),
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements AfterViewInit {
  counter = 0;
  showPopup = false;
  readonly MAX_WIDTH = 1100;
  media = false;
  animState: 'enter' | 'leave' = 'enter';
  isSearchClicked = false;

  constructor(
    public readonly userService: UserService,
    private readonly router: Router,
    private readonly http: HttpService,
    private readonly dialog: MatDialog,
    private readonly subjectsService: SubjectsService) {
  }

  ngAfterViewInit(): void {
    $ORDER_COUNT.subscribe(v => {
      if (this.userService.user.id === v[1].user.id) {
        this.counter = v[0];
      }
    });

    $DELETE_ITEMS.subscribe((v) => {
      if (v[1].user.id === this.userService.user.id) {
        this.counter -= v[0].length;
      }
    });

    $CLOSE_SEARCH.subscribe(v => {
      this.dialog.closeAll();
    });

    this.dialog.afterAllClosed.subscribe(v => {
      this.isSearchClicked = false;
      document.body.classList.remove('overflow-y-hidden');
    });
  }

  showSearch(): void {
    if (!this.isSearchClicked) {
      this.dialog.open(SearchFormComponent, {
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw'
      });

      this.isSearchClicked = true;
      document.body.classList.add('overflow-y-hidden');
    }
  }

  openSideBar(): void {
    this.subjectsService.getOpenSidebarSubject().next();
  }
}
