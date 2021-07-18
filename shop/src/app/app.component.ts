import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticateHelper } from './Classes/authenticate-helper.service';
import {USER_AUTH, UserService} from './Services/User.service';
import {intersection} from 'lodash';

export const URL_PATH = '/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isButtonClicked = false;
  btn: HTMLButtonElement;
  isDisplayScroll = false;
  btnHeight = { height: '40px' };
  initAppHeight: number;

  constructor(
    public user: UserService,
    private auth: AuthenticateHelper,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void>{
    try{
      if(localStorage.getItem('auth')){
        await this.auth.authenticate(JSON.parse(localStorage.getItem('auth')), true);
      }
    } catch (e){
      console.warn('Invalid json data');
      this.router.navigateByUrl('/').then(r => console.log('forbidden'));
    }
  }
}
