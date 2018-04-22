import {Action} from "@ngrx/store";
import {User} from "../models/user";


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGN_UP = '[Auth] Sign Up',
  SIGN_UP_SUCCESS = '[Auth] Sign Up Success',
  SIGN_UP_FAILURE = '[Auth] Sign Up Failure',
  LOGOUT = '[Auth] Logout',
  STATUS = '[Auth] Status',
}

export class LogInAction implements Action {
  type: string = AuthActionTypes.LOGIN;

  constructor(public payload: User) {}
}

export class LogInSuccessAction implements Action {
  type: string = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload) {}
}

export class LogInFailureAction implements Action {
  type: string = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class SignUpAction implements Action {
  type: string = AuthActionTypes.SIGN_UP;

  constructor(public payload: any) {}
}

export class SignUpSuccessAction implements Action {
  type: string = AuthActionTypes.SIGN_UP_SUCCESS;

  constructor(public payload: any) {}
}

export class SignUpFailureAction implements Action {
  type: string = AuthActionTypes.SIGN_UP_FAILURE;

  constructor(public payload: any) {}
}

export class LogOutAction implements Action {
  type: string = AuthActionTypes.LOGOUT;

  constructor(public payload?: any) {}
}

export class StatusAction implements Action {
  type: string = AuthActionTypes.STATUS;

  constructor(public payload?: any) {}
}

export type All =
  | LogInAction
  | LogInSuccessAction
  | LogInFailureAction
  | SignUpAction
  | SignUpFailureAction
  | LogOutAction
  | StatusAction;


