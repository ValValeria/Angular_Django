import { Component } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-header-top',
    templateUrl: './header-top.component.html',
    styleUrls: ['./header-top.component.scss']
})
export class HeaderTop{
    constructor(private user: UserService){}

    get isAuth(): boolean{
        return this.user.is_auth;
    }
}
