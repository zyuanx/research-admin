import request from "@/utils/request";

export function getPermission() {
    return request({
        url: "/api/permission/",
        method: "get",
    })
}

export function updatePermission(id, data) {
    return request({
        url: `/api/permission/${id}/`,
        method: "patch",
        data
    })
}

export function addPermission(data) {
    return request({
        url: "/api/permission/",
        method: "post",
        data
    })
}

export function deletePermission(id) {
    return request({
        url: `/api/permission/${id}/`,
        method: "delete"
    })
}