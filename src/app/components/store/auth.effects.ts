import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {
  AuthActionTypes,
  LogInAction,
  LogInFailureAction,
  LogInSuccessAction, LogOutAction,
  SignUpAction,
  SignUpFailureAction, SignUpSuccessAction
} from "./auth.actions";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {switchMap, tap} from 'rxjs/operators';

import {User} from "../models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {Action} from "@ngrx/store";



@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authService: AuthService, private router: Router) {}


  // LogInAction 会被 NGRX 自动放入 Effect 转变为新的 Action，然后新的 Action 会被 NGRX 自动放入 Reducer
  @Effect()
  LogIn: Observable<Action> = this.actions.ofType(AuthActionTypes.LOGIN)
    .map((action: LogInAction) => action.payload)
    .switchMap((payload: User) => {
      return this.authService.logIn(payload.email, payload.password).map((response: {status: string, token: string}) => {
        return new LogInSuccessAction({...response, email: payload.email});
      }).catch((error: HttpErrorResponse) => {
        return Observable.of(new LogInFailureAction({status: error.status, message: error.message}));
      });
    });

  @Effect({dispatch: false})
  LogInSuccess: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((action: LogInSuccessAction) => {
      localStorage.setItem('token', action.payload.token);
      this.router.navigateByUrl('/');
    }),
  );

  @Effect({dispatch: false})
  LogInFailure: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((action: LogInFailureAction) => {
      console.log(action);
    }),
  );

  @Effect()
  SignUp: Observable<Action> = this.actions.ofType(AuthActionTypes.SIGN_UP)
    .map((action: SignUpAction) => action.payload)
    .switchMap((payload: User) => {
      return this.authService.signUp(payload.email, payload.password).map((response: User) => {
        return new SignUpSuccessAction(response);
      }).catch((error: HttpErrorResponse) => {
        return Observable.of(new SignUpFailureAction({status: error.status, message: error.message}));
      });
    });

  @Effect({dispatch: false})
  SignUpSuccess: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.SIGN_UP_SUCCESS),
    tap((action: SignUpSuccessAction) => {
      localStorage.setItem('token', action.payload.token);
      this.router.navigateByUrl('/');
    }),
  );

  @Effect({dispatch: false})
  SignUpFailure: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.SIGN_UP_FAILURE),
    tap((action: SignUpFailureAction) => {
      console.log(action);
    }),
  );

  @Effect({dispatch: false})
  LogOut: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((action: LogOutAction) => {
      localStorage.removeItem('token');
      // this.router.navigateByUrl('/');
    }),
  );

  @Effect({dispatch: false})
  Status: Observable<any> = this.actions
    .ofType(AuthActionTypes.STATUS)
    .switchMap(payload => {
      return this.authService.getStatus();
    });
}