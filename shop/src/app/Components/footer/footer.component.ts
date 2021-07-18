import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/User.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent{

  constructor(public user: UserService) { }
}
