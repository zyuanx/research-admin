import request from "@/utils/request";

export function listPermission() {
    return request({
        url: "/api/permission",
        method: "get",
    })
}

export function retrievePermission(id) {
    return request({
        url: `/api/permission/${id}`,
        method: "get",
    })
}
export function updatePermission(id, data) {
    return request({
        url: `/api/permission/${id}`,
        method: "patch",
        data
    })
}

export function createPermission(data) {
    return request({
        url: "/api/permission",
        method: "post",
        data
    })
}

export function destroyPermission(id) {
    return request({
        url: `/api/permission/${id}`,
        method: "delete"
    })
}
