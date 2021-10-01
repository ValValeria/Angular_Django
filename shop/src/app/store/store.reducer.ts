import { createReducer, on } from '@ngrx/store';
import {IStore} from '../interfaces/interfaces';
import {UserService} from '../Services/User.service';
import {loginUser, logoutUser} from './store.actions';

const initState: IStore = {
   user: new UserService()
};

const reducer = createReducer(initState,
  on(loginUser, (state, props) => {
    state.user = props.user;

    return state;
  }),
  on(logoutUser, (state) => {
    state.user = new UserService();

    return state;
  })
);

export function userReducer(state, action): any{
  return reducer(state, action);
}
