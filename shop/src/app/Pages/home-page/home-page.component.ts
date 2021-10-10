import {Component, OnInit} from '@angular/core';
import { IAd } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/Services/Http.service';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
    ads: IAd[] = [];
    public error = false;

    constructor(private http: HttpService){}

    ngOnInit(): void{
        this.http.get<{ data: IAd[] }>(`/api/products?page=1`)
          .subscribe(v => {
            if (Array.isArray(v.data) && v.data?.length){
                this.ads = v.data;
            }
        });
    }
}
