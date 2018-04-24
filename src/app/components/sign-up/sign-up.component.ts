import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {AppState, selectAuthState} from "../store/app.states";
import {SignUpAction} from "../store/auth.actions";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {State} from "../store/auth.reducers";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  auth$: Observable<any>;
  user: User = new User();
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.auth$ = store.select(selectAuthState);
  }

  ngOnInit() {
    this.auth$.subscribe((state: State) => {
      console.log(state);

      // this.state = state;
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };

    this.store.dispatch(new SignUpAction(payload));
  }
}
