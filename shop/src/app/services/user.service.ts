import {Injectable} from '@angular/core';
import {IAd, IUser} from '../interfaces/interfaces';
import {compact, isEqual, uniqWith} from 'lodash';
import {Subject} from 'rxjs';
import {SubjectsService} from "./subjects.service";

export const USER_AUTH = new Subject<boolean>();


@Injectable({providedIn: 'root'})
export class UserService implements IUser {
  username: string;
  email: string;
  password: string;
  isAuth: boolean;
  activeOrders: IAd[] = [];
  avatar: string;
  unactiveOrders: IAd[] = [];
  likes: IAd[] = [];
  id: number;
  role: string;

  public constructor(private readonly subjectsService: SubjectsService) {
  }

  login(data: Partial<IUser>): void {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.isAuth = true;
    this.avatar = data.avatar;
    this.id = data.id;
    this.role = data.role;

    USER_AUTH.next(true);
    this.subjectsService.getAuthSubject().next();
  }

  loadUserData(obj: IUser): void {
    Object.defineProperties(this, Object.getOwnPropertyDescriptors(obj));
  }

  addActiveProducts(product: IAd[]): void {
    this.activeOrders.push(...compact(product));
    this.activeOrders = uniqWith(this.activeOrders, isEqual);
  }

  addUnactiveProducts(product: IAd[]): void {
    this.unactiveOrders.push(...compact(product));
    this.activeOrders = uniqWith(this.activeOrders, isEqual);
  }

  logout(): void {
    const props: string[] = Object.getOwnPropertyNames(this);

    props.forEach(v => {
      const type = typeof this[v];
      switch (type) {
        case 'object':
          if (Array.isArray(this[v])) {
            this[v] = [];
          } else {
            this[v] = {};
          }
          break;
        case 'number':
          this[v] = 0;
          break;
        case 'string':
          this[v] = '';
          break;
        case 'boolean':
          this[v] = false;
          break;
        default:
          break;
      }
    });
  }

  isSuperUser(): boolean {
    return this.role === 'admin';
  }

  getQuantityOfAllOrders(): number {
    return this.activeOrders.length + this.unactiveOrders.length;
  }

  get is_auth(): boolean {
    return this.isAuth;
  }
}

