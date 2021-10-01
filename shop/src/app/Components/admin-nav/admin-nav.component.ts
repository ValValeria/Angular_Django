import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async navigateToAddProductPage(): Promise<void>{
    await this.router.navigateByUrl('/admin/add-product');
  }

  async navigateToUsersPage(): Promise<void>{
    await this.router.navigateByUrl('/admin/users');
  }
}
