import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/common/About.vue'
import Jobs from '@/views/job/Jobs.vue'
import JobCreate from '@/views/job/JobCreate.vue'
import JobCreateSkill from '@/views/job/JobCreateSkill.vue'
import Login from '@/views/user/Login.vue'
import RegisterStep1 from '@/views/user/register_session/RegisterStep1.vue'
import RegisterStep2 from '@/views/user/register_session/RegisterStep2.vue'
import RegisterStep3 from '@/views/user/register_session/RegisterStep3.vue'
// import TopPage from '../views/common/TopPage.vue'
import Manage from '@/views/manage/Manage.vue'
import Favorite from '@/views/favorite/Favorite.vue'
import FavoriteJobDetail from '@/views/favorite/FavoriteJobDetail.vue'
import Apply from '@/views/apply/Apply.vue'
import ApplyJobDetail from '@/views/apply/ApplyJobDetail.vue'
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
  // * 案件
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  },
  // ? 作成
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
  // * 共通
  {
    path: '/about',
    component: About,
    name: 'about'
  },
  // * ユーザー
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  // * 本登録登録 
  {
    path: '/step/1',
    name: 'RegisterStep1',
    component: RegisterStep1
  },
  {
    path: '/step/2',
    name: 'RegisterStep2',
    component: RegisterStep2
  },
  {
    path: '/step/3',
    name: 'RegisterStep3',
    component: RegisterStep3
  },
  // * 管理
  // ? 管理 管理
  {
    path: '/manage',
    component: Manage,
    name: 'Manage'
  },
  // ? 管理 お気に入り
  {
    path: '/manage/favorite_job',
    component: Favorite,
    name: 'ManageFavorite'
  },
  {
    path: '/manage/favorite_job/:id/',
    component: FavoriteJobDetail,
    props: route => ({
      id: Number(route.params.id),
    })
  },
  // ? 管理 応募
  {
    path: '/manage/apply_job',
    component: Apply,
    name: 'ManageApply'
  },
  {
    path: '/manage/apply_job/:id/',
    component: ApplyJobDetail,
    props: route => ({
      id: Number(route.params.id),
    })
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
