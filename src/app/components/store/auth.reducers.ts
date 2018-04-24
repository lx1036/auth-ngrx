import {User} from "../models/user";
import {Action} from "@ngrx/store";
import {All, AuthActionTypes} from "./auth.actions";
import {Observable} from "rxjs/Observable";


export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};


/**
 * Effects 转变后的新 Action，再被 Reducer 用来改变 State，得到新的 State
 *
 *
 * @param {State} state
 * @param {All} action
 * @returns {State}
 */
export function reducer(state: State = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      Observable.of(0).do(() => {console.log('LOGIN reducer')}).subscribe(() => {});
      return {...state, isAuthenticated: false, user: action.payload, errorMessage: null};
    case AuthActionTypes.LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS reducer');
      return {...state, isAuthenticated: true, user: action.payload, errorMessage: null};
    case AuthActionTypes.LOGIN_FAILURE:
      return {...state, errorMessage: 'Incorrect email and/or password.'};
    case AuthActionTypes.SIGN_UP_SUCCESS:
      return {...state, isAuthenticated: true, user: action.payload, errorMessage: null};
    case AuthActionTypes.SIGN_UP_FAILURE:
      return {...state, errorMessage: 'The email is already in use.'};
    default:
      return state;
  }
}
