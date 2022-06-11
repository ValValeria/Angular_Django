import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {SubjectsService} from "../../services/subjects.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  links: { link: string, text: string }[];

  constructor(
    private readonly router: Router,
    private readonly authService: UserService,
    private readonly subjectsService: SubjectsService
  ) {
    this.links = [
      {link: '', text: 'Home'},
      {link: 'products', text: 'Products'},
      {link: 'contacts', text: 'Contacts'}
    ];
  }

  ngOnInit(): void {
    this.addOrRemoveMenuItems();

    this.subjectsService.getAuthSubject().subscribe(this.addOrRemoveMenuItems.bind(this));
  }

  addOrRemoveMenuItems(): void {
    if (!this.authService.is_auth) {
      this.links.push({link: 'authenticate', text: 'Authenticate'});
    } else {
      this.links.push({link: 'logout', text: 'Logout'});
    }
  }

  navigateToPage(link: string): void {
    if (link === 'logout') {
      this.authService.logout();
    } else {
      this.router.navigateByUrl(link).then();
    }
  }
}
