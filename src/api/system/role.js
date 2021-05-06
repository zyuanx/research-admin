import request from "@/utils/request";

export function listRole() {
    return request({
        url: "/api/role",
        method: "get",
    })
}

export function createRole(data) {
    return request({
        url: "/api/role",
        method: "post",
        data
    })
}

export function updateRole(id, data) {
    return request({
        url: `/api/role/${id}`,
        method: "put",
        data
    })
}



export function deleteRole(id) {
    return request({
        url: `/api/role/${id}`,
        method: "delete"
    })
}
