import {Component, Input, OnInit} from '@angular/core';
import { URL_PATH } from 'src/app/app.component';
import { IComment } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import {from} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'comments',
    templateUrl: './Comments.component.html',
    styleUrls: ['./Comments.component.scss']
})
export class Comments implements  OnInit{
    comments: IComment[];
    @Input('postId') productId: number;
    isSentRequest: boolean;
    rating: number;
    message: string;
    hasNext: boolean;
    num_pages: number;
    activePage = 1;
    ids: number[] = [];

    constructor(private http: HttpService, public user: UserService){
        this.comments = [];
    }

    ngOnInit(): void {
        this.sendRequest();
    }

    showMore(): void{
       this.activePage += 1;
       this.sendRequest();
    }

    click(): void{
        if (this.user.is_auth){
            this.http.post<{ id: number, status: 'ok' }>(`${URL_PATH}api/addcomment`,
              {message: this.message, rating: this.rating, post_id: this.productId})
            .subscribe(v => {
                if (v.status === 'ok'){
                    this.comments.unshift({id: (v as any).id,
                      message: this.message, rating: this.rating,
                      sender: {username: this.user.username}});
                }
            });
        }
    }

    sendRequest(): void{
        this.http.get<{ data: IComment[], has_next: boolean, pages: number }>(`${URL_PATH}api/comments/` + this.productId + `?page=${this.activePage}`)
        .subscribe(v => {
            this.comments.push(...v.data);
            this.isSentRequest = true;
            this.hasNext = v.has_next;
            this.num_pages = v.pages;
        });
    }

    selectComment(id: number, isChecked: false): void{
       if (isChecked){
         if (!this.ids.includes(id)){
           this.ids.push(isChecked);
         }
       } else {
         this.ids.splice(this.ids.indexOf(id), 1);
       }
    }

    deleteComments(): void{
      if (this.user.isSuperUser()){
        from(this.ids)
          .pipe(mergeMap((i) => this.http.get(`/api/delete-comment/${i}`).pipe(map(v => i))))
          .subscribe(v => {
             this.comments = this.comments.filter(v1 => v1.id !== v);
          });
      }
    }
}
