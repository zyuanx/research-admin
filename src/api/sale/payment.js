import request from "@/utils/request"


export function getPayment() {
    return request({
        url: "/api/payment/",
        method: "get",
    })
}

export function updatePayment(id, data) {
    return request({
        url: `/api/payment/${id}/`,
        method: "put",
        data
    })
}

export function addPayment(data) {
    return request({
        url: "/api/payment/",
        method: "post",
        data
    })
}

export function deletePayment(id) {
    return request({
        url: `/api/payment/${id}/`,
        method: "delete"
    })
}