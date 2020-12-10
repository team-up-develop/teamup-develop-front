import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import About from '../views/common/About.vue'
import Jobs from '@/views/job/Jobs.vue'
import JobDetail from '@/views/job/JobDetail.vue'
import JobCreate from '@/views/job/JobCreate.vue'
import JobCreateSkill from '@/views/job/JobCreateSkill.vue'
import ProfileUser from '@/views/user/ProfileUser.vue'
import ProfileUserJobs from '@/views/user/ProfileUserJobs.vue'
import ManageUserProfile from '@/views/user/ManageUserProfile.vue'
import Login from '@/views/user/Login.vue'
import Register from '@/views/user/Register.vue'
import SentMailComplete from '@/views/user/SentMailComplete.vue'
import RegisterStep1 from '@/views/user/register_session/RegisterStep1.vue'
import RegisterStep2 from '@/views/user/register_session/RegisterStep2.vue'
import RegisterStep3 from '@/views/user/register_session/RegisterStep3.vue'
import TopPage from '../views/common/TopPage.vue'
import Manage from '@/views/manage/Manage.vue'
import Participate from '@/views/manage/Participate.vue'
import Applicant from '@/views/manage/Applicant.vue'
import Reject from '@/views/manage/Reject.vue'
import Favorite from '@/views/favorite/Favorite.vue'
import FavoriteJobDetail from '@/views/favorite/FavoriteJobDetail.vue'
import Apply from '@/views/apply/Apply.vue'
import ApplyJobDetail from '@/views/apply/ApplyJobDetail.vue'
import Chat from '@/views/chat/Chat.vue'
import ChatDetail from '@/views/chat/ChatDetail.vue'
import NotFound from '@/views/errors/404.vue' 
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // * 共通
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/',
    component: TopPage,
    name: 'topPage'
  },
  {
    path: '/about',
    component: About,
    name: 'about'
  },
  // * 案件
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  },
  {
    path: '/jobs/:id',
    component: JobDetail,
    props: route => ({
      id: Number(route.params.id),
    })
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
  // * ユーザー
  {
    path: '/account/profile/:id/',
    component: ProfileUser,
    props: route => ({
      id: Number(route.params.id),
    })
  },
  // * ユーザー
  {
    path: '/account/profile/:id/jobs',
    component: ProfileUserJobs,
    props: route => ({
      id: Number(route.params.id),
    })
  },
  // * 管理案件 ユーザー
  {
    path: '/manage/profile/:jobId/:id/',
    component: ManageUserProfile,
    props: route => ({
      id: Number(route.params.id),
      jobId: Number(route.params.jobId)
    })
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/register/sent_mail',
    name: 'SentMailComplete',
    component: SentMailComplete
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
  // ? 案件管理詳細
  {
    path: '/manage/applicant/:id',
    component: Applicant,
    props: route => ({
      id: Number(route.params.id),
    })
  },
  {
    path: '/manage/participate/:id',
    component: Participate,
    props: route => ({
      id: Number(route.params.id),
    })
  },
  {
    path: '/manage/reject/:id',
    component: Reject,
    props: route => ({
      id: Number(route.params.id),
    })
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
  // * チャット
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/chat/:id/',
    component: ChatDetail,
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