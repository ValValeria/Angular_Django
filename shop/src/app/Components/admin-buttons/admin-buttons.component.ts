import {Component, SkipSelf} from '@angular/core';
import {UserService} from '../../Services/User.service';
import {Router} from '@angular/router';
import {Input} from '@angular/core';

@Component({
  selector: 'app-admin-buttons',
  templateUrl: './admin-buttons.component.html'
})
export class AdminButtonsComponent{
  @Input() user: UserService;

  constructor(private router: Router
              ) {}

  async navigateToUsersPage(): Promise<void>{
    await this.router.navigateByUrl('/profile/users');
  }

  async navigateToSliderInfoPage(): Promise<void>{
    await this.router.navigateByUrl('/slider-info');
  }
}
