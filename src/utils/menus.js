import pathToRegexp from 'path-to-regexp';
import { arrayToTree } from '../utils/array';

export const menus = [{
  id: 'dashboard',
  title: 'Dashboard',
  icon: 'desktop',
  link: '/',
}, {
  id: 'users',
  bpid: 'dashboard',
  title: 'User',
  icon: 'user',
  link: '/users',
}, {
  id: 'team',
  title: 'Team',
  icon: 'team',
}, {
  id: 'team1',
  pid: 'team',
  bpid: 'dashboard',
  title: 'Team 1',
  link: '/teams/1',
}, {
  id: 'team2',
  pid: 'team',
  bpid: 'dashboard',
  title: 'Team 2',
  link: '/teams/2',
}].map(m => ({
  ...m,
  regexp: m.link && pathToRegexp(m.link),
}));

export const treeMenus = arrayToTree(menus);
