// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import { getToken } from './auth';

axios.defaults.baseURL = process.env.API_URL;

axios.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    /* eslint-disable-next-line */
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error =>
  Promise.reject(error),
);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
