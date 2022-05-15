import {Component, Input, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { URL_PATH } from 'src/app/app.component';
import { IAd } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

export const LIKES$ = new Subject<number>();

@Component({
    selector: 'app-likes',
    templateUrl: './OrdersLikes.component.html'
})
export class OrdersLikes implements OnInit{
    likes: IAd[];
    @Input() user: UserService;

    constructor(private http: HttpService){
        this.likes = [];
    }

    ngOnInit(): void{
        this.http.get<{ data: { likes: IAd[] } }>(`${URL_PATH}api/getlikes?user_id=`+this.user.id)
                  .subscribe(v => {
                      this.likes = v.data.likes;
                      this.user.likes = this.likes;
                  });
    }

    selectItems($event): void{
       LIKES$.next($event);
    }
}
