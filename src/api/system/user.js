import request from "@/utils/request"


export function getUser() {
    return request({
        url: "/api/user/",
        method: "get",
    })
}

export function updateUser(id, data) {
    return request({
        url: `/api/user/${id}/`,
        method: "patch",
        data
    })
}
export function updateUserAvatar(id, data) {
    return request({
        url: `/api/user/${id}/update_avatar/`,
        method: "put",
        data
    })
}


export function addUser(data) {
    return request({
        url: "/api/user/",
        method: "post",
        data
    })
}

export function deleteUser(id) {
    return request({
        url: `/api/user/${id}/`,
        method: "delete"
    })
}

export function resetPassword(id) {
    return request({
        url: `/api/user/${id}/reset_password/`,
        method: "post",
    })
}
