import {IAd, IUser} from '../interfaces/interfaces';
import {Roles} from '../guards/only-super-admin.guard';

export class UserModel implements IUser {
  username = '';
  email = '';
  password = '';
  isAuth = false;
  activeOrders: IAd[] = [];
  avatar = '';
  inActiveOrders: IAd[] = [];
  likes: IAd[] = [];
  id = 0;
  role: Roles = Roles.USER;

  loadUserData(obj: IUser): void {
    Object.defineProperties(this, Object.getOwnPropertyDescriptors(obj));
  }
}
