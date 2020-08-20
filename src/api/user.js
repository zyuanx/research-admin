import request from "@/utils/request"

export function login(data) {
    return request({
        url: "user/login/",
        method: "post",
        data
    })
}

export function getInfo(token, id = null) {
    let url = ""
    if (id) {
        url = "user/info/" + id + "/"
    } else {
        url = "user/info/"
    }
    return request({
        url: url,
        method: "get",
        params: {
            token
        }
    })
}

export function getList(params) {
    return request({
        url: "user/list/",
        method: "get",
        params
    })
}

export function updateInfo(data, id) {
    return request({
        url: "user/info/" + id + "/",
        method: "patch",
        data
    })
}

export function logout() {
    return request({
        url: "user/logout/",
        method: "post"
    })
}
