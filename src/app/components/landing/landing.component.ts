import { Component, OnInit } from '@angular/core';
import {LogOutAction} from "../store/auth.actions";
import {AppState, selectAuthState} from "../store/app.states";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {State} from "../store/auth.reducers";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  auth$: Observable<any>;
  isAuthenticated: boolean;
  user = null;
  errorMessage = null;

  constructor(private store: Store<AppState>) {
    this.auth$ = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.auth$.subscribe((state: State) => {
      console.log('LandingComponent', state);

      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOutAction());
  }
}
