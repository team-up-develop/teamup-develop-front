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
import ProfileUserJobs from "@/views/Users/Profiles/ProfileUserJobs.vue";
import ManageUserProfile from "@/views/Users/Manages/ManageUserProfile.vue";
import ManageUserProfileJobs from "@/views/Users/Manages/ManageUserProfileJobs.vue";
import Login from "@/views/Users/Logins/Login.vue";
import Register from "@/views/Users/Registers/Register.vue";
import SentMailComplete from "@/views/Users/Registers/SentMailComplete.vue";
import RegisterStep1 from "@/views/Users/Registers/RegisterStep1.vue";
import RegisterStep2 from "@/views/Users/Registers/RegisterStep2.vue";
import RegisterStep3 from "@/views/Users/Registers/RegisterStep3.vue";
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
import NotFound from "@/views/Errors/404.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // * 共通
  {
    path: "*",
    name: "notFound",
    component: NotFound,
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
    path: "/jobs/:id",
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
    path: "/account/profile/:id/",
    component: ProfileUser,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  {
    path: "/account/profile/:id/jobs",
    component: ProfileUserJobs,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  // * 管理案件 ユーザー
  {
    path: "/manage/profile/:jobId/:id/:applyId",
    component: ManageUserProfile,
    props: (route) => ({
      id: Number(route.params.id),
      jobId: Number(route.params.jobId),
      applyId: Number(route.params.applyId),
    }),
  },
  {
    path: "/manage/profile/:jobId/:id/:applyId/jobs",
    component: ManageUserProfileJobs,
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
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/register/sent_mail",
    name: "SentMailComplete",
    component: SentMailComplete,
  },
  // * 本登録登録
  {
    path: "/step/1",
    name: "RegisterStep1",
    component: RegisterStep1,
  },
  {
    path: "/step/2",
    name: "RegisterStep2",
    component: RegisterStep2,
  },
  {
    path: "/step/3",
    name: "RegisterStep3",
    component: RegisterStep3,
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
    path: "/manage/applicant/:id",
    component: Applicant,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  {
    path: "/manage/participate/:id",
    component: Participate,
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
  {
    path: "/manage/reject/:id",
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
    path: "/manage/favorite_job/:id/",
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
    path: "/manage/apply_job/:id/",
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
