import {UserService} from '../Services/User.service';

export interface ICarouselResponse{
  data: {
    images: string[]
  };
}

export interface IAllCarouselResponse{
  data: {
    [prop: string]: string[]
  };
}

export interface IAd{
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
    status: 'limited'|'unlimited';
    characterictics: string;
    rating?: number;
}

export type stringArray = [string, string][];

export interface IResponse{
  data: any[];
}

export interface IProductsResponse{
  categories: string[];
  maxPrice: number;
  maxPriceValue: number;
}

export interface IAdminUsersResponse{
  data: {
    users: IUser[];
    has_next: boolean;
    has_prev: boolean;
    all_pages: number;
    all_users_count: number
  };
}

export interface ProductsInfo{
    data: {
        categories: string[],
        price: [{min_price: number}, {max_price: number}]
    };
}


export interface IAuthResponse{
    id: number;
    errors: string[];
    status: 'user';
}

export interface IUser{
    username: string;
    email: string;
    password: string;
    id?: number;
    avatar?: string;
    role?: string;
}

export interface IComment{
   id: number;
   message: string;
   rating: number;
   sender: {username: string};
}

export interface ProductsBrand{
    data: {
        brands: string[]
    };
}

export interface IStore{
    user: UserService;
}

export interface ISimpleResponse{
   data: any;
   status: 'ok' | '';
}
