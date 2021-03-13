import request from "@/utils/request"

export function login(data) {
    return request({
        url: "/api/auth/login/",
        method: "post",
        data
    })
}

export function getInfo() {
    return request({
        url: "/api/auth/info/",
        method: "get"
    })
}

export function logout() {
    return request({
        url: "/api/auth/logout/",
        method: "post"
    })
}

export function changePassword(data) {
    return request({
        url: "/api/auth/change_password/",
        method: "post",
        data
    })
}