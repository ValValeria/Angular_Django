import { createSelector, createFeatureSelector } from "@ngrx/store";
import {UserService} from '../Services/User.service';

export interface IAppState{
  auth: {
    user: UserService
  };
}

export const selectUser = createSelector(
  (state: IAppState) => state.auth,
  (state) => state.user,
);
