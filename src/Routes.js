import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';

export default [
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/',
    component: Dashboard,
    isPrivate: true,
  },
];

