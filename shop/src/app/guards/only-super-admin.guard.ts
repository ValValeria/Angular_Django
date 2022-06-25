import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {UserService} from '../services/user.service';
import {AuthHelperService} from '../Classes/auth-helper.service';
import {MatSnackBar} from '@angular/material/snack-bar';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user'
}

@Injectable({
  providedIn: 'root'
})
export class OnlySuperAdminGuard implements CanLoad {
  constructor(
    private readonly userService: UserService,
    private readonly auth: AuthHelperService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
  }

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree> {
    await this.auth.authenticate(this.userService.user, true);

    if (this.userService.user.role !== Roles.ADMIN) {
      this.snackBar.open('Only admin can visit the page', 'Close');

      await this.router.navigateByUrl('/');

      return false;
    }

    return true;
  }
}
