import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit {
  btn: HTMLButtonElement;
  @ViewChild('drawer', {read: MatDrawer})
  matDrawer: MatDrawer;

  constructor(
    public readonly user: UserService,
    private readonly subjectsService: SubjectsService,
    private readonly authHelperService: AuthHelperService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.subjectsService
      .getOpenSidebarSubject()
      .subscribe(async () => {
        await this.matDrawer.open();
      });
  }

  ngAfterViewInit(): void {
    try {
      const json = localStorage.getItem('auth');

      if (json !== null) {
        const userData = JSON.parse(json);

        this.authHelperService
          .authenticate(userData, true)
          .then(() => {
            console.log('authenticated')
          })
          .catch(() => {
            console.log('error')
          });
      }
      } catch (e) {
      console.error(e)
    }
  }
}
