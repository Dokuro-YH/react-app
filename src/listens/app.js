import { Observable } from 'rxjs/Observable';
import { appActions } from '../actions/app';

export const appListen = (store) => {
  let lastWidth = 0;
  Observable.fromEvent(window, 'resize')
    .debounceTime(1000)
    .map(() => document.body.clientWidth)
    .filter(width => width !== lastWidth)
    .do(width => (lastWidth = width))
    .startWith(document.body.clientWidth)
    .map(appActions.updateScreenWidth)
    .subscribe(store.dispatch);
};
