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

export function filledRecord(id) {
  return request({
    url: `/api/record/filled/${id}`,
    method: "get",
  });
}


