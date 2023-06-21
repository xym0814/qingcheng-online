import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import User from "@/views/user-center/index";

Vue.use(VueRouter);

const routes = [
  {
    /* 使用路由组件的页面 */
    path: "/",
    component: Home,
    redirect: "/home",
    children: [
      {
        /* 首页 */
        path: "home",
        component: () => import("@/views/home/index"),
      },
      {
        /* 全部课程 */
        path: "all-courses",
        component: () => import("@/views/all-courses/index"),
      },
      {
        /* 等级考试 */
        path: "examination",
        component: () => import("@/views/examination/index"),
      },
      {
        /* 题库练习 */
        path: "practise",
        component: () => import("@/views/practise/index"),
      },
      {
        /* 直播模块 */
        path: "telecast",
        component: () => import("@/views/telecast/index"),
      },
      {
        /* 科技研学 */
        path: "research",
        component: () => import("@/views/research/index"),
      },
      {
        /* 资源平台 */
        path: "resource",
        component: () => import("@/views/resource/index"),
      },
      {
        /* 比赛服务 */
        path: "competition",
        component: () => import("@/views/competition/index"),
      },
      {
        /* 最新通知 */
        path: "latest-news",
        component: () => import("@/views/latest-news/index"),
      },
      {
        /* 获奖查询 */
        path: "awardWinning",
        component: () => import("@/views/awardWinning/index"),
      },
      {
        /* 课程详情页面 */
        path: "course-detail/:id",
        component: () => import("@/views/course-detail/index"),
      },
      {
        /* 比赛详情页面 */
        path: "competition-detail/:id",
        component: () => import("@/views/competition-detail/index"),
      },
      {
        /* 考试详情页面 */
        path: "examination-detail/:id",
        component: () => import("@/views/examination-detail/index"),
      },
      {
        /* 考试结果页面 */
        path: "examResult/:data",
        component: () => import("@/views/examing/examResult"),
      },
      {
        /* 最新消息页面——newsOne */
        path: "newsOne",
        component: () => import("@/views/latest-news/news/newsOne"),
      },
      {
        /* 最新消息页面——newsTwo */
        path: "newsTwo",
        component: () => import("@/views/latest-news/news/newsTwo"),
      },
      {
        /* 最新消息页面——newsThree */
        path: "newsThree",
        component: () => import("@/views/latest-news/news/newsThree"),
      },
      {
        /* 直播详情 */
        path: "telecastDetail",
        component: () => import("@/views/telecast/telecastDetail"),
      },
      {
        /* 直播——推流 */
        path: "pushFlow",
        component: () => import("@/views/telecast/pushFlow"),
      }
    ],
  },
  {
    /* 登录页面 */
    path: "/login",
    component: () => import("@/views/login/index"),
  },
  {
    /* 注册页面 */
    path: "/register",
    component: () => import("@/views/register/index"),
  },
  {
    /* 忘记密码页面 */
    path: "/forget",
    component: () => import("@/views/forget/index"),
  },
  {
    /* 课程播放的页面 */
    path: "/course/:id",
    component: () => import("@/views/video-play/index"),
  },
  {
    /* 分享的课程详情页面 */
    path: "/share",
    component: () => import("@/views/share-detail/index"),
  },
  {
    /* 用户个人中心 */
    path: "/user",
    component: User,
    redirect: "/user/index",
    children: [
      {
        /* 个人资料 */
        path: "/user/index",
        component: () => import("@/views/user-center/components/center"),
      },
      {
        /* 班级信息 */
        path: "/user/class",
        component: () => import("@/views/user-center/components/class"),
      },
      {
        /* 已购课程 */
        path: "/user/buy",
        component: () => import("@/views/user-center/components/hasBought"),
      },
      {
        /* 订单中心 */
        path: "/user/order",
        component: () => import("@/views/user-center/components/order"),
      },
      {
        /* 修改密码 */
        path: "/user/change",
        component: () => import("@/views/user-center/components/change"),
      },
    ],
  },
  {
    /* 支付成功页面 */
    path: "/paySuccess",
    component: () => import("@/views/payment/paySuccess"),
  },
  {
    /* 支付失败页面 */
    path: "/payFailed",
    component: () => import("@/views/payment/payFailed"),
  },
  {
    /* 正在考试页面 */
    path: "/examing/:id",
    component: () => import("@/views/examing/index"),
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  // mode: "hash",
  routes,
});

export default router;
