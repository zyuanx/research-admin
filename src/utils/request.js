import axios from "axios"
import {
    MessageBox,
    Message
} from "element-ui"
import store from "@/store"
import {
    getToken
} from "@/utils/auth"

// 创建axios实例
const service = axios.create({
    baseURL: "http://127.0.0.1:8002/", // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers["Authorization"] = "Bearer " + getToken()
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === 401) {
            if (res.msg.indexOf("No active account") != -1) {
                Message({
                    message: "用户名或密码错误",
                    type: "error",
                    duration: 3 * 1000
                })
            } else {
                MessageBox.confirm("认证失败,请重新登陆.", "确认退出", {
                    confirmButtonText: "重新登陆",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    store.dispatch("user/resetToken").then(() => {
                        location.reload()
                    })
                })
            }

        } else if (res.code >= 400) {
            Message({
                message: res.msg || "请求出错",
                type: "error",
                duration: 3 * 1000
            })
            return Promise.reject(new Error(res.msg || "请求出错"))
        } else {
            return res
        }

    },
    error => {
        console.log("err" + error) // for debug
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
