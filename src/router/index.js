import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

/* Layout */
import Layout from "@/layout"

export const constantRoutes = [{
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/index"),
        hidden: true
    },

    {
        path: "/404",
        component: () => import("@/views/404"),
        hidden: true
    },

    {
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [{
            path: "dashboard",
            name: "Dashboard",
            component: () => import("@/views/dashboard/index"),
            meta: {
                title: "工作台",
                icon: "dashboard"
            }
        }]
    },
    {
        path: "/research",
        component: Layout,
        redirect: "/research/create",
        name: "Research",
        meta: {
            title: "调研问卷",
            icon: "el-icon-s-help",
        },
        children: [{
                path: "create",
                name: "ResearchCreate",
                component: () => import("@/views/research/create/index"),
                meta: {
                    title: "创建调研",
                    icon: "form"
                }
            },
            {
                path: "show",
                name: "ResearchShow",
                component: () => import("@/views/research/list/index"),
                meta: {
                    title: "调研列表",
                    icon: "table"
                }
            },
        ]
    },
    {
        path: "/preview/:id",
        component: () => import("@/views/research/preview/index"),
        name: "Preview",
        hidden: true,
        meta: {
            title: "调研信息",
        }
    },
    // {
    //     path: "/visit",
    //     component: () => import("@/views/visit/index"),
    //     name: "Visit",
    //     hidden: true,
    //     meta: {
    //         title: "忆先烈、迎国庆",
    //     }
    // },
    // 404 page must be placed at the end !!!
    {
        path: "*",
        redirect: "/404",
        hidden: true
    }
]

const createRouter = () => new Router({
    // mode: "history", // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
