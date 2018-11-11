import Vue from 'vue';
import Router from 'vue-router';

import Auth from '../components/Auth/Index';
import Logout from '../components/Auth/Logout';
import Home from '../components/Home/Index';
import ShopList from '../components/Home/Shops/ShopList';
import Favorites from '../components/Home/Shops/Favorites';

import { isAuthenticated, removeToken } from '../auth';

Vue.use(Router);

const ifAuthenticated = (to, from, next) => {
  if (isAuthenticated()) {
    next();
    return;
  }
  next('/login');
};

const ifGuest = (to, from, next) => {
  if (isAuthenticated()) {
    next('/');
    return;
  }
  next();
};


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Auth,
      beforeEnter: ifGuest,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Auth,
      beforeEnter: ifGuest,
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      beforeEnter(to, from, next) {
        removeToken();
        next('/login');
      },
    },
    {
      path: '/',
      component: Home,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: '/',
          name: 'ShopList',
          component: ShopList,
        },
        {
          path: '/favorites',
          name: 'Favorites',
          component: Favorites,
        },
      ],
    },
  ],
});
