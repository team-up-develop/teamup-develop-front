import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
/*
 * base
 */
import About from "../views/base/About.vue";
import TopPage from "../views/base/index.vue";
import NotFound from "@/views/base/errors/404.vue";
import ServerError from "@/views/base/errors/500.vue";
import BadRequest from "@/views/base/errors/400.vue";
import Unauthorized from "@/views/base/errors/401.vue";
/*
 * jobs
 */
import Jobs from "@/views/jobs/index.vue";
import JobDetail from "@/views/jobs/_id/Detail.vue";
/*
 * job_create
 */
import JobCreate from "@/views/job_create/index.vue";
import JobCreateSkill from "@/views/job_create/JobCreateSkill.vue";
import JobCreateComplete from "@/views/job_create/JobCreateComplete.vue";
/*
 * accounts
 */
import Login from "@/views/accounts/Login.vue";
import ProfileUser from "@/views/accounts/profile/Detail.vue";
import RegisterStepBase from "@/views/accounts/registers/RegisterStepBase.vue";
import RegisterStepSkill from "@/views/accounts/registers/RegisterStepSkill.vue";
import RegisterStepComplete from "@/views/accounts/registers/RegisterStepComplete.vue";
import RegisterConfirm from "@/views/accounts/registers/RegisterConfirm.vue";
/*
 * manage
 */
import Manage from "@/views/manage/index.vue";
import Apply from "@/views/manage/apply_jobs/index.vue";
import ApplyJobDetail from "@/views/manage/apply_jobs/_id/Detail.vue";
import Favorite from "@/views/manage/favorite_jobs/index.vue";
import FavoriteJobDetail from "@/views/manage/favorite_jobs/_id/Detail.vue";
import ApplyUsers from "@/views/manage/apply_users/index.vue";
import ManageUserProfile from "@/views/manage/apply_users/profile/Detail.vue";
/*
 * chats
 */
import Chat from "@/views/chats/index.vue";
import ChatDetail from "@/views/chats/_id/index.vue";
/*
 * test
 */
import Story from "@/views/story/index.vue";

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
    path: "/manage/:id/apply_users",
    component: ApplyUsers,
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
  // * テスト
  {
    path: "/story",
    name: "Story",
    component: Story,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
