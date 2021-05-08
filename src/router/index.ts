import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import About from "../views/Commons/About.vue";
import TopPage from "../views/Commons/TopPage.vue";
import Jobs from "@/views/Jobs/Jobs.vue";
import JobDetail from "@/views/Jobs/JobDetail.vue";
import JobCreate from "@/views/Jobs/JobCreate.vue";
import JobCreateSkill from "@/views/Jobs/JobCreateSkill.vue";
import JobCreateComplete from "@/views/Jobs/JobCreateComplete.vue";
import ProfileUser from "@/views/Users/Profiles/ProfileUser.vue";
import ManageUserProfile from "@/views/Users/Manages/ManageUserProfile.vue";
import Login from "@/views/Users/Logins/Login.vue";
// import Register from "@/views/Users/Registers/Register.vue";
import SentMailComplete from "@/views/Users/Registers/SentMailComplete.vue";
import RegisterStepBase from "@/views/Users/Registers/RegisterStepBase.vue";
import RegisterStepSkill from "@/views/Users/Registers/RegisterStepSkill.vue";
import RegisterStepComplete from "@/views/Users/Registers/RegisterStepComplete.vue";
import RegisterConfirm from "@/views/Users/Registers/RegisterConfirm.vue";
import Manage from "@/views/Manages/Manage.vue";
import Participate from "@/views/Manages/StatusChanges/Participate.vue";
import Applicant from "@/views/Manages/StatusChanges/Applicant.vue";
import Reject from "@/views/Manages/StatusChanges/Reject.vue";
import Favorite from "@/views/Manages/Favorites/Favorite.vue";
import FavoriteJobDetail from "@/views/Manages/Favorites/FavoriteJobDetail.vue";
import Apply from "@/views/Manages/Applications/Apply.vue";
import ApplyJobDetail from "@/views/Manages/Applications/ApplyJobDetail.vue";
import Chat from "@/views/Chats/Chat.vue";
import ChatDetail from "@/views/Chats/ChatDetail.vue";
import NotFound from "@/views/Commons/Errors/404.vue";
import ServerError from "@/views/Commons/Errors/500.vue";
import BadRequest from "@/views/Commons/Errors/400.vue";
import Unauthorized from "@/views/Commons/Errors/401.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // * 共通
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "error",
    name: "ServerError",
    component: ServerError,
  },
  {
    path: "error",
    name: "BadRequest",
    component: BadRequest,
  },
  {
    path: "error",
    name: "Unauthorized",
    component: Unauthorized,
  },
  {
    path: "/",
    component: TopPage,
    name: "topPage",
  },
  {
    path: "/about",
    component: About,
    name: "about",
  },
  // * 案件
  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs,
  },
  {
    path: "/jobs/:id/detail",
    component: JobDetail,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  // ? 作成
  {
    path: "/job_create/1",
    name: "JobCreate",
    component: JobCreate,
  },
  {
    path: "/job_create/2",
    name: "JobCreateSkill",
    component: JobCreateSkill,
  },
  {
    path: "/job_create/3",
    name: "JobCreateComplete",
    component: JobCreateComplete,
  },
  // * ユーザー
  {
    path: "/account/profile/:id/detail",
    component: ProfileUser,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  // * 管理案件 ユーザー
  {
    path: "/manage/profile/:jobId/:id/:applyId/detail",
    component: ManageUserProfile,
    props: (route) => ({
      id: Number(route.params.id),
      jobId: Number(route.params.jobId),
      applyId: Number(route.params.applyId),
    }),
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
  },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: Register,
  // },
  {
    path: "/register/sent_mail",
    name: "SentMailComplete",
    component: SentMailComplete,
  },
  // * 本登録登録
  {
    path: "/register/step/1",
    name: "RegisterStepBase",
    component: RegisterStepBase,
  },
  {
    path: "/register/step/2",
    name: "RegisterStepSkill",
    component: RegisterStepSkill,
  },
  {
    path: "/register/step/confirm",
    name: "RegisterConfirm",
    component: RegisterConfirm,
  },
  {
    path: "/register/step/complete",
    name: "RegisterStepComplete",
    component: RegisterStepComplete,
  },
  // * 管理
  // ? 管理 管理
  {
    path: "/manage",
    component: Manage,
    name: "Manage",
  },
  // ? 案件管理詳細
  {
    path: "/manage/:id/applicant",
    component: Applicant,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  {
    path: "/manage/:id/participate",
    component: Participate,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  {
    path: "/manage/:id/reject",
    component: Reject,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  // ? 管理 お気に入り
  {
    path: "/manage/favorite_job",
    component: Favorite,
    name: "ManageFavorite",
  },
  {
    path: "/manage/favorite_job/:id/detail",
    component: FavoriteJobDetail,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  // ? 管理 応募
  {
    path: "/manage/apply_job",
    component: Apply,
    name: "ManageApply",
  },
  {
    path: "/manage/apply_job/:id/detail",
    component: ApplyJobDetail,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  // * チャット
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/chat/:id/",
    component: ChatDetail,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
