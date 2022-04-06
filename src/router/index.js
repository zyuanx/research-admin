import Vue from "vue";
import Router from "vue-router";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(Router);

/* Layout */
import Layout from "@/layout";

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/changePassword",
    component: Layout,
    hidden: true,
    redirect: "/changePassword",
    children: [
      {
        path: "",
        name: "ChangePassword",
        component: () => import("@/views/change-password/index"),
        meta: {
          title: "密码修改",
        },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: {
          title: "工作台",
          icon: "dashboard",
        },
      },
    ],
  },
  {
    path: "/survey/open/:id",
    component: () => import("@/views/survey/research-open/index"),
    hidden: true,
    meta: {
      title: "问卷收集",
    },
  },
];

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRoutes = [
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    name: "System",
    meta: {
      title: "系统管理",
      icon: "el-icon-s-promotion",
      roles: ["admin"],
    }, // 页面需要的权限
    children: [
      {
        path: "/role",
        name: "Role",
        component: () => import("@/views/system/role/index"),
        meta: {
          title: "角色管理",
          icon: "el-icon-s-custom",
          roles: ["admin"],
        },
      },
      {
        path: "/permission",
        name: "Permission",
        component: () => import("@/views/system/permission/index"),
        meta: {
          title: "权限菜单",
          icon: "el-icon-menu",
          roles: ["admin"],
        },
      },
      {
        path: "/user",
        name: "User",
        component: () => import("@/views/system/user/index"),
        meta: {
          title: "用户管理",
          icon: "user",
          roles: ["admin"],
        },
      },
    ],
  },
  {
    path: "/survey",
    component: Layout,
    redirect: "/survey/create",
    name: "Survey",
    meta: {
      title: "问卷管理",
      icon: "el-icon-s-help",
      roles: ["admin", "edit"],
    },
    children: [
      {
        path: "/survey/create",
        name: "ResearchCreate",
        component: () => import("@/views/survey/research-create/index"),
        meta: {
          title: "问卷设计",
          icon: "form",
        },
      },
      {
        path: "/survey/list",
        name: "ResearchShow",
        component: () => import("@/views/survey/research-list/index"),
        meta: {
          title: "问卷列表",
          icon: "table",
        },
      },
      {
        path: "/survey/record/:id",
        name: "ResearchRecord",
        component: () => import("@/views/survey/record-list/index"),
        hidden: true,
        meta: {
          title: "填写记录",
          icon: "table",
        },
      },
    ],
  },
  {
    path: "/square",
    component: Layout,
    redirect: "/square",
    children: [
      {
        path: "",
        name: "ResearchSquare",
        component: () => import("@/views/survey/research-square/index"),
        meta: {
          title: "问卷广场",
          icon: "table",
        },
      },
    ],
  },

  {
    path: "/drawer/:id",
    component: () => import("@/views/survey/research-square/drawer"),
    name: "DrawerPage",
    hidden: true,
    meta: {
      title: "问卷信息",
    },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  });

const router = createRouter();

// router.beforeEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     next()
// })
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
