import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthUser} from './core/state/core/model';
import {Store} from '@ngrx/store';
import {selectIsOnline, selectMessages, selectUser, State} from './core/state';
import {MatSnackBar} from '@angular/material';
import {removeMessage} from './core/state/core/actions';
import * as CoreActions from './core/state/core/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private openSnackbar = false;

  isOnline$: Observable<boolean>;
  user$: Observable<AuthUser>;


  constructor(private store: Store<State>, public snackBar: MatSnackBar) {
    this.isOnline$ = store.select(selectIsOnline);
    this.user$ = store.select(selectUser);


    store.select(selectMessages).subscribe(messages => {
      if (messages.length > 0 && !this.openSnackbar) {
        this.openSnackBar(messages[0], messages[0].message);
      }
    });
  }

  openSnackBar(errorObj: any, message: string, action?: string) {
    this.openSnackbar = true;
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    }).afterDismissed().subscribe(() => {
      this.openSnackbar = false;
      this.store.dispatch(CoreActions.removeMessage({item : errorObj}));
    });
  }
}
