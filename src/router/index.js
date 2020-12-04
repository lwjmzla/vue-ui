import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login/index.vue';
import Register from '../views/register/index.vue';
import Forget from '../views/forget/index.vue';

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
    path: '/forget',
    name: 'Forget',
    component: Forget
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

export default router;
