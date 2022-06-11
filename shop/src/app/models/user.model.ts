import {IAd, IUser} from "../interfaces/interfaces";

export class UserModel implements IUser {
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
}
