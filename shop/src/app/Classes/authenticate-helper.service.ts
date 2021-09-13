import { URL_PATH } from '../app.component';
import { IUser } from '../interfaces/interfaces';
import { UserService } from '../Services/User.service';
import {Injectable} from '@angular/core';

interface IRes{
  data: {user: IUser};
}

@Injectable()
export class AuthenticateHelper {
    constructor(private userService: UserService) {}

    public async authenticate(data: IUser, login?: boolean): Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            try {
                let url = `/api/login`;

                if (!login) {
                    url = `/api/signup`;
                }

                const searchParams = new URLSearchParams();

                for (const [key, value] of Object.entries(data)) {
                    if (value && key) {
                        searchParams.append(key, value);
                    }
                }

                const response = await fetch(url, {
                  method: 'POST',
                  body: searchParams.toString(),
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                  }
                });

                const json: {data: {user: IUser}} = await response.json();
                const userData: IUser = json.data.user;
                const role = userData.role;
                const roles = ['admin', 'user'];

                if (roles.includes(role)) {
                   resolve();
                   this.userService.login({...userData});
                } else {
                   reject('Guest');
                }
            } catch (e) {
                localStorage.removeItem('auth');
                reject(e);
            }

            return this.userService.is_auth;
        });
    }
}

