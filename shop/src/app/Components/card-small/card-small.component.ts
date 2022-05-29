import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {IAd} from '../../interfaces/interfaces';
import {ImageLoading} from '../../Classes/ImageLoading';
import {Router} from '@angular/router';
import {URL_PATH} from 'src/app/app.component';
import {HttpService} from 'src/app/services/http.service';
import {UserService} from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  templateUrl: './card-small.component.html',
  styleUrls: ['./card-small.component.scss']
})
export class CardSmallComponent extends ImageLoading {
  @Input() card: IAd;
  @Input() showFull = true;
  @Input() showButton = true;
  @Input() emptyCard = false;

  @ViewChild('img', {read: ElementRef}) public image: ElementRef;

  constructor(
    private router: Router,
    private user: UserService,
    private http: HttpService,
    private snackBar: MatSnackBar) {
    super();
  }

  async handleClick(): Promise<void> {
    await this.router.navigateByUrl(`/product/${this.card.id}`);
  }

  buyItem($event: Event): void {
    $event.preventDefault();

    if (!this.user.is_auth) {
      this.snackBar.open('Только авторизированные пользователи могут добавлять товар в корзину', 'Закрыть', {
        duration: 5000
      });
    } else {
      this.http.get<{ messages: string[], data: string[], status: string }>(`${URL_PATH}api/addorder?product_id=${this.card.id}&count=${1}`)
        .subscribe(v => {
          if (v.status === 'ok') {
            this.snackBar.open('Товар добавлен в корзину', 'Закрыть', {
              duration: 5000
            });
          }
        });
    }
  }

  goToCat(): void {
    this.router.navigate(['category', this.card.category]).then(r => console.log('navigated'));
  }

  get styles(): any {
    return {height: this.showFull ? '500px' : '400px'};
  }
}
