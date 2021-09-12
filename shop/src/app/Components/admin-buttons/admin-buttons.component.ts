import {Component, SkipSelf} from '@angular/core';
import {UserService} from '../../Services/User.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-buttons',
  templateUrl: './admin-buttons.component.html'
})
export class AdminButtonsComponent{
  constructor(@SkipSelf() public user: UserService,
              private router: Router
              ) {}

  async navigateToUsersPage(): Promise<void>{
    await this.router.navigateByUrl('/profile/users');
  }
}
