import request from "@/utils/request";

export function getCustomer() {
    return request({
        url: "/api/customer/",
        method: "get",
    })
}

export function updateCustomer(id, data) {
    return request({
        url: `/api/customer/${id}/`,
        method: "put",
        data
    })
}

export function addCustomer(data) {
    return request({
        url: "/api/customer/",
        method: "post",
        data
    })
}

export function deleteCustomer(id) {
    return request({
        url: `/api/customer/${id}/`,
        method: "delete"
    })
}
