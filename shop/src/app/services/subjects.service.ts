import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private readonly openSidebarSubject$ = new Subject<void>();

  constructor() {
  }

  public getOpenSidebarSubject(): Subject<void> {
    return this.openSidebarSubject$;
  }
}
