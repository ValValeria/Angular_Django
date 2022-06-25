import {Component, EventEmitter, Input, Output} from '@angular/core';

import {IUser} from '../../interfaces/interfaces';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  @Output()
  changeAvatarEvent = new EventEmitter<boolean>();

  @Input()
  user: IUser;
  @Input()
  currentUser: IUser;
}
