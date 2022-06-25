import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {from, interval, Observable} from 'rxjs';
import {reduce, skipWhile, switchMap, take, takeUntil} from 'rxjs/operators';
import {URL_PATH} from 'src/app/app.component';
import {IAd} from 'src/app/interfaces/interfaces';
import {HttpService} from 'src/app/services/http.service';
import {USER_AUTH, UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-purchase-page',
  templateUrl: './PurchasePage.component.html',
  styleUrls: ['./PurchasePage.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class PurchasePage implements OnInit {
  amountToPay$: Observable<number>;
  isPolicyAccepted = false;

  constructor(
    public userService: UserService,
    private http: HttpService,
    private router: Router,
    private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    USER_AUTH.subscribe(() => {
      this.http.get<{ data: { active: IAd[], unactive: IAd[] }, amount_of_orders: number, amount_of_products: number }>(`${URL_PATH}api/get-orders/`)
        .subscribe(v => {
          this.userService.addActiveProducts(v.data.active);
          this.userService.addUnActiveProducts(v.data.unactive);
        });

      this.amountToPay$ = interval(1000)
        .pipe(
          take(6),
          skipWhile(v => !this.userService.user.activeOrders.length),
          switchMap(v => {
            return from(this.userService.user.activeOrders)
              .pipe(
                reduce((prev, curr) => {
                  const item = curr.count * curr.price;
                  return item + prev;
                }, 0)
              );
          })
        );
    });

    this.authenticate();
  }

  purchase(): void {
    if (!this.isPolicyAccepted) {
      this.matSnackBar.open('Дайте согласие на обработку персональных данных. Иначе оформить покупку не получится', 'Close', {
        duration: 10000
      });
    } else {
      this.matSnackBar.open('Возникли проблемы с сервером', 'Close', {
        duration: 10000
      });
    }
  }

  authenticate(): void {
    interval(1000)
      .pipe(
        takeUntil(USER_AUTH),
        take(5)
      ).subscribe(
      () => {
        console.log('waiting');
      },
      () => {
        this.matSnackBar.open('Произошла ошибка, связанная с сервером', 'Close');
      },
      () => {
        if (!this.userService.is_auth) {
          this.router.navigateByUrl('/authenticate');
        }
      });
  }
}
