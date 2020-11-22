import request from "@/utils/request"

export function VisitLocation() {
    return request({
        url: "visit/location/",
        method: "get",
    })
}

export function VisitCreate(data) {
    return request({
        url: "visit/list/",
        method: "post",
        data: data,
    })
}

export function VisitList(query) {
    return request({
        url: "visit/list/",
        method: "get",
        params: query,
    })
}
