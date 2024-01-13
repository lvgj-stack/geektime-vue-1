import Vue from "vue";
import VueRouter from "vue-router";
import { notification } from "ant-design-vue";
import findLast from "lodash/findLast";
import NotFound from "@/views/404.vue";
import Forbidden from "@/views/403.vue";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { check, isLogin } from "@/utils/auth";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/User/Login.vue"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/User/Register.vue"),
      },
    ],
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/layouts/BasicLayout.vue"),
    children: [
      // Dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/views/Dashboard/Analysis.vue"
              ),
          },
        ],
      },
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "@/views/Forms/BasicForm.vue"
              ),
          },
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "分步表单" },
            hideChildrenInMenu: true,
            component: () =>
              import(/* webpackChunkName: "form" */ "@/views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step1.vue"
                  ),
              },
              {
                path: "/form/step-form/confirm",
                name: "comfirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step2.vue"
                  ),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step3.vue"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    component: Forbidden,
    hideInMenu: true,
  },
  {
    path: "*",
    name: "404",
    component: NotFound,
    hideInMenu: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    nProgress.start();
  }
  console.log(to.matched);
  const record = findLast(to.matched, (record) => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "您的权限不足，请联系管理员。",
      });
      next({
        path: "/403",
      });
    }
    nProgress.done();
  }
  next();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;
