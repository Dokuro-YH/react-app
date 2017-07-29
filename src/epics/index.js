import { combineEpics } from 'redux-observable';
import { appEpic } from './app';

export const rootEpic = combineEpics(appEpic);
