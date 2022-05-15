import { createSelector, createFeatureSelector } from "@ngrx/store";
import {UserService} from '../services/user.service';

export interface IAppState{
  auth: {
    user: UserService
  };
}

export const selectUser = createSelector(
  (state: IAppState) => state.auth,
  (state) => state.user,
);
