import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/User.service';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})
export class AddProductPageComponent implements OnInit {

  constructor(public user: UserService) { }

  ngOnInit(): void {
  }
}
