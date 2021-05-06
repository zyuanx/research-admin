import request from "@/utils/request"

export function login(data) {
    return request({
        url: "/api/user/login",
        method: "post",
        data
    })
}

export function getInfo() {
    return request({
        url: "/api/user/info",
        method: "get"
    })
}

export function logout() {
    return request({
        url: "/api/user/logout",
        method: "post"
    })
}

export function changePassword(data) {
    return request({
        url: "/api/user/change/password",
        method: "put",
        data
    })
}