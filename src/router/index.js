import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login/index.vue';
import Register from '../views/register/index.vue';
import modifyPwd from '../views/modifyPwd/index.vue';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // 这个样式必须引入

// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/modifyPwd',
    name: 'modifyPwd',
    component: modifyPwd
  },
  {
    path: '/idcard',
    name: 'idcard',
    component: () => import('@/views/demo/idcard')
  },
  {
    path: '/',
    name: '首页',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home')
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import(/* webpackChunkName: "member" */ '@/views/member/index.vue')
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
let whiteList = ['/register', '/login', '/modifyPwd', '/idcard'];
router.beforeEach((to, from, next) => {
  Vue.prototype.routerfrom = from;
  Vue.prototype.routerto = to;
  NProgress.start();
  let token = sessionStorage.getItem('jwtToken');
  if (whiteList.includes(to.path)) {
    next();
  } else {
    if (token) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
