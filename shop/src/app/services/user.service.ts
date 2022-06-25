import {Injectable} from '@angular/core';
import {IAd, IUser} from '../interfaces/interfaces';
import {compact, isEqual, uniqWith} from 'lodash';
import {Subject} from 'rxjs';
import {SubjectsService} from './subjects.service';
import {UserModel} from '../models/user.model';
import {Roles} from '../guards/only-super-admin.guard';

export const USER_AUTH = new Subject<boolean>();

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly userModel: UserModel;

  public constructor(private readonly subjectsService: SubjectsService) {
    this.userModel = new UserModel();
  }

  login(data: Partial<IUser>): void {
    this.userModel.username = data.username;
    this.userModel.email = data.email;
    this.userModel.password = data.password;
    this.userModel.isAuth = true;
    this.userModel.avatar = data.avatar;
    this.userModel.id = data.id;
    this.userModel.role = data.role === 'admin' ? Roles.ADMIN : Roles.USER;

    USER_AUTH.next(true);
    this.subjectsService.getAuthSubject().next();

    localStorage.setItem('auth', JSON.stringify(this.userModel))
  }

  addActiveProducts(product: IAd[]): void {
    this.userModel.activeOrders.push(...compact(product));
    this.userModel.activeOrders = uniqWith(this.userModel.activeOrders, isEqual);
  }

  addUnActiveProducts(product: IAd[]): void {
    this.userModel.inActiveOrders.push(...compact(product));
    this.userModel.inActiveOrders = uniqWith(this.userModel.activeOrders, isEqual);
  }

  logout(): void {
    this.userModel.id = -1;
    this.userModel.username = '';
  }

  isSuperUser(): boolean {
    return this.userModel.role === 'admin';
  }

  getQuantityOfAllOrders(): number {
    return this.userModel.activeOrders.length + this.userModel.inActiveOrders.length;
  }

  get is_auth(): boolean {
    return this.userModel.isAuth;
  }

  get user(): UserModel {
    return this.userModel;
  }
}

