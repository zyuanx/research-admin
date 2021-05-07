import request from "@/utils/request"


export function listUser(query) {
    return request({
        url: "/api/user",
        method: "get",
        params: query
    })
}
export function retrieveUser(id) {
    return request({
        url: `/api/user/${id}`,
        method: "get",
    })
}
export function createUser(data) {
    return request({
        url: "/api/user",
        method: "post",
        data
    })
}

export function updateUser(id, data) {
    return request({
        url: `/api/user/${id}`,
        method: "put",
        data
    })
}

export function deleteUser(id) {
    return request({
        url: `/api/user/${id}`,
        method: "delete"
    })
}

export function resetPassword(id, data) {
    return request({
        url: `/api/user/reset/password/${id}`,
        method: "put",
        data
    })
}
