import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/common/About.vue'
import Jobs from '@/views/job/Jobs.vue'
import JobCreate from '@/views/job/JobCreate.vue'
import JobCreateSkill from '@/views/job/JobCreateSkill.vue'
import Login from '@/views/user/Login.vue'
// import TopPage from '../views/common/TopPage.vue'
import Manage from '@/views/manage/Manage.vue'
import Favorite from '@/views/favorite/Favorite.vue'
import Apply from '@/views/apply/Apply.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   component: TopPage,
  //   name: 'topPage'
  // },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/aboutaa',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  },
  {
    path: '/job_create/1',
    name: 'JobCreate',
    component: JobCreate
  },
  {
    path: '/job_create/2',
    name: 'JobCreateSkill',
    component: JobCreateSkill
  },
  {
    path: '/about',
    component: About,
    name: 'about'
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/manage',
    component: Manage,
    name: 'Manage'
  },
  {
    path: '/manage/favorite_job',
    component: Favorite,
    name: 'ManageFavorite'
  },
  {
    path: '/manage/apply_job',
    component: Apply,
    name: 'ManageApply'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
