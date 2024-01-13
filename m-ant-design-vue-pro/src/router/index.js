import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "@/views/404.vue";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

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
        meta: { icon: "form", title: "表单" },
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
  next();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;
