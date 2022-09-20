import {image} from '../Pages/slider-info-page/slider-info-page.component';
import {UserModel} from '../models/user.model';

export enum ResponseStatus {
  ERROR,
  SUCCESS
}

export interface IAllCarouselResponse {
  data: {
    images: image<string>[],
    pageType: string
  };
}

export interface IAd {
  image: string;
  title: string;
  descr: string;
  id: number;
  price: number;
  count: number;
  short_description: string;
  long_description: string;
  category: string;
  brand: string;
  status: 'limited' | 'unlimited';
  characterictics: string;
  rating?: number;
}

export type stringArray = [string, string][];

export interface IResponse {
  data: {
    result: any
  };
  status: ResponseStatus;
  info: any;
}

export interface IProductsResponse {
  categories: string[];
  maxPrice: number;
  maxPriceValue: number;
}

export interface IAdminUsersResponse {
  data: {
    users: IUser[];
    has_next: boolean;
    has_prev: boolean;
    all_pages: number;
    all_users_count: number
  };
}

export interface ProductsInfo {
  data: {
    result: {
      categories: string[],
      price: [{ min_price: number }, { max_price: number }]
    }
  };
}


export interface IAuthResponse {
  id: number;
  errors: string[];
  status: 'user';
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  id?: number;
  avatar?: string;
  role?: string;
}

export interface IComment {
  id: number;
  message: string;
  rating: number;
  sender: { username: string };
}

export interface ProductsBrand {
  data: {
    brands: string[]
  };
}

export interface IStore {
  user: UserModel;
}

export interface ISimpleResponse {
  data: any;
  status: 'ok' | '';
}
