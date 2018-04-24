import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthGuardService, AuthService} from "./components/services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./components/store/auth.effects";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./components/store/app.states";
import { LogOutComponent } from './components/log-out/log-out.component';
import {ErrorInterceptor, TokenInterceptor} from "./components/services/token.service";
import { StatusComponent } from './components/status/status.component';
// import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    LogInComponent,
    LogOutComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    RouterModule.forRoot([
      {path: 'log-in', component: LogInComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'status', component: StatusComponent, canActivate: [AuthGuardService]},
      {path: '', component: LandingComponent},
      {path: '*', redirectTo: '/'},
    ]),

    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers),
    // StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }) : [],
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
