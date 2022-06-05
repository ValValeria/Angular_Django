import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  links: { link: string, text: string }[];

  constructor(
    private readonly router: Router,
    private readonly authService: UserService
  ) {
    this.links = [
      {link: '', text: 'Home'},
      {link: 'products', text: 'Products'},
      {link: 'contacts', text: 'Contacts'}
    ];
  }

  ngOnInit(): void {
    this.addOrRemoveMenuItems();
  }

  addOrRemoveMenuItems(): void {
    if (!this.authService.is_auth) {
      this.links.push({link: 'authenticate', text: 'Authenticate'});
    }
  }

  navigateToPage(link: string): void {
    this.router.navigateByUrl(link).then();
  }
}
