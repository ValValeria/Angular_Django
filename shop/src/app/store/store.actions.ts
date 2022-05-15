import {createAction, props} from '@ngrx/store';
import {UserService} from '../services/user.service';


const loginUser = createAction('[LOGIN]', props<{user: UserService}>());
const logoutUser = createAction('[LOGOUT]');

export {loginUser, logoutUser};
