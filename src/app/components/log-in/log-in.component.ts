import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState, selectAuthState} from "../store/app.states";
import {User} from "../models/user";
import {LogInAction} from "../store/auth.actions";
import {Observable} from "rxjs/Observable";
import {State} from "../store/auth.reducers";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user: User = {};
  state: State;

  auth$: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.auth$ = this.store.select(selectAuthState);
  }



  ngOnInit() {
    this.auth$.subscribe((state: State) => {
      console.log(state);

      this.state = state;
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit() {
    const payload = {
      email: this.user.email,
      password: this.user.password,
    };

    this.store.dispatch(new LogInAction(payload));
  }
}
