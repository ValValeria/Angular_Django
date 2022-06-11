import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

import {AuthHelperService} from './Classes/auth-helper.service';
import {UserService} from './services/user.service';
import {SubjectsService} from './services/subjects.service';

export const URL_PATH = '/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isButtonClicked = false;
  btn: HTMLButtonElement;
  btnHeight = {height: '40px'};
  initAppHeight: number;

  @ViewChild('drawer', {read: MatDrawer})
  matDrawer: MatDrawer;

  constructor(
    public readonly user: UserService,
    private readonly auth: AuthHelperService,
    private readonly subjectsService: SubjectsService
  ) {
  }

  async ngOnInit(): Promise<void> {
    try {
      if (localStorage.getItem('auth')) {
        await this.auth.authenticate(JSON.parse(localStorage.getItem('auth')), true);
      }
    } catch (e) {
      console.warn('Invalid json data');
    }

    this.subjectsService
      .getOpenSidebarSubject()
      .subscribe(v => {
        this.matDrawer.open();
      });
  }
}
