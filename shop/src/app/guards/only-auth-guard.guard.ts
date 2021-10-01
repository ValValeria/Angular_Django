import {Injectable} from '@angular/core';
import {
    ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {AuthenticateHelper} from '../Classes/authenticate-helper.service';
import {UserService} from '../Services/User.service';
import {Roles} from './only-super-admin.guard';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class OnlyAuthGuard implements CanLoad{

   constructor(private user: UserService,
               private auth: AuthenticateHelper,
               private router: Router,
               private route: ActivatedRoute,
               private snackBar: MatSnackBar){}

  async canLoad(router: Route, segments: UrlSegment[]): Promise<boolean | UrlTree> {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

     if (!this.user.is_auth) {
       await this.auth.authenticate(this.user, true);
     }

     if (this.user.role !== Roles.ADMIN && this.user.id !== id){
       await this.router.navigateByUrl('/');

       this.snackBar.open('Only admin can visit the page', 'Close');

       return false;
     }

     return true;
   }
}
