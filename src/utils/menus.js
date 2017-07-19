const menus = [{
  id: 1,
  title: 'Dashboard',
  icon: 'desktop',
  link: '/',
}, {
  id: 2,
  bpid: 1,
  title: 'User',
  icon: 'user',
  link: '/users',
}, {
  id: 3,
  title: 'Team',
  icon: 'team',
}, {
  id: 4,
  pid: 3,
  bpid: 1,
  title: 'Team 1',
  link: '/teams/1',
}, {
  id: 5,
  pid: 3,
  bpid: 1,
  title: 'Team 2',
  link: '/teams/2',
}];

export default menus;
