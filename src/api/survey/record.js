import request from "@/utils/request"

export function listRecord(query) {
    return request({
        url: "/api/record",
        method: "get",
        params: query
    })
}
export function retrieveRecord(id) {
    return request({
        url: `/api/record/${id}`,
        method: "get"
    })
}
export function createRecord(data) {
    return request({
        url: "/api/record",
        method: "post",
        data: data
    })
}
export function exportRecord(id) {
    return request({
        url: `/api/record/export/${id}`,
        method: "get",
        responseType: "blob"
    })
}
