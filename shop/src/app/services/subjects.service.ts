import {Injectable} from '@angular/core';

import {Subject} from 'rxjs';

import {IUser} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private readonly openSidebarSubject$ = new Subject<void>();
  private readonly authSubject$ = new Subject<IUser>();

  constructor() {
  }

  public getOpenSidebarSubject(): Subject<void> {
    return this.openSidebarSubject$;
  }

  public getAuthSubject(): Subject<IUser> {
    return this.authSubject$;
  }
}
